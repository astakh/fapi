"""
Конфигурация приложения.
Загружает переменные из .env файла с помощью pydantic-settings.
"""

from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    """Настройки приложения, загружаемые из переменных окружения."""

    # Строка подключения к PostgreSQL (через asyncpg)
    # Пример: postgresql+asyncpg://user:password@host:5432/dbname
    database_url: str

    # Секретный ключ (для будущих расширений, например, сессий)
    secret_key: str = "change-me-in-production"

    # Режим отладки
    debug: bool = False

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"


# Глобальный экземпляр настроек
settings = Settings()
