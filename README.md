# 📝 ThinkBoard - MERN Notes Application

Uma aplicação moderna de notas construída com a stack **MERN** (MongoDB, Express, React, Node.js). ThinkBoard permite criar, ler, atualizar e deletar notas com uma interface intuitiva, proteção contra abuso via rate limiting e design responsivo.

## ✨ Características

- ✅ **CRUD Completo**: Criar, ler, atualizar e deletar notas
- 🛡️ **Rate Limiting**: Proteção contra abuso usando Upstash Redis
- 📱 **Design Responsivo**: Interface adaptada para mobile, tablet e desktop
- 🎨 **UI Moderna**: Construída com DaisyUI e Tailwind CSS
- ⚡ **Performance**: Vite para build rápido e HMR no desenvolvimento
- 🔄 **Time Stamps**: Registro automático de criação e atualização
- 🚀 **Production Ready**: Configuração para deploy em produção

---

## 🏗️ Arquitetura do Projeto

### Visão Geral

```
mern-thinboard/
├── backend/                 # Servidor Node.js + Express
│   ├── src/
│   │   ├── config/         # Configurações (DB, Rate Limiter)
│   │   ├── controllers/    # Lógica de negócio
│   │   ├── models/         # Schemas MongoDB
│   │   ├── routes/         # Definição de rotas API
│   │   ├── middleware/     # Middlewares customizados
│   │   └── server.js       # Entry point
│   └── package.json
│
├── frontend/                # Aplicação React + Vite
│   ├── src/
│   │   ├── components/     # Componentes reutilizáveis
│   │   ├── pages/          # Páginas da aplicação
│   │   ├── lib/            # Utilitários e configurações
│   │   ├── App.jsx         # Componente raiz com rotas
│   │   ├── main.jsx        # Entry point React
│   │   └── index.css       # Estilos globais
│   └── package.json
│
├── Notes/                   # Documentação adicional
└── package.json            # Scripts de build/start root
```

---

## 📊 Fluxo de Dados

### Request/Response Flow

