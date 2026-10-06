"""
Pydantic-схемы для валидации входных данных.
"""

from datetime import datetime

from pydantic import BaseModel, Field


class TaskCreate(BaseModel):
    """Схема для создания задачи."""
    title: str = Field(..., min_length=1, max_length=200, description="Название задачи")
    description: str | None = Field(None, max_length=1000, description="Описание задачи")


class TaskResponse(BaseModel):
    """Схема ответа с данными задачи."""
    id: int
    title: str
    description: str | None
    completed: bool
    created_at: datetime

    model_config = {"from_attributes": True}
