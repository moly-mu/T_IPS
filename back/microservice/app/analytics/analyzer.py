import polars as pl
from datetime import datetime, timedelta
from typing import List, Dict, Any
from datetime import timezone

def parse_data(data: dict) -> pl.DataFrame:
    mensajes = []
    for conv in data["data"]["conversaciones"]:
        numero = conv["numero_cliente"]
        last_fecha = None
        for msg in conv["mensajes"]:
            mensajes.append({
                "numero_cliente": numero,
                "tipo": msg["tipo"],
                "contenido": msg["contenido"],
                "fecha": msg["fecha"],
                "empresa": conv["empresa_perteneciente"]
            })
    return pl.DataFrame(mensajes).with_columns([
        pl.col("fecha").str.to_datetime()
    ])


# --- Totales y promedios ---
def total_conversaciones(data: dict) -> int:
    return len(data["data"]["conversaciones"])

def total_mensajes(df: pl.DataFrame) -> int:
    return df.height

def promedio_mensajes_por_conversacion(data: dict) -> float:
    return sum(len(c["mensajes"]) for c in data["data"]["conversaciones"]) / len(data["data"]["conversaciones"])

def promedio_duracion_conversaciones(data: dict) -> float:
    duraciones = []
    for c in data["data"]["conversaciones"]:
        fechas = [datetime.fromisoformat(m["fecha"].replace("Z", "+00:00")) for m in c["mensajes"]]
        if len(fechas) >= 2:
            duraciones.append((max(fechas) - min(fechas)).total_seconds())
    return sum(duraciones) / len(duraciones) if duraciones else 0

def promedio_tiempo_primera_respuesta(data: dict) -> float:
    tiempos = []
    for c in data["data"]["conversaciones"]:
        entrantes = [datetime.fromisoformat(m["fecha"].replace("Z", "+00:00")) for m in c["mensajes"] if m["tipo"] == "entrante"]
        salientes = [datetime.fromisoformat(m["fecha"].replace("Z", "+00:00")) for m in c["mensajes"] if m["tipo"] == "saliente"]
        if entrantes and salientes:
            primer_entrante = min(entrantes)
            respuesta = [s for s in salientes if s > primer_entrante]
            if respuesta:
                tiempos.append((min(respuesta) - primer_entrante).total_seconds())
    return sum(tiempos) / len(tiempos) if tiempos else 0


# --- Por cliente ---
def top_clientes_por_mensajes(df: pl.DataFrame, top_n=5) -> List[Dict[str, Any]]:
    return (
        df.group_by("numero_cliente")
        .agg(pl.count())
        .sort("count", descending=True)
        .limit(top_n)
        .to_dicts()
    )

def clientes_sin_respuesta(data: dict) -> List[str]:
    sin_respuesta = []
    for c in data["data"]["conversaciones"]:
        if c["mensajes"] and c["mensajes"][-1]["tipo"] == "entrante":
            sin_respuesta.append(c["numero_cliente"])
    return sin_respuesta

def clientes_mas_activos_hoy(df: pl.DataFrame) -> List[str]:
    hoy = datetime.utcnow().date()
    activos = df.filter(pl.col("fecha").dt.date() == hoy)
    return activos.select("numero_cliente").unique().to_series().to_list()

def clientes_mas_activos_esta_semana(df: pl.DataFrame) -> List[str]:
    hoy = datetime.utcnow()
    inicio_semana = (hoy - timedelta(days=hoy.weekday())).replace(tzinfo=timezone.utc)
    activos = df.filter(pl.col("fecha") >= inicio_semana)
    return activos.select("numero_cliente").unique().to_series().to_list()


# --- Temporales ---
def conversaciones_por_hora(df: pl.DataFrame) -> Dict[str, Any]:
    return (
        df.with_columns(pl.col("fecha").dt.hour().alias("hora"))
        .group_by("hora")
        .agg(pl.count())
        .sort("hora")
        .to_dict(as_series=False)
    )

def mensajes_por_dia(df: pl.DataFrame) -> Dict[str, Any]:
    return (
        df.with_columns(pl.col("fecha").dt.date().alias("dia"))
        .group_by("dia")
        .agg(pl.count())
        .sort("dia")
        .to_dict(as_series=False)
    )

def hora_mas_frecuente(df: pl.DataFrame) -> int:
    return (
        df.with_columns(pl.col("fecha").dt.hour().alias("hora"))
        .group_by("hora")
        .agg(pl.count())
        .sort("count", descending=True)
        .select("hora")
        .to_series()[0]
    )

def dia_con_mas_conversaciones(data: dict) -> str:
    fechas = []
    for c in data["data"]["conversaciones"]:
        fechas.append(c["lastMessageDate"].split("T")[0])
    return max(set(fechas), key=fechas.count) if fechas else ""


# --- Estado ---
def porcentaje_conversaciones_sin_respuesta(data: dict) -> float:
    total = len(data["data"]["conversaciones"])
    sin_resp = sum(1 for c in data["data"]["conversaciones"] if c["mensajes"] and c["mensajes"][-1]["tipo"] == "entrante")
    return round((sin_resp / total) * 100, 2) if total else 0

# Agrega esta función si tienes un campo de estado de cierre
def cantidad_conversaciones_cerradas(data: dict) -> int:
    return sum(1 for c in data["data"]["conversaciones"] if c.get("estado") == "cerrado")
