"""
CRUD-операции для модели Task.
Все функции асинхронные, принимают сессию БД.
"""

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models import Task
from app.schemas import TaskCreate


async def get_all_tasks(session: AsyncSession) -> list[Task]:
    """Получить все задачи, отсортированные по дате создания (новые сверху)."""
    result = await session.execute(
        select(Task).order_by(Task.created_at.desc())
    )
    return list(result.scalars().all())


async def get_task_by_id(session: AsyncSession, task_id: int) -> Task | None:
    """Получить задачу по ID."""
    result = await session.execute(
        select(Task).where(Task.id == task_id)
    )
    return result.scalar_one_or_none()


async def create_task(session: AsyncSession, task_data: TaskCreate) -> Task:
    """Создать новую задачу."""
    task = Task(
        title=task_data.title,
        description=task_data.description,
    )
    session.add(task)
    await session.flush()
    # Обновляем объект, чтобы получить created_at из БД
    await session.refresh(task)
    return task


async def toggle_task(session: AsyncSession, task_id: int) -> Task | None:
    """Переключить статус выполнения задачи."""
    task = await get_task_by_id(session, task_id)
    if task is None:
        return None
    task.completed = not task.completed
    await session.flush()
    await session.refresh(task)
    return task


async def delete_task(session: AsyncSession, task_id: int) -> bool:
    """Удалить задачу. Возвращает True, если задача была удалена."""
    task = await get_task_by_id(session, task_id)
    if task is None:
        return False
    await session.delete(task)
    await session.flush()
    return True
