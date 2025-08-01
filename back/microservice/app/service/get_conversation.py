import requests
import json
from ..cache.redis import redis_client
from datetime import datetime
import logging

API_URL = "https://crminnovacion.com/api/conversaciones/Tele%20Medicina?page=1&limit=2"
CACHE_KEY = "conversaciones"
TTL = 300  # 5 minutos

# Configurar logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def get_datos_prueba():
    """Datos de prueba para cuando la API externa falla"""
    return {
        "data": {
            "conversaciones": [
                {
                    "numero_cliente": "123456789",
                    "empresa_perteneciente": "Tele Medicina",
                    "lastMessageDate": "2025-07-30T20:00:00Z",
                    "estado": "abierto",
                    "mensajes": [
                        {
                            "tipo": "entrante",
                            "contenido": "Hola, necesito una consulta médica",
                            "fecha": "2025-07-30T19:00:00Z"
                        },
                        {
                            "tipo": "saliente", 
                            "contenido": "Hola, ¿en qué puedo ayudarte?",
                            "fecha": "2025-07-30T19:05:00Z"
                        },
                        {
                            "tipo": "entrante",
                            "contenido": "Tengo dolor de cabeza desde hace 2 días",
                            "fecha": "2025-07-30T19:10:00Z"
                        }
                    ]
                },
                {
                    "numero_cliente": "987654321",
                    "empresa_perteneciente": "Tele Medicina",
                    "lastMessageDate": "2025-07-30T18:30:00Z",
                    "estado": "cerrado",
                    "mensajes": [
                        {
                            "tipo": "entrante",
                            "contenido": "¿Cuándo es mi próxima cita?",
                            "fecha": "2025-07-30T18:00:00Z"
                        },
                        {
                            "tipo": "saliente",
                            "contenido": "Tu próxima cita es el viernes a las 3pm",
                            "fecha": "2025-07-30T18:05:00Z"
                        }
                    ]
                },
                {
                    "numero_cliente": "555666777",
                    "empresa_perteneciente": "Tele Medicina", 
                    "lastMessageDate": "2025-07-30T21:00:00Z",
                    "estado": "abierto",
                    "mensajes": [
                        {
                            "tipo": "entrante",
                            "contenido": "Necesito renovar mi receta médica",
                            "fecha": "2025-07-30T21:00:00Z"
                        }
                    ]
                }
            ]
        }
    }

def get_conversaciones():
    try:
        # Intentar obtener del cache primero
        cached = redis_client.get(CACHE_KEY)
        if cached:
            logger.info("Datos obtenidos desde cache Redis")
            return json.loads(cached)
    except Exception as e:
        logger.warning(f"Error conectando a Redis: {e}")
    
    try:
        # Intentar obtener de la API externa
        logger.info(f"Obteniendo datos de API externa: {API_URL}")
        response = requests.get(API_URL, timeout=10)
        response.raise_for_status()
        data = response.json()
        
        # Guardar en cache si Redis está disponible
        try:
            redis_client.setex(CACHE_KEY, TTL, json.dumps(data))
            logger.info("Datos guardados en cache Redis")
        except Exception as e:
            logger.warning(f"No se pudo guardar en cache: {e}")
        
        return data
        
    except requests.exceptions.RequestException as e:
        logger.error(f"Error obteniendo datos de API externa: {e}")
        logger.info("Usando datos de prueba como fallback")
        return get_datos_prueba()
    
    except Exception as e:
        logger.error(f"Error inesperado: {e}")
        logger.info("Usando datos de prueba como fallback")
        return get_datos_prueba()