```
┌─────────────────────────────────────────────────────────────┐
│                     FRONTEND (React)                        │
│  ┌──────────────┐  ┌──────────────┐  ┌────────────────┐   │
│  │ Pages        │  │ Components   │  │ Lib (axios)    │   │
│  │ - HomePage   │  │ - Navbar     │  │ - utils        │   │
│  │ - CreatePage │  │ - NoteCard   │  │ - formatDate   │   │
│  │ - DetailPage │  │ - RateLimit  │  │                │   │
│  └──────────────┘  └──────────────┘  └────────────────┘   │
└────────┬─────────────────────────────────────────────────────┘
         │ HTTP Requests (Axios)
         ▼
┌─────────────────────────────────────────────────────────────┐
│                     BACKEND (Express)                       │
│  ┌────────────────────────────────────────────────────────┐ │
│  │ Routes: /api/notes                                     │ │
│  │ - GET /         → getAllNotes()                        │ │
│  │ - GET /:id      → getNoteById()                        │ │
│  │ - POST /        → createNote()                         │ │
│  │ - PUT /:id      → updateNote()                         │ │
│  │ - DELETE /:id   → deleteNote()                         │ │
│  └────────────────────────────────────────────────────────┘ │
│            │                                                  │
│            ▼                                                  │
│  ┌────────────────────────────────────────────────────────┐ │
│  │ Middleware: rateLimiter (Upstash Redis)               │ │
│  │ - Valida limite de 100 requisições/60s                │ │
│  │ - Retorna 429 se excedido                             │ │
│  └────────────────────────────────────────────────────────┘ │
│            │                                                  │
│            ▼                                                  │
│  ┌────────────────────────────────────────────────────────┐ │
│  │ Controllers: notesController                           │ │
│  │ - Processa requisições e lógica                        │ │
│  │ - Interage com modelos                                │ │
│  └────────────────────────────────────────────────────────┘ │
│            │                                                  │
│            ▼                                                  │
│  ┌────────────────────────────────────────────────────────┐ │
│  │ Models: Note (Mongoose Schema)                         │ │
│  │ - title (String, required)                            │ │
│  │ - content (String, required)                          │ │
│  │ - timestamps (createdAt, updatedAt)                   │ │
│  └────────────────────────────────────────────────────────┘ │
│            │                                                  │
│            ▼                                                  │
│  ┌────────────────────────────────────────────────────────┐ │
│  │ MongoDB Database                                       │ │
│  │ - Armazena documentos Note                            │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔧 Stack Tecnológico

### Backend
- **Runtime**: Node.js 18+
- **Framework**: Express 4.18.2
- **Database**: MongoDB via Mongoose 8.14.3
- **Rate Limiting**: Upstash Redis + @upstash/ratelimit
- **Middleware**: CORS, dotenv
- **Dev Tools**: Nodemon

```json
{
  "dependencies": {
    "express": "^4.18.2",
    "mongoose": "^8.14.3",
    "cors": "^2.8.5",
    "dotenv": "^16.5.0",
    "@upstash/redis": "^1.34.9",
    "@upstash/ratelimit": "^2.0.5"
  },
  "devDependencies": {
    "nodemon": "^3.1.10"
  }
}
```

### Frontend
- **Framework**: React 19.2.8 com React Router 8.3.1
- **Build Tool**: Vite 8.2.2 (super rápido!)
- **Styling**: Tailwind CSS 3.4.19 + DaisyUI 4.12.24
- **HTTP Client**: Axios 1.20.0
- **UI Icons**: Lucide React 1.42.0
- **Toast Notifications**: React Hot Toast 2.6.0

```json
{
  "dependencies": {
    "react": "^19.2.8",
    "react-dom": "^19.2.8",
    "react-router": "^8.3.1",
    "axios": "^1.20.0",
    "tailwindcss": "^3.4.19",
    "daisyui": "^4.12.24",
    "lucide-react": "^1.42.0",
    "react-hot-toast": "^2.6.0"
  },
  "devDependencies": {
    "vite": "^8.2.2",
    "@vitejs/plugin-react": "^6.1.0"
  }
}
```

---

## 📁 Estrutura Detalhada

### Backend

#### `/backend/src/config/db.js`
Configura a conexão com MongoDB usando Mongoose.
```javascript
- Conecta ao banco de dados via MONGO_URI
- Exibe mensagem de erro se falhar
- Encerra processo se conexão falhar
```

#### `/backend/src/config/upstash.js`
Configura o rate limiter com Upstash Redis.
```javascript
- Limite: 100 requisições por 60 segundos (sliding window)
- Lê credenciais do .env (UPSTASH_REDIS_*)
```

#### `/backend/src/models/Note.js`
Define o schema do MongoDB para notas.
```javascript
Note {
  title: String (required),
  content: String (required),
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
```

#### `/backend/src/controllers/notesController.js`
Lógica de negócio para operações CRUD:
- `getAllNotes()` - Retorna todas as notas ordenadas por data (desc)
- `getNoteById()` - Retorna uma nota específica
- `createNote()` - Cria nova nota
- `updateNote()` - Atualiza nota existente
- `deleteNote()` - Deleta nota

#### `/backend/src/routes/notesRoutes.js`
Define as rotas da API:
```
GET    /api/notes       - Lista todas
GET    /api/notes/:id   - Detalhes de uma
POST   /api/notes       - Cria nova
PUT    /api/notes/:id   - Atualiza
DELETE /api/notes/:id   - Deleta
```

#### `/backend/src/middleware/rateLimiter.js`
Middleware que valida o rate limit antes de processar requisições.
```javascript
- Usa Upstash para rastrear requisições
- Retorna 429 (Too Many Requests) se exceder limite
- Prossegue normalmente se dentro do limite
```

#### `/backend/src/server.js`
Entry point da aplicação:
```javascript
- Configura Express
- CORS (apenas localhost:5173 em dev)
- Middleware (JSON parser, rate limiter)
- Conecta ao MongoDB
- Serve frontend em produção
- Escuta na porta 5001 (ou PORT env var)
```

### Frontend

#### `/frontend/src/main.jsx`
Entry point React:
- Renderiza App dentro de `<BrowserRouter>`
- Adiciona `<Toaster/>` para notificações

#### `/frontend/src/App.jsx`
Componente raiz com sistema de rotas:
```javascript
/          → HomePage (lista de notas)
/create    → CreatePage (formulário)
/note/:id  → NoteDetailPage (editar/ver detalhes)
```
Background com gradiente radial customizado.

#### `/frontend/src/lib/axios.js`
Configuração do Axios com baseURL dinâmica:
```javascript
- Dev: http://localhost:5001/api
- Prod: /api (same domain)
```

#### `/frontend/src/lib/utils.js`
Utilitários:
- `formatDate()` - Formata data no padrão "MMM D, YYYY"

#### `/frontend/src/components/Navbar.jsx`
Barra de navegação:
- Logo "ThinkBoard"
- Botão "New Note" com ícone de plus

#### `/frontend/src/components/NoteCard.jsx`
Card para cada nota (na HomePage):
- Mostra title e preview do content
- Data de criação formatada
- Botões de editar e deletar
- Confirmação antes de deletar
- Notificações com toast

#### `/frontend/src/components/RateLimiteUi.jsx`
Tela mostrada quando rate limit é atingido:
- Mensagem de aviso
- Icone de caveira 💀

#### `/frontend/src/components/NotesNotFound.jsx`
Tela vazia quando não há notas

#### `/frontend/src/pages/HomePage.jsx`
Página inicial:
- Busca todas as notas ao carregar
- Exibe grid de cards
- Tratamento de rate limit (mostra UI específica)
- Loading state

#### `/frontend/src/pages/CreatePage.jsx`
Página para criar nova nota:
- Formulário com title e content
- Validação (campos obrigatórios)
- Envio para API
- Redirect para homepage após criar
- Tratamento de rate limit

#### `/frontend/src/pages/NoteDetailPage.jsx`
Página para editar/visualizar nota:
- Carrega nota por ID
- Permite editar title e content
- Salva alterações
- Opção de deletar
- Navegação de volta

---

## 🚀 Como Rodar

### Pré-requisitos
- Node.js 18+ e npm/yarn
- MongoDB rodando (local ou Atlas)
- Conta Upstash Redis (gratuita)

### 1. Clone o Repositório
```bash
git clone https://github.com/brazgustavo/mern-thinboard.git
cd mern-thinboard
```

### 2. Variáveis de Ambiente

#### Backend (`.env` na raiz)
```env
PORT=5001
MONGO_URI=mongodb+srv://user:password@cluster.mongodb.net/thinboard
NODE_ENV=development

# Upstash Redis (obtém em https://upstash.com)
UPSTASH_REDIS_REST_URL=https://...
UPSTASH_REDIS_REST_TOKEN=...
```

#### Frontend
Não precisa de `.env`, usa valores padrão em `frontend/src/lib/axios.js`

### 3. Instalar Dependências

#### Usando script root (recomendado)
```bash
npm run build
```

#### Manual
```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### 4. Desenvolvimento

**Terminal 1 - Backend**
```bash
cd backend
npm run dev
# Servidor rodando em http://localhost:5001
```

**Terminal 2 - Frontend**
```bash
cd frontend
npm run dev
# App rodando em http://localhost:5173
```

### 5. Produção

```bash
npm run build
npm start
```
- Backend roda em porta 5001
- Frontend é servido pelo Express em `/`

---

## 📡 API Endpoints

### GET `/api/notes`
Retorna todas as notas ordenadas por data (mais recentes primeiro).

**Response (200)**
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "title": "Minha Primeira Nota",
    "content": "Conteúdo da nota...",
    "createdAt": "2024-09-10T15:30:00Z",
    "updatedAt": "2024-09-10T15:30:00Z",
    "__v": 0
  }
]
```

### GET `/api/notes/:id`
Retorna uma nota específica.

**Response (200)**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "title": "Minha Nota",
  "content": "Conteúdo...",
  "createdAt": "2024-09-10T15:30:00Z",
  "updatedAt": "2024-09-10T15:30:00Z"
}
```

