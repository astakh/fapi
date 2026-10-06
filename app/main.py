"""
Главный файл приложения FastAPI.
Точка входа: uvicorn app.main:app --reload
"""

from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles

from app.config import settings
from app.routes import router

# Создаём экземпляр приложения
app = FastAPI(
    title="ToDo App",
    description="Минималистичное приложение «Список задач» на FastAPI + HTMX",
    version="1.0.0",
    debug=settings.debug,
)

# Подключаем статические файлы
app.mount("/static", StaticFiles(directory="static"), name="static")

# Подключаем маршруты
app.include_router(router)
