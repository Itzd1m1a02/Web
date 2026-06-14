# 🍪 Projeto WEB - Sistema de Rotinas Inteligentes

Uma aplicação web completa e moderna para gerenciamento de tarefas, compromissos e rotinas de estudos, contando com calendários interativos e sugestões automáticas baseadas em **Inteligência Artificial (Google Gemini)**.

---

## 🚀 Funcionalidades Principais

- **Gestão de Tarefas (CRUD Completo):** Crie, edite, complete e exclua tarefas (Provas, Listas de Exercícios, Projetos e Compromissos).
- **Calendário Mensal e Semanal:** Visualize os seus afazeres distribuídos de forma orgânica em calendários dinâmicos.
- **Sugestões com IA:** Um painel integrado à API do Google Gemini que gera tarefas altamente desafiadoras para a sua rotina com apenas um clique.
- **Autenticação Segura:** Login e Cadastro com criptografia de senhas (`bcrypt`) e tokens de acesso (`JWT`).
- **Isolamento de Dados:** Cada usuário só enxerga e gerencia as tarefas criadas por ele mesmo no Banco de Dados.
- **Administrador "Bypass":** Conta administrativa fixa imune a limpezas de banco de dados.

---

## 💻 Tecnologias Utilizadas

### Frontend
- **React** (com TypeScript e Vite)
- **React Router DOM** (Navegação de Páginas)
- **CSS 3** (Responsividade, Animações e Glassmorphism)

### Backend
- **Python** (FastAPI)
- **SQLite** (Banco de Dados embutido usando SQLAlchemy)
- **Pydantic** (Validação rigorosa de dados)
- **Passlib & Python-JOSE** (Segurança)
- **Google Generative AI** (Integração com Gemini 1.5 Flash)

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
cd Backend
pip install -r requirements.txt
python main.py
```

**Frontend:**
```bash
cd Frontend
npm install
npm run dev
```