from fastapi import FastAPI
from routes.Analytics import router as analytics_router
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

app.include_router(analytics_router, prefix="/api")


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # o especifica ["http://localhost:3000"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)