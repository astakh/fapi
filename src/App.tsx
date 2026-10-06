import { useState } from 'react'

function App() {
  const [activeTab, setActiveTab] = useState<'overview' | 'structure' | 'setup' | 'api'>('overview')

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Header */}
      <header className="border-b border-slate-700/50 backdrop-blur-sm bg-slate-900/50 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-3xl">📋</span>
            <div>
              <h1 className="text-xl font-bold text-white">ToDo App</h1>
              <p className="text-xs text-slate-400">FastAPI + HTMX + Alpine.js</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-1 text-xs rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              Python 3.11+
            </span>
            <span className="px-2 py-1 text-xs rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30">
              Async
            </span>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="max-w-5xl mx-auto px-6 pt-6">
        <div className="flex gap-1 bg-slate-800/50 p-1 rounded-lg border border-slate-700/50">
          {([
            { id: 'overview' as const, label: '📖 Обзор' },
            { id: 'structure' as const, label: '📁 Структура' },
            { id: 'setup' as const, label: '🚀 Установка' },
            { id: 'api' as const, label: '🔌 API' },
          ]).map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-slate-700 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </nav>

      {/* Content */}
      <main className="max-w-5xl mx-auto px-6 py-8">
        {activeTab === 'overview' && <OverviewTab />}
        {activeTab === 'structure' && <StructureTab />}
        {activeTab === 'setup' && <SetupTab />}
        {activeTab === 'api' && <ApiTab />}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-700/50 mt-12">
        <div className="max-w-5xl mx-auto px-6 py-6 text-center text-slate-500 text-sm">
          <p>Минималистичный шаблон • Без Docker • Без Redis • Без сборки фронтенда</p>
        </div>
      </footer>
    </div>
  )
}

function OverviewTab() {
  return (
    <div className="space-y-8">
      <div className="text-center py-8">
        <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
          Список задач на FastAPI + HTMX
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto">
          Минималистичный CRUD-шаблон с серверным рендерингом. Динамические обновления без JavaScript-фреймворка,
          асинхронная работа с PostgreSQL, миграции через Alembic.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TechCard
          title="Бэкенд"
          icon="⚡"
          items={['FastAPI', 'SQLAlchemy 2.0 (async)', 'asyncpg', 'Alembic', 'pydantic-settings']}
        />
        <TechCard
          title="Фронтенд"
          icon="🎨"
          items={['Jinja2 (шаблоны)', 'HTMX (динамика)', 'Alpine.js (мелочи)', 'Water.css (стиль)']}
        />
        <TechCard
          title="База данных"
          icon="🐘"
          items={['PostgreSQL', 'Асинхронное подключение', 'Миграции через Alembic', 'Через DATABASE_URL']}
        />
        <TechCard
          title="Принципы"
          icon="✨"
          items={['Без Docker', 'Без Redis', 'Без npm/webpack', 'Без сборки фронтенда']}
        />
      </div>

      <div className="bg-slate-800/50 rounded-xl border border-slate-700/50 p-6">
        <h3 className="text-lg font-semibold mb-4 text-emerald-400">🎯 Возможности HTMX</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Feature
            title="Добавление"
            description="Форма отправляется через hx-post, результат вставляется в начало списка без перезагрузки"
          />
          <Feature
            title="Переключение"
            description="Кнопка отправляет POST, элемент заменяется обновлённым HTML-фрагментом"
          />
          <Feature
            title="Удаление"
            description="Кнопка отправляет POST, элемент удаляется из DOM (hx-swap=outerHTML)"
          />
        </div>
      </div>
    </div>
  )
}

