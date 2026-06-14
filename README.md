# 📚 Projeto WEB - Gerenciador de Rotinas e Prazos

## 🎯 Propósito do Projeto

O **Projeto WEB** é uma aplicação web desenvolvida para auxiliar na **gestão de tempo e organização de prazos** de estudos e atividades. Atualmente, é focado em estudantes, mas foi arquitetado para escalar e atender qualquer tipo de usuário em contextos pessoais e profissionais.

A aplicação permite que usuários criem, organizem e gerenciem suas rotinas diárias, evitando perda de dados e garantindo uma experiência personalizada e segura.

---

## 🏗️ Arquitetura do Projeto

### **Backend** (FastAPI + Python)
- **Framework:** FastAPI com Uvicorn
- **Banco de Dados:** SQLAlchemy ORM
- **Autenticação:** JWT com passlib/bcrypt
- **IA Integrada:** Google GenAI (Gemini API)
- **Estrutura:** Modular com rotas, modelos, schemas e repositórios

### **Frontend** (React + TypeScript)
- **Framework:** React 19 com TypeScript
- **Build:** Vite
- **Roteamento:** React Router v7
- **Estilo:** CSS modularizado
- **Linting:** ESLint com suporte a React

---

## ✅ Funcionalidades Implementadas

### Backend
- ✅ **Autenticação e Autorização**
  - Sistema de registro (cadastro) de usuários
  - Login com geração de tokens JWT
  
- ✅ **Gerenciamento de Tarefas**
  - Criação de novas tarefas
  - Leitura de tarefas do usuário autenticado
  - Rota backend `POST /api/NovaTarefa`
  - Rota backend `GET /api/Tarefas` retorna apenas as tarefas do usuário logado
  - Modelos de dados estruturados com Pydantic
  
- ✅ **Segurança**
  - Senha criptografada com bcrypt
  - Middlewares de logging
  - Validação de entrada com schemas
  
- ✅ **Integração IA (Parcial)**
  - Dependência do Google GenAI presente
  - Base para integração futura

### Frontend
- ✅ **Páginas Principais**
  - Login com autenticação
  - Cadastro de novos usuários
  - Recuperação de senha
  - Página inicial (Home)
  - Nova tarefa
  
- ✅ **Componentes**
  - Navbar com navegação
  - Página para criar novas tarefas
  - Gráfico de status com contagem dinâmica de tarefas
  
- ✅ **Responsividade**
  - CSS global e específico por página
  - Estrutura pronta para responsividade

---

## 🚧 Funcionalidades a Implementar

### 🔒 Segurança e Dados
- [x] **Isolamento de Dados por Usuário**
  - Garantir que dados de rotinas sejam salvos apenas para o usuário autenticado
  - Validação de propriedade em todas as operações de leitura/escrita
  - Implementar soft delete para auditoria
- [x] **Rota `GET /api/Tarefas`** implementada para retornar somente tarefas associadas ao usuário logado via JWT
  
### 🤖 Inteligência Artificial
- [ ] **Integração Completa com Gemini API**
  - Gerar rotinas inteligentes com base em preferências do usuário
  - Sugestões automáticas de otimização de tempo
  - Análise de produtividade e recomendações
  
### 📅 Interface e Visualização
- [ ] **Calendário Interativo**
  - Visualização de tarefas por data
  - Navegação entre meses
  - Marcação de prazos importantes
- [x] **Calendário Mensal** agora consome `GET /api/Tarefas` e exibe apenas as tarefas do usuário autenticado
  
- [ ] **Gráficos e Estatísticas**
  - Gráficos de produtividade
  - Visualização de conclusão de tarefas
  - Análise temporal de progresso
  - Gráficos de carga de trabalho
  
- [ ] **UX para Verificação de Prazos**
  - Alertas visuais para tarefas vencidas
  - Indicadores de urgência
  - Timeline de tarefas próximas
  - Notificações de prazos próximos
  
### 🎨 Padrão e Qualidade de Código
- [x] **Adição de id de Usuario para salvas tarefas referentes a ele**
   
- [ ] **Padronização de Funções**
  - Refatorar rotas para padrão consistente
  - Unificar tratamento de erros
  - Criar utilitários reutilizáveis
  - Padronizar nomeação de variáveis e funções
  - Implementar validações genéricas
  
- [ ] **Testes Automatizados**
  - Testes unitários para modelos
  - Testes de integração para rotas
  - Testes E2E para fluxos críticos
  
- [ ] **Documentação**
  - Comentários no código
  - Documentação de APIs (Swagger/OpenAPI)
  - Guia de contribuição

---

## 🚀 Como Executar

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

### Inicalizador
```powershell
cd Server
iniciar.bat
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
  
1. **Calendário (ALTA PRIORIDADE)**
   - Implementar visualização de tarefas em calendário
   
2. **IA Gemini (MÉDIA PRIORIDADE)**
   - Completar integração para geração de rotinas
   
3. **Gráficos (MÉDIA PRIORIDADE)**
   - Adicionar biblioteca de gráficos (Chart.js ou similar)
   
4. **Padrão de Código (CONTÍNUO)**
   - Refatorar durante o desenvolvimento das outras features

---

## 👥 Contribuindo

Este é um projeto em desenvolvimento. Ao contribuir, favor manter a estrutura modular e seguir as convenções de código estabelecidas.

---

## 📄 Licença

MIT License

---

**Última atualização:** 1 de junho de 2026