**Response (404)** - Nota não encontrada
```json
{ "message": "Note not Found" }
```

### POST `/api/notes`
Cria uma nova nota.

**Request Body**
```json
{
  "title": "Nova Nota",
  "content": "Conteúdo da nota"
}
```

**Response (201)**
```json
{
  "_id": "507f1f77bcf86cd799439012",
  "title": "Nova Nota",
  "content": "Conteúdo da nota",
  "createdAt": "2024-09-10T16:00:00Z",
  "updatedAt": "2024-09-10T16:00:00Z"
}
```

### PUT `/api/notes/:id`
Atualiza uma nota existente.

**Request Body**
```json
{
  "title": "Título Atualizado",
  "content": "Conteúdo atualizado"
}
```

**Response (200)** - Sucesso

### DELETE `/api/notes/:id`
Deleta uma nota.

**Response (200)**
```json
{ "message": "Note Deleted Sucessfully" }
```

### Rate Limit
Todos os endpoints estão sujeitos a rate limiting:
- **Limite**: 100 requisições por 60 segundos
- **Resposta (429)** quando excedido:
```json
{ "message": "Too many Requests , please try again later" }
```

---

## 🎨 Features do Frontend

### Componentes React
- **Navbar**: Navegação principal com botão de criar nota
- **NoteCard**: Card interativo mostrando preview da nota
- **RateLimiteUi**: UI customizada para erro 429
- **NotesNotFound**: Tela vazia com mensagem