function StructureTab() {
  const treeLines = [
    '.',
    '├── app/',
    '│   ├── __init__.py',
    '│   ├── main.py          # Точка входа FastAPI',
    '│   ├── config.py        # Конфигурация (pydantic-settings)',
    '│   ├── database.py      # Асинхронный движок и сессии',
    '│   ├── models.py        # SQLAlchemy-модели',
    '│   ├── schemas.py       # Pydantic-схемы',
    '│   ├── crud.py          # CRUD-операции',
    '│   ├── routes.py        # Маршруты (роуты)',
    '│   └── templates/',
    '│       ├── base.html    # Базовый шаблон',
    '│       ├── index.html   # Главная страница',
    '│       └── task_item.html # Частичный шаблон задачи',
    '├── static/',
    '│   └── style.css        # Кастомные стили',
    '├── alembic/',
    '│   ├── env.py           # Настройка асинхронных миграций',
    '│   ├── script.py.mako   # Шаблон миграции',
    '│   └── versions/',
    '│       └── 001_initial.py # Первая миграция',
    '├── alembic.ini          # Конфигурация Alembic',
    '├── requirements.txt     # Python-зависимости',
    '├── .env.example         # Пример переменных окружения',
    '└── README.md            # Документация',
  ]

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">📁 Структура проекта</h2>
      <div className="bg-slate-800/50 rounded-xl border border-slate-700/50 p-6 overflow-x-auto">
        <pre className="text-sm text-slate-300 font-mono leading-relaxed">
          {treeLines.join('\n')}
        </pre>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FileCard name="main.py" desc="Создание FastAPI-приложения, подключение статики и роутов" />
        <FileCard name="config.py" desc="Загрузка настроек из .env через pydantic-settings" />
        <FileCard name="database.py" desc="Асинхронный движок, фабрика сессий, зависимость get_db" />
        <FileCard name="models.py" desc="Модель Task (SQLAlchemy 2.0 стиль с Mapped)" />
        <FileCard name="crud.py" desc="Функции CRUD: получить все, создать, переключить, удалить" />
        <FileCard name="routes.py" desc="Роуты: GET /, POST /tasks, toggle, delete" />
      </div>
    </div>
  )
}

function SetupTab() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">🚀 Установка и запуск</h2>

      <div className="space-y-4">
        <Step number={1} title="Создайте виртуальное окружение">
          <CodeBlock code="python3 -m venv venv&#10;source venv/bin/activate  # Linux/macOS&#10;venv\Scripts\activate     # Windows" />
        </Step>

        <Step number={2} title="Установите зависимости">
          <CodeBlock code="pip install -r requirements.txt" />
        </Step>

        <Step number={3} title="Настройте переменные окружения">
          <CodeBlock code={"cp .env.example .env\n\n# Отредактируйте .env:\n# DATABASE_URL=postgresql+asyncpg://user:pass@host:5432/todo_db\n# SECRET_KEY=your-secret-key\n# DEBUG=true"} />
        </Step>

        <Step number={4} title="Примените миграции">
          <CodeBlock code="alembic upgrade head" />
        </Step>

        <Step number={5} title="Запустите приложение">
          <CodeBlock code="uvicorn app.main:app --reload --host 0.0.0.0 --port 8000" />
        </Step>

        <Step number={6} title="Откройте в браузере">
          <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600/50">
            <a href="http://localhost:8000" className="text-cyan-400 hover:text-cyan-300 font-mono">
              http://localhost:8000
            </a>
            <p className="text-slate-400 text-sm mt-2">
              Документация Swagger: <span className="text-cyan-400 font-mono">http://localhost:8000/docs</span>
            </p>
          </div>
        </Step>
      </div>

      <div className="bg-slate-800/50 rounded-xl border border-slate-700/50 p-6 mt-8">
        <h3 className="text-lg font-semibold mb-4 text-amber-400">🐘 Настройка PostgreSQL</h3>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-slate-400 mb-2">Создание пользователя и БД:</p>
            <CodeBlock code={"CREATE USER todo_user WITH PASSWORD 'your_password';\nCREATE DATABASE todo_db OWNER todo_user;\nGRANT ALL PRIVILEGES ON DATABASE todo_db TO todo_user;"} />
          </div>
          <div>
            <p className="text-sm text-slate-400 mb-2">postgresql.conf:</p>
            <CodeBlock code={"listen_addresses = '*'"} />
          </div>
          <div>
            <p className="text-sm text-slate-400 mb-2">pg_hba.conf:</p>
            <CodeBlock code="host  todo_db  todo_user  0.0.0.0/0  scram-sha-256" />
          </div>
          <div>
            <p className="text-sm text-slate-400 mb-2">Открыть порт:</p>
            <CodeBlock code="sudo ufw allow 5432/tcp" />
          </div>
        </div>
      </div>
    </div>
  )
}

