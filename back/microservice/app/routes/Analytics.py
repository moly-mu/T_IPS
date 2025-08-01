from fastapi import APIRouter
from service.get_conversation import get_conversaciones
from analytics.analyzer import (
    parse_data,
    total_conversaciones,
    total_mensajes,
    promedio_mensajes_por_conversacion,
    promedio_duracion_conversaciones,
    promedio_tiempo_primera_respuesta,
    top_clientes_por_mensajes,
    clientes_sin_respuesta,
    clientes_mas_activos_hoy,
    clientes_mas_activos_esta_semana,
    conversaciones_por_hora,
    mensajes_por_dia,
    hora_mas_frecuente,
    dia_con_mas_conversaciones,
    porcentaje_conversaciones_sin_respuesta,
    cantidad_conversaciones_cerradas
)

router = APIRouter()

@router.get("/analitica")
def obtener_analitica():
    data = get_conversaciones()
    df = parse_data(data)

    return {
        "totales": {
            "total_conversaciones": total_conversaciones(data),
            "total_mensajes": total_mensajes(df),
            "promedio_mensajes_conversacion": promedio_mensajes_por_conversacion(data),
            "promedio_duracion_conversacion": promedio_duracion_conversaciones(data),
            "promedio_tiempo_primera_respuesta": promedio_tiempo_primera_respuesta(data),
        },
        "por_cliente": {
            "top_clientes_mensajes": top_clientes_por_mensajes(df),
            "clientes_sin_respuesta": clientes_sin_respuesta(data),
            "clientes_mas_activos_hoy": clientes_mas_activos_hoy(df),
            "clientes_mas_activos_esta_semana": clientes_mas_activos_esta_semana(df),
        },
        "temporales": {
            "conversaciones_por_hora": conversaciones_por_hora(df),
            "mensajes_por_dia": mensajes_por_dia(df),
            "hora_mas_frecuente": hora_mas_frecuente(df),
            "dia_con_mas_conversaciones": dia_con_mas_conversaciones(data),
        },
        "estado": {
            "porcentaje_conversaciones_sin_respuesta": porcentaje_conversaciones_sin_respuesta(data),
            "cantidad_conversaciones_cerradas": cantidad_conversaciones_cerradas(data),
        }
    }
