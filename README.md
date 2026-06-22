# 📚 Projeto WEB - Gerenciador de Rotinas e Prazos

## 🎯 Propósito do Projeto

O **Projeto WEB** é uma aplicação web desenvolvida para auxiliar na **gestão de tempo e organização de prazos** de estudos e atividades. Atualmente, é focado em estudantes, mas foi arquitetado para escalar e atender qualquer tipo de usuário em contextos pessoais e profissionais.

A aplicação permite que usuários criem, organizem e gerenciem suas rotinas diárias, evitando perda de dados e garantindo uma experiência personalizada e segura.

[Slides](https://canva.link/ftfkr4nfpnnb92l)

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
  - Recomendações semanais com prioridades de tarefas e plano de execução
  - Janela de resultado refinada com scroll e botão para limpar resultado

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
  - Manual do usuário (pode ser baixado no botão Info)
  
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

## 🚀 Como Executar Localmente

### Configurar a Chave da IA
Antes de rodar o projeto, crie um arquivo `.env` dentro da pasta `Server/Backend/` com o seguinte conteúdo (instruções no próprio arquivo):
```env
# ===================================
# Configuração de Ambiente do Backend
# ===================================

# Gere uma chave forte com: python -c "import secrets; print(secrets.token_urlsafe(32))"
# Recomendado não conter aspas ( " ), aspas simples( ' ), parêntesis( () ), colchetes ( [] ), chaves ( {} ) ou dois pontos ( : ).
SECRET_KEY=sua_chave_secreta_aqui

# Chave da API do Google Gemini (obrigatório para a IA funcionar)
# Obtenha em: https://aistudio.google.com/api-keys
GEMINI_API_KEY=sua_chave_de_api_aqui

# Ambiente (development ou production)
# Em desenvolvimento: development (cookies com secure=False, samesite=lax)
ENV=development

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

3. **Agente de IA interno (MÉDIA PRIORIDADE)**
   - Implementar uma página interativa de agente de IA que consegue criar, modificar e deletar tarefas, criar subtarefas e aconselhar, baseado no prompt e nas necessidades do usuário.

4. **Documentação (CONTÍNUO)**
   - Melhorar guia de contribuição e Swagger/OpenAPI

---

## 👥 Contribuindo

Este é um projeto em desenvolvimento. Ao contribuir, favor manter a estrutura modular e seguir as convenções de código estabelecidas.

---

## 📄 Licença

MIT License

---

**Última atualização:** 21 de junho de 2026

---

## 📝 Changelog

### [21/06/2026] - Ajustes de CSS para Rolagem
**Correções e Melhorias:**
- ✅ Ajustado componente `GerenciadorTarefas` para suportar rolagem vertical quando há muitas tarefas
- ✅ Reduzido padding do container de 2rem para 1.5rem
- ✅ Reduzido padding dos cards de tarefa de 1.8rem para 1.4rem
- ✅ Reduzido margin-bottom do header de 2rem para 1.2rem
- ✅ Adicionado `height: calc(100vh - 4rem)` ao container principal
- ✅ Implementado `overflow-y: auto` na lista de tarefas com scrollbar estilizada
- ✅ Adicionado `flex-shrink: 0` para evitar compressão de header e filtros
- ✅ Estilizada scrollbar com webkit para melhor UX
- **Resultado:** Layout responsivo que não quebra ao adicionar múltiplas tarefas

---

## 🚀 Deploy & Segurança (IMPORTANTE)

- Variáveis de ambiente recomendadas em produção:
  - `ENV=production`
  - `SECRET_KEY=<uma_chave_forte_e_secreta>`
  - `GEMINI_API_KEY=<sua_chave>`

- Cookies de autenticação:
  - Em produção o backend define `Secure=True` e `SameSite=None` para o cookie `access_token` quando `ENV=production`.
  - Isso só funciona com HTTPS; configure um reverse-proxy (NGINX, Caddy) ou TLS direto no servidor.

- Se você for usar domínios diferentes para frontend e backend, garanta que o cookie tenha `SameSite=None` e que o front-end faça requisições com `credentials: 'include'`.

- Exemplo de configuração de produção (NGINX + Uvicorn):

```nginx
server {
  listen 443 ssl;
  server_name seu_dominio.com;

  ssl_certificate /path/to/fullchain.pem;
  ssl_certificate_key /path/to/privkey.pem;

  location / {
    proxy_pass http://127.0.0.1:8000;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
  }
}
```

Resumo: defina `ENV=production`, use HTTPS e deixe o backend definir cookies `HttpOnly` com `Secure` ativo para máxima segurança.