function ApiTab() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">🔌 API Endpoints</h2>

      <div className="space-y-4">
        <Endpoint
          method="GET"
          path="/"
          description="Главная страница со списком задач и формой добавления"
          response="Полный HTML (base.html + index.html)"
        />
        <Endpoint
          method="POST"
          path="/tasks"
          description="Создание новой задачи"
          response="HTML-фрагмент задачи (task_item.html)"
          body="title: string, description?: string"
        />
        <Endpoint
          method="POST"
          path="/tasks/{id}/toggle"
          description="Переключение статуса задачи"
          response="Обновлённый HTML-фрагмент задачи"
        />
        <Endpoint
          method="POST"
          path="/tasks/{id}/delete"
          description="Удаление задачи"
          response="Пустой ответ (200)"
        />
      </div>

      <div className="bg-slate-800/50 rounded-xl border border-slate-700/50 p-6 mt-8">
        <h3 className="text-lg font-semibold mb-4 text-purple-400">🔄 Как работает HTMX</h3>
        <div className="space-y-3 text-sm text-slate-300">
          <div className="flex gap-3">
            <span className="text-emerald-400 font-mono shrink-0">hx-post</span>
            <span>Отправляет POST-запрос на указанный URL</span>
          </div>
          <div className="flex gap-3">
            <span className="text-emerald-400 font-mono shrink-0">hx-target</span>
            <span>Указывает, куда вставить ответ (CSS-селектор или ID)</span>
          </div>
          <div className="flex gap-3">
            <span className="text-emerald-400 font-mono shrink-0">hx-swap</span>
            <span>Определяет способ замены: innerHTML, outerHTML, afterbegin и др.</span>
          </div>
          <div className="flex gap-3">
            <span className="text-emerald-400 font-mono shrink-0">hx-confirm</span>
            <span>Показывает диалог подтверждения перед отправкой</span>
          </div>
          <div className="flex gap-3">
            <span className="text-emerald-400 font-mono shrink-0">hx-on::after-request</span>
            <span>Событие после запроса — используем для очистки формы</span>
          </div>
        </div>
      </div>

      <div className="bg-slate-800/50 rounded-xl border border-slate-700/50 p-6">
        <h3 className="text-lg font-semibold mb-4 text-cyan-400">💡 Пример: форма добавления</h3>
        <CodeBlock code={'<form\n    hx-post="/tasks"\n    hx-target="#task-list"\n    hx-swap="afterbegin"\n    hx-on::after-request="if(event.detail.successful) this.reset()"\n>\n    <input type="text" name="title" required>\n    <textarea name="description"></textarea>\n    <button type="submit">Добавить</button>\n</form>'} />
      </div>
    </div>
  )
}

// === UI Components ===

function TechCard({ title, icon, items }: { title: string; icon: string; items: string[] }) {
  return (
    <div className="bg-slate-800/50 rounded-xl border border-slate-700/50 p-5">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-xl">{icon}</span>
        <h3 className="font-semibold text-white">{title}</h3>
      </div>
      <ul className="space-y-1.5">
        {items.map((item, i) => (
          <li key={i} className="text-sm text-slate-400 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/60"></span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

function Feature({ title, description }: { title: string; description: string }) {
  return (
    <div className="bg-slate-700/30 rounded-lg p-4 border border-slate-600/30">
      <h4 className="font-medium text-white mb-1">{title}</h4>
      <p className="text-sm text-slate-400">{description}</p>
    </div>
  )
}

function FileCard({ name, desc }: { name: string; desc: string }) {
  return (
    <div className="bg-slate-800/50 rounded-lg border border-slate-700/50 p-4">
      <code className="text-emerald-400 text-sm font-mono">{name}</code>
      <p className="text-sm text-slate-400 mt-1">{desc}</p>
    </div>
  )
}

function Step({ number, title, children }: { number: number; title: string; children: React.ReactNode }) {
  return (
    <div className="bg-slate-800/50 rounded-xl border border-slate-700/50 p-5">
      <div className="flex items-center gap-3 mb-3">
        <span className="w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-sm font-bold border border-emerald-500/30">
          {number}
        </span>
        <h3 className="font-semibold text-white">{title}</h3>
      </div>
      {children}
    </div>
  )
}

function CodeBlock({ code }: { code: string }) {
  return (
    <pre className="bg-slate-900/80 rounded-lg p-4 border border-slate-700/50 overflow-x-auto">
      <code className="text-sm text-slate-300 font-mono whitespace-pre">{code}</code>
    </pre>
  )
}

function Endpoint({
  method,
  path,
  description,
  response,
  body,
}: {
  method: string
  path: string
  description: string
  response: string
  body?: string
}) {
  const methodColor = method === 'GET'
    ? 'bg-blue-500/20 text-blue-400 border-blue-500/30'
    : 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'

  return (
    <div className="bg-slate-800/50 rounded-xl border border-slate-700/50 p-5">
      <div className="flex items-center gap-3 mb-2">
        <span className={`px-2 py-0.5 text-xs font-bold rounded border ${methodColor}`}>
          {method}
        </span>
        <code className="text-white font-mono text-sm">{path}</code>
      </div>
      <p className="text-sm text-slate-400 mb-2">{description}</p>
      <div className="text-xs text-slate-500">
        <span className="text-slate-400">Ответ:</span> {response}
      </div>
      {body && (
        <div className="text-xs text-slate-500 mt-1">
          <span className="text-slate-400">Тело:</span> {body}
        </div>
      )}
    </div>
  )
}

export default App
