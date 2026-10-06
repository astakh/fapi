"""
Маршруты (роуты) приложения.
Возвращают HTML-фрагменты для HTMX или полные страницы.
"""

from fastapi import APIRouter, Depends, HTTPException, Request
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates
from sqlalchemy.ext.asyncio import AsyncSession

from app import crud
from app.database import get_db
from app.schemas import TaskCreate

router = APIRouter()
templates = Jinja2Templates(directory="app/templates")


@router.get("/", response_class=HTMLResponse)
async def index(request: Request, session: AsyncSession = Depends(get_db)):
    """
    Главная страница: список задач и форма добавления.
    Рендерит полный шаблон base.html с содержимым.
    """
    tasks = await crud.get_all_tasks(session)
    return templates.TemplateResponse(
        "index.html",
        {"request": request, "tasks": tasks},
    )


@router.post("/tasks", response_class=HTMLResponse)
async def create_task(
    request: Request,
    session: AsyncSession = Depends(get_db),
):
    """
    Создание новой задачи.
    Возвращает HTML-фрагмент задачи для вставки в список через HTMX.
    """
    form = await request.form()
    title = form.get("title", "").strip()
    description = form.get("description", "").strip() or None

    if not title:
        # Если заголовок пустой — вернём ошибку
        return HTMLResponse(
            content='<p style="color: red;">Название задачи не может быть пустым.</p>',
            status_code=422,
        )

    task_data = TaskCreate(title=title, description=description)
    task = await crud.create_task(session, task_data)

    # Возвращаем только фрагмент задачи для HTMX
    return templates.TemplateResponse(
        "task_item.html",
        {"request": request, "task": task},
    )


@router.post("/tasks/{task_id}/toggle", response_class=HTMLResponse)
async def toggle_task(
    task_id: int,
    request: Request,
    session: AsyncSession = Depends(get_db),
):
    """
    Переключение статуса задачи.
    Возвращает обновлённый HTML-фрагмент задачи.
    """
    task = await crud.toggle_task(session, task_id)
    if task is None:
        raise HTTPException(status_code=404, detail="Задача не найдена")

    return templates.TemplateResponse(
        "task_item.html",
        {"request": request, "task": task},
    )


@router.post("/tasks/{task_id}/delete", response_class=HTMLResponse)
async def delete_task(
    task_id: int,
    session: AsyncSession = Depends(get_db),
):
    """
    Удаление задачи.
    HTMX удалит элемент из DOM автоматически (hx-swap="outerHTML").
    Возвращаем пустой ответ.
    """
    deleted = await crud.delete_task(session, task_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Задача не найдена")

    # Возвращаем пустой ответ — HTMX заменит элемент пустым содержимым
    return HTMLResponse(content="", status_code=200)
