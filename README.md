# 📋 ToDo App — FastAPI + HTMX + Alpine.js

Минималистичное CRUD-приложение «Список задач» с серверным рендерингом.

## Стек технологий

| Слой | Технологии |
|------|-----------|
| Бэкенд | FastAPI, SQLAlchemy 2.0 (async), asyncpg, Alembic, pydantic-settings |
| Фронтенд | Jinja2, HTMX, Alpine.js, Water.css (через CDN) |
| База данных | PostgreSQL |

**Без Docker, без Redis, без npm/webpack и сборки фронтенда.**

---

## Структура проекта

```
.
├── app/
│   ├── __init__.py
│   ├── main.py          # Точка входа FastAPI
│   ├── config.py         # Конфигурация (pydantic-settings)
│   ├── database.py       # Асинхронный движок и сессии
│   ├── models.py         # SQLAlchemy-модели
│   ├── schemas.py        # Pydantic-схемы
│   ├── crud.py           # CRUD-операции
│   ├── routes.py         # Маршруты (роуты)
│   └── templates/
│       ├── base.html     # Базовый шаблон
│       ├── index.html    # Главная страница
│       └── task_item.html # Частичный шаблон задачи
├── static/
│   └── style.css         # Кастомные стили
├── alembic/
│   ├── env.py            # Настройка асинхронных миграций
│   ├── script.py.mako    # Шаблон миграции
│   └── versions/
│       └── 001_initial.py # Первая миграция
├── alembic.ini           # Конфигурация Alembic
├── requirements.txt      # Python-зависимости
├── .env.example          # Пример переменных окружения
└── README.md             # Этот файл
```

---

## Установка и запуск

### 1. Клонируйте проект и перейдите в директорию

```bash
cd todo-app
```

### 2. Создайте виртуальное окружение

```bash
python3 -m venv venv
source venv/bin/activate  # Linux/macOS
# или
venv\Scripts\activate     # Windows
```

### 3. Установите зависимости

```bash
pip install -r requirements.txt
```

### 4. Настройте переменные окружения

```bash
cp .env.example .env
```

Отредактируйте `.env` и укажите реальные данные для подключения к PostgreSQL.

### 5. Примените миграции

```bash
alembic upgrade head
```

### 6. Запустите приложение

```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

Откройте в браузере: **http://localhost:8000**

---

## Настройка удалённого PostgreSQL

### Создание пользователя и базы данных

Подключитесь к серверу через `psql`:

```bash
psql -U postgres -h your-server-ip
```

Выполните SQL-команды:

```sql
-- Создать пользователя с паролем
CREATE USER todo_user WITH PASSWORD 'your_secure_password';

-- Создать базу данных
CREATE DATABASE todo_db OWNER todo_user;

-- Предоставить привилегии
GRANT ALL PRIVILEGES ON DATABASE todo_db TO todo_user;
```

### Разрешение удалённых подключений

#### 1. Отредактируйте `postgresql.conf`

Обычно находится в `/etc/postgresql/16/main/postgresql.conf`:

```conf
# Слушать все интерфейсы (или укажите конкретный IP)
listen_addresses = '*'

# Порт (по умолчанию 5432)
port = 5432
```

#### 2. Отредактируйте `pg_hba.conf`

Обычно находится в `/etc/postgresql/16/main/pg_hba.conf`:

Добавьте строку для разрешения подключений с вашего IP:

```conf
# TYPE  DATABASE  USER        ADDRESS         METHOD
host    todo_db   todo_user   0.0.0.0/0       scram-sha-256
```

> ⚠️ Для продакшена замените `0.0.0.0/0` на конкретный IP-адрес вашего приложения.

#### 3. Перезапустите PostgreSQL

```bash
sudo systemctl restart postgresql
```

#### 4. Откройте порт 5432 в файрволе

```bash
# UFW (Ubuntu/Debian)
sudo ufw allow 5432/tcp

# Или iptables
sudo iptables -A INPUT -p tcp --dport 5432 -j ACCEPT
```

### Пример DATABASE_URL

```
postgresql+asyncpg://todo_user:your_secure_password@your-server-ip:5432/todo_db
```

---

## Работа с миграциями (Alembic)

### Создать новую миграцию (автогенерация)

```bash
alembic revision --autogenerate -m "описание изменений"
```

### Применить миграции

```bash
alembic upgrade head        # Применить все миграции
alembic upgrade +1          # Применить следующую миграцию
alembic downgrade -1        # Откатить последнюю миграцию
alembic downgrade base      # Откатить все миграции
```

### Проверить статус

```bash
alembic current             # Текущая ревизия
alembic history             # История миграций
alembic heads               # Все «головы»
```

---

## API-эндпоинты

| Метод | Путь | Описание |
|-------|------|----------|
| GET | `/` | Главная страница со списком задач |
| POST | `/tasks` | Создать задачу (HTMX-ответ) |
| POST | `/tasks/{id}/toggle` | Переключить статус задачи |
| POST | `/tasks/{id}/delete` | Удалить задачу |

Также доступна документация Swagger: **http://localhost:8000/docs**

---

## Особенности реализации

- **HTMX** используется для динамического обновления без перезагрузки страницы:
  - Добавление задачи: форма отправляется через `hx-post`, результат вставляется в начало списка.
  - Переключение статуса: кнопка отправляет POST, элемент заменяется обновлённым фрагментом.
  - Удаление: кнопка отправляет POST, элемент удаляется из DOM.

- **Alpine.js** используется минимально — для очистки формы после успешного добавления.

- **Water.css** обеспечивает базовое оформление без написания CSS-классов.

- Все HTMX-ответы возвращают **частичные HTML-фрагменты** (не полную страницу).

- Код полностью **асинхронный** — от роутов до работы с БД.

---

## Лицензия

MIT
