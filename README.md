# Danizz Store

Uma aplicação full-stack de uma loja de afiliados moderna com painel administrativo para gestão de produtos e categorias.

## Tecnologias

### Backend
- **Node.js** - Runtime JavaScript
- **Express** - Framework web
- **MongoDB** - Banco de dados NoSQL
- **Mongoose** - ODM para MongoDB
- **JWT** - Autenticação via JSON Web Tokens
- **bcryptjs** - Hash de senhas
- **CORS** - Cross-Origin Resource Sharing
- **dotenv** - Gerenciamento de variáveis de ambiente

### Frontend
- **React 19** - Biblioteca UI
- **Vite** - Build tool e dev server
- **React Router DOM** - Roteamento
- **CSS** - Estilização

## Funcionalidades

- **Autenticação de Usuários**
  - Login seguro com JWT
  - Painel administrativo protegido
  - Seed automático de usuário admin

- **Gestão de Produtos**
  - CRUD completo de produtos
  - Categorias organizadas
  - Links para YouTube e compra
  - Imagens de produtos

- **Gestão de Categorias**
  - CRUD de categorias
  - Associação com produtos

- **Interface do Usuário**
  - Página inicial com banner
  - Listagem de produtos
  - Detalhes do produto
  - Filtros por categoria
  - Design responsivo

## Pré-requisitos

- Node.js (v18 ou superior)
- MongoDB (local ou Atlas)
- npm ou yarn

## Instalação

### 1. Clone o repositório
```bash
git clone https://github.com/danixz02/danizz-store.git
cd danizz-store
```

### 2. Configure o Backend
```bash
cd backend
npm install
```

Crie um arquivo `.env` no diretório `backend/` com as seguintes variáveis:
```env
MONGODB_URI=sua_string_de_conexao_mongodb
JWT_SECRET=sua_chave_secreta_jwt
PORT=3000
```

### 3. Configure o Frontend
```bash
cd ../frontend
npm install
```

## Execução

### Iniciar o Backend
```bash
cd backend
npm run dev
```
O servidor iniciará em `http://localhost:3000`

### Iniciar o Frontend
```bash
cd frontend
npm run dev
```
A aplicação estará disponível em `http://localhost:5173`

## Estrutura do Projeto

```
danizz-store/
├── backend/
│   ├── models/          # Modelos Mongoose
│   │   ├── Produto.js
│   │   ├── Categoria.js
│   │   └── Usuario.js
│   ├── routes/          # Rotas da API
│   │   ├── produtoRoutes.js
│   │   ├── categoriaRoutes.js
│   │   └── authRoutes.js
│   ├── middleware/      # Middlewares
│   ├── utils/           # Utilitários e seeds
│   ├── scripts/         # Scripts auxiliares
│   └── server.js        # Entry point do backend
├── frontend/
│   ├── src/
│   │   ├── Pages/       # Páginas da aplicação
│   │   │   ├── AdminPanel.jsx
│   │   │   ├── DetailsProduct.jsx
│   │   │   └── Login.jsx
│   │   ├── components/  # Componentes reutilizáveis
│   │   │   ├── Banner/
│   │   │   ├── FilterProduct/
│   │   │   ├── Footer/
│   │   │   ├── Header/
│   │   │   ├── ProductCard/
│   │   │   ├── ProductSection/
│   │   │   └── ProtectedRoute/
│   │   ├── context/     # Contextos React
│   │   ├── services/    # Serviços de API
│   │   ├── data/        # Dados estáticos
│   │   └── App.jsx      # Componente principal
│   └── public/          # Arquivos estáticos
└── .gitignore
```

## Autenticação

A aplicação utiliza JWT para autenticação. Ao fazer login, um token é gerado e deve ser enviado no header `Authorization` para acessar rotas protegidas.

### Credenciais Padrão
O seed automático cria um usuário admin com:
- **Email:** admin@gmail.com
- **Senha:** admin123

> ⚠️ **Importante:** Altere essas credenciais em produção!

## API Endpoints

### Autenticação
- `POST /api/auth/login` - Login do usuário
- `POST /api/auth/register` - Registro de novo usuário

### Produtos
- `GET /api/produtos` - Listar todos os produtos
- `GET /api/produtos/:id` - Obter produto por ID
- `POST /api/produtos` - Criar novo produto (admin)
- `PUT /api/produtos/:id` - Atualizar produto (admin)
- `DELETE /api/produtos/:id` - Deletar produto (admin)

### Categorias
- `GET /api/categorias` - Listar todas as categorias
- `GET /api/categorias/:id` - Obter categoria por ID
- `POST /api/categorias` - Criar nova categoria (admin)
- `PUT /api/categorias/:id` - Atualizar categoria (admin)
- `DELETE /api/categorias/:id` - Deletar categoria (admin)

## Scripts Disponíveis

### Backend
- `npm start` - Inicia o servidor em produção
- `npm run dev` - Inicia o servidor em desenvolvimento

### Frontend
- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Cria build de produção
- `npm run preview` - Preview do build de produção
- `npm run lint` - Executa o linter

## Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull requests.

Desenvolvido com ❤️ por Danixz
