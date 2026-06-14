# 📚 Projeto WEB - Sistema de Rotinas Inteligentes

O **Projeto WEB** é uma aplicação web completa e moderna focada em auxiliar na **gestão de tempo e organização de prazos** de estudos e atividades. Evitando perda de dados e garantindo uma experiência personalizada e segura, ele conta com calendários interativos e sugestões automáticas baseadas em **Inteligência Artificial (Google Gemini)**.

---

## 🏗️ Arquitetura do Projeto

### **Backend** (FastAPI + Python)
- **Framework:** FastAPI com Uvicorn
- **Banco de Dados:** SQLite (embutido usando SQLAlchemy ORM)
- **Autenticação:** JWT com passlib/bcrypt
- **IA Integrada:** Google GenAI (Gemini API 1.5 Flash)
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
- ✅ **Autenticação e Autorização Segura**
  - Sistema de registro (cadastro) de usuários.
  - Login com geração de tokens JWT e criptografia de senhas com bcrypt.
- ✅ **Gerenciamento de Tarefas (CRUD Completo)**
  - Criação, leitura, edição e exclusão de tarefas (Provas, Listas, Projetos e Compromissos).
  - Modelos de dados estruturados e validados com Pydantic.
- ✅ **Isolamento de Dados por Usuário**
  - Cada usuário só enxerga e gerencia as tarefas criadas por ele mesmo no Banco de Dados.
  - Rotas backend (`GET /api/Tarefas`, `POST /api/NovaTarefa`) implementadas para associar dados ao usuário logado via JWT.
- ✅ **Integração IA (Painel Inteligente)**
  - Painel integrado à API do Google Gemini que gera tarefas para a rotina.
- ✅ **Administrador "Bypass"**
  - Conta administrativa fixa imune a limpezas de banco de dados.

### Frontend
- ✅ **Páginas Principais**
  - Login com autenticação, Cadastro de novos usuários e Recuperação de senha.
  - Página inicial (Home) com Gráfico de status e contagem dinâmica de tarefas.
- ✅ **Calendário Mensal e Semanal**
  - Consome a API e exibe os afazeres distribuídos de forma orgânica e **apenas referentes ao usuário autenticado**.
- ✅ **Componentes e Responsividade**
  - Navbar com navegação fluida.
  - CSS global e específico por página com estrutura pronta para responsividade em dispositivos móveis.

---

## 🚧 Funcionalidades a Implementar (Próximos Passos)

- [ ] **Integração Completa com Gemini API:** Gerar rotinas inteligentes com base em preferências do usuário e análise de produtividade.
- [ ] **Gráficos e Estatísticas Avançadas:** Gráficos de carga de trabalho e análise temporal de progresso (Chart.js ou similar).
- [ ] **UX para Verificação de Prazos:** Alertas visuais para tarefas vencidas, indicadores de urgência e notificações.
- [ ] **Testes Automatizados:** Testes unitários para modelos e E2E para fluxos críticos.

---

## 📁 Estrutura de Diretórios (Módulos)

```text
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
│   ├── Frontend/
│   │   ├── src/
│   │   │   ├── pages/           # Páginas (Login, Home, etc)
│   │   │   ├── components/      # Componentes reutilizáveis
│   │   │   ├── css/             # Estilos globais e por página
│   │   │   ├── App.tsx          # Componente raiz
│   │   │   └── main.tsx         # Entrada da aplicação
│   │   ├── public/              # Arquivos estáticos
│   │   ├── package.json         # Dependências Node
│   │   └── vite.config.ts       # Configuração do Vite
│   │
│   └── Iniciar.bat              # Script de inicialização automática
└── README.md                    # Documentação principal
```

---

## ⚙️ Como Executar o Projeto

### 1. Configurar a Chave da IA
Antes de rodar o projeto, crie um arquivo `.env` dentro da pasta `Backend/` e adicione a sua chave de API do Google Gemini:
```env
GEMINI_API_KEY=sua_chave_secreta_aqui
```

### 2. Rodar automaticamente (Windows)
Se você estiver no Windows, basta dar um duplo clique no script na raiz do projeto:
```bash
Iniciar.bat
```
Este script vai automaticamente instalar as dependências do Python, as dependências do Node (React) e abrir os dois servidores em janelas separadas.

### 3. Rodar manualmente (Outros sistemas)

**Backend:**
```bash
cd Server/Backend
pip install -r requirements.txt
python main.py
```

**Frontend:**
```bash
cd Frontend
npm install
npm run dev
```