### Pages
- **HomePage**: Lista todas as notas em grid responsivo
- **CreatePage**: Formulário para criar nova nota
- **NoteDetailPage**: Editor para atualizar nota existente

### Styling
- **Tailwind CSS**: Utility-first CSS
- **DaisyUI**: Componentes pré-estilizados
- **Responsive Design**: Mobile-first com breakpoints (md, lg)

### Notificações
- **React Hot Toast**: Feedback visual de ações
  - Sucesso ao criar/deletar
  - Erro em falhas
  - Aviso de rate limit

---

## 🔒 Segurança

### Implementado
- ✅ **Rate Limiting**: Proteção contra abuso (100 req/60s)
- ✅ **CORS**: Restrito a localhost:5173 em dev
- ✅ **Input Validation**: Campos obrigatórios no frontend
- ✅ **Error Handling**: Tratamento de exceções com status codes apropriados

### Recomendações Futuras
- 🔐 Autenticação (JWT/Sessions)
- 🔒 Autorização (apenas dono pode editar)
- 🛡️ Validação de entrada no backend
- 📋 Logging de requisições
- 🚨 Monitoring e alertas

---

## 📦 Scripts Disponíveis

### Root
```bash
npm run build   # Instala deps e faz build do frontend
npm start       # Inicia servidor (NODE_ENV=production)
```

### Backend
```bash
npm run dev     # Inicia com nodemon (dev)
npm start       # Inicia servidor (production)
```

### Frontend
```bash
npm run dev     # Dev server Vite (http://localhost:5173)
npm run build   # Build otimizado para produção
npm run preview # Preview da build
npm run lint    # ESLint
```

---

## 📈 Performance

### Frontend (Vite)
- ⚡ **HMR Instantâneo**: Hot Module Replacement
- 📦 **Build Otimizado**: Minimização e tree-shaking
- 🎯 **Code Splitting**: Carregamento lazy de rotas

### Backend (Express)
- 🔄 **Connection Pooling**: Mongoose gerencia pool
- 🚀 **Stateless**: Fácil scale horizontal
- ⚙️ **Middleware Otimizado**: Rate limiter em Redis

---

## 🐛 Troubleshooting

### "Cannot connect to MongoDB"
```bash
# Verificar MONGO_URI no .env
# Certificar que MongoDB está rodando (local ou Atlas)
# Checar whitelist de IP no Atlas
```

### "Rate limit Redis error"
```bash
# Verificar UPSTASH_REDIS_REST_URL e TOKEN no .env
# Checar se credenciais estão corretas em https://upstash.com
```

### "CORS error no frontend"
```bash
# Garantir que backend roda em localhost:5001
# Frontend deve estar em localhost:5173 em dev
```

### "Vite connection refused"
```bash
# Frontend precisa do backend rodando
# Verificar se backend está na porta 5001
# Reiniciar ambos os servidores
```

---

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

---

## 📄 Licença

Este projeto está sob a licença ISC.

---

## 👨‍💻 Autor

**Gustavo Braz**
- GitHub: [@brazgustavo](https://github.com/brazgustavo)
- Repositório: [mern-thinboard](https://github.com/brazgustavo/mern-thinboard)


