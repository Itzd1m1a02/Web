# 📚 Projeto WEB - Gerenciador de Rotinas e Prazos

## 🎯 Propósito do Projeto

O **Projeto WEB** é uma aplicação web desenvolvida para auxiliar na **gestão de tempo e organização de prazos** de estudos e atividades. Atualmente, é focado em estudantes, mas foi arquitetado para escalar e atender qualquer tipo de usuário em contextos pessoais e profissionais.

A aplicação permite que usuários criem, organizem e gerenciem suas rotinas diárias, evitando perda de dados e garantindo uma experiência personalizada e segura.

---

## 🏗️ Arquitetura do Projeto

### **Backend** (FastAPI + Python)
- **Framework:** FastAPI com Uvicorn
- **Banco de Dados:** SQLite (embutido usando SQLAlchemy ORM)
- **Autenticação:** JWT com passlib/bcrypt
- **IA Integrada:** Google GenAI (Gemini API)
- **Estrutura:** Modular com rotas, modelos, schemas e repositórios

### **Frontend** (React + TypeScript)
- **Framework:** React 19 com TypeScript
- **Build:** Vite
- **Roteamento:** React Router v7
- **Estilo:** CSS 3 (Responsividade, Animações e Glassmorphism)
- **Linting:** ESLint com suporte a React

---

## ✅ Funcionalidades Implementadas

### Backend
- ✅ **Autenticação e Autorização**
  - Sistema de registro (cadastro) de usuários
  - Login com geração de tokens JWT
  - Administrador "Bypass": Conta fixa imune a limpezas de banco de dados
  
- ✅ **Gerenciamento de Tarefas (CRUD Completo)**
  - Criação, leitura, edição e exclusão de tarefas (Provas, Listas, Projetos e Compromissos)
  - Rota backend `POST /api/NovaTarefa`
  - Rota backend `GET /api/Tarefas` implementada para retornar somente tarefas associadas ao usuário logado via JWT (Isolamento de Dados)
  - Modelos de dados estruturados e validados com Pydantic
  
- ✅ **Segurança**
  - Senha criptografada com bcrypt
  - Middlewares de logging
  - Validação de entrada com schemas
  
- ✅ **Integração IA Completa**
  - Painel integrado à API do Google Gemini
  - Gerar rotinas inteligentes com base em preferências do usuário
  - Sugestões automáticas de otimização de tempo

- ✅ **Qualidade de Código e Testes**
  - Rotas padronizadas com tratamento de erros unificado
  - Testes unitários para modelos e E2E implementados

### Frontend
- ✅ **Páginas Principais**
  - Login com autenticação
  - Cadastro de novos usuários
  - Recuperação de senha
  - Página inicial (Home)
  - Nova tarefa
  
- ✅ **Componentes**
  - Navbar com navegação
  - Gráfico de status com contagem dinâmica de tarefas
  
- ✅ **Calendário Mensal e Semanal**
  - Consome a API e exibe os afazeres distribuídos de forma orgânica e apenas referentes ao usuário autenticado
  
- ✅ **UX para Verificação de Prazos**
  - Alertas visuais para tarefas vencidas
  - Indicadores de urgência
  - Timeline de tarefas próximas
  - Notificações de prazos próximos

- ✅ **Responsividade**
  - CSS global e específico por página
  - Estrutura pronta para responsividade

---

## 🚧 Funcionalidades a Implementar

### 🔒 Segurança e Dados
- [ ] **Auditoria de Dados**
  - Implementar soft delete para lixeira de tarefas
  
### 📅 Interface e Visualização
- [ ] **Gráficos e Estatísticas**
  - Gráficos de produtividade
  - Visualização de conclusão de tarefas
  - Análise temporal de progresso
  - Gráficos de carga de trabalho
  
### 🎨 Padrão e Qualidade de Código
- [ ] **Documentação**
  - Comentários no código
  - Documentação de APIs (Swagger/OpenAPI)
  - Guia de contribuição

---

## 🚀 Como Executar

### Configurar a Chave da IA
Antes de rodar o projeto, crie um arquivo `.env` dentro da pasta `Server/Backend/` e adicione a sua chave de API do Google Gemini:
```env
GEMINI_API_KEY=sua_chave_secreta_aqui
```

### Pré-requisitos
- Python 3.8+
- Node.js 16+
- npm ou yarn

### Backend
```bash
cd Server/Backend
pip install -r requirements.txt
python main.py
```
O servidor rodará em `http://localhost:8000`

### Frontend
```bash
cd Server/Frontend
npm install
npm run dev
```
A aplicação rodará em `http://localhost:5173`

### Inicializador
```powershell
cd Server
Iniciar.bat
```
A aplicação rodará os dois comandos acima e instalará bibliotecas importantes para o uso da aplicação
###
---

## 📁 Estrutura de Diretórios

```
Projeto WEB/
├── Server/
│   ├── Backend/
│   │   ├── app/
│   │   │   ├── models/          # Modelos de dados (User, Tarefa)
│   │   │   ├── schemas/         # Schemas Pydantic (validação)
│   │   │   ├── routes/          # Rotas da API (auth, tarefas)
│   │   │   ├── repositories/    # Acesso ao banco de dados
│   │   │   ├── security.py      # Autenticação e JWT
│   │   │   ├── database.py      # Configuração do BD
│   │   │   └── middlewares/     # Middlewares (logging)
│   │   ├── main.py              # Entrada principal
│   │   └── requirements.txt     # Dependências Python
│   │
│   └── Frontend/
│       ├── src/
│       │   ├── pages/           # Páginas (Login, Home, etc)
│       │   ├── components/      # Componentes reutilizáveis
│       │   ├── css/             # Estilos globais e por página
│       │   ├── App.tsx          # Componente raiz
│       │   └── main.tsx         # Entrada da aplicação
│       ├── public/              # Arquivos estáticos
│       ├── package.json         # Dependências Node
│       └── vite.config.ts       # Configuração do Vite
│
└── README.md                    # Este arquivo
```

---

## 🔧 Tecnologias

### Backend
- **FastAPI** - Framework web assíncrono
- **SQLAlchemy** - ORM para banco de dados
- **Pydantic** - Validação de dados
- **python-jose** - JWT
- **passlib/bcrypt** - Criptografia de senhas
- **Google GenAI** - API de IA (Gemini)
- **python-dotenv** - Variáveis de ambiente

### Frontend
- **React 19** - Biblioteca UI
- **TypeScript** - Tipagem estática
- **Vite** - Build tool
- **React Router v7** - Roteamento
- **ESLint** - Linting

---

## 📋 Próximos Passos Prioritários
  
1. **Gráficos (ALTA PRIORIDADE)**
   - Adicionar biblioteca de gráficos (Chart.js ou similar)
   
2. **Auditoria de Dados (MÉDIA PRIORIDADE)**
   - Implementar a lixeira de tarefas (soft delete)

3. **Documentação (CONTÍNUO)**
   - Melhorar guia de contribuição e Swagger/OpenAPI

---

## 👥 Contribuindo

Este é um projeto em desenvolvimento. Ao contribuir, favor manter a estrutura modular e seguir as convenções de código estabelecidas.

---

## 📄 Licença

MIT License

---

**Última atualização:** 14 de junho de 2026
