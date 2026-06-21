import './ManualDeUsuario.css';
import { useState } from 'react';

interface ManualDeUsuarioProps {
  onFechar: () => void;
}

export function ManualDeUsuario({ onFechar }: ManualDeUsuarioProps) {
  const [secaoAtiva, setSecaoAtiva] = useState('inicio');

  const secoes = {
    inicio: {
      titulo: '📖 Bem-vindo ao Manual',
      conteudo: (
        <div>
          <p>Olá! Este é seu guia completo para usar o <strong>Gerenciador de Rotinas e Prazos</strong>.</p>
          <p>Se você é novo por aqui, comece clicando nos tópicos abaixo para aprender como usar cada funcionalidade.</p>
          <div style={{ marginTop: '2rem', padding: '1.5rem', backgroundColor: '#f0f4ff', borderRadius: '12px' }}>
            <strong>💡 Dica:</strong> Esta aplicação ajuda você a organizar tarefas, prazos e rotinas de forma inteligente!
          </div>
        </div>
      )
    },
    primeiros_passos: {
      titulo: '🚀 Primeiros Passos',
      conteudo: (
        <div>
          <h3>1. Login e Registro</h3>
          <p>Primeiro, você precisa fazer login ou criar uma conta. Se for seu primeiro acesso, clique em <strong>"Cadastro"</strong> e preencha seus dados.</p>
          
          <h3>2. A Página Principal</h3>
          <p>Após fazer login, você verá a página <strong>Home</strong> com um cartão de boas-vindas e um resumo do seu progresso.</p>
          
          <h3>3. A Barra Lateral (Sidebar)</h3>
          <p>À esquerda da tela, você verá ícones para navegação rápida:</p>
          <ul>
            <li><strong>🏠 Home:</strong> Voltar para a página inicial</li>
            <li><strong>📅 Calendário:</strong> Ver seus compromissos em um calendário mensal</li>
            <li><strong>📊 Tarefas:</strong> Gerenciar todas as suas tarefas</li>
            <li><strong>✨ IA:</strong> Receber sugestões inteligentes da IA</li>
            <li><strong>⚙️ Configurações:</strong> Ajustar preferências da sua conta</li>
            <li><strong>ℹ️ Informações:</strong> Abrir este manual (onde você está agora!)</li>
          </ul>
        </div>
      )
    },
    nova_tarefa: {
      titulo: '➕ Criar uma Nova Tarefa',
      conteudo: (
        <div>
          <h3>Como Adicionar uma Tarefa?</h3>
          <p>Existem 3 formas de criar uma nova tarefa:</p>
          
          <h4>Método 1: Botão "Nova Tarefa" na Home</h4>
          <p>Na página inicial, clique no botão azul <strong>"+Nova Tarefa"</strong> no cartão de boas-vindas.</p>
          
          <h4>Método 2: Botão "+ Nova Tarefa" no Gerenciador</h4>
          <p>Na seção de Tarefas, clique no botão no topo da página.</p>
          
          <h4>Método 3: Clique no Calendário</h4>
          <p>Clique em um dia no calendário mensal para criar uma tarefa naquele dia.</p>

          <h3>Preenchendo a Tarefa</h3>
          <p>Uma janela se abrirá com os seguintes campos:</p>
          <ul>
            <li><strong>Título:</strong> O nome da sua tarefa (ex: "Estudar para prova de Física")</li>
            <li><strong>Descrição:</strong> Detalhes adicionais (opcional)</li>
            <li><strong>Tipo:</strong> Escolha entre Prova, Lista de Exercício, Projeto ou Compromisso</li>
            <li><strong>Data de Vencimento:</strong> Quando é o prazo (importante para alertas!)</li>
          </ul>

          <p style={{ marginTop: '1.5rem', color: '#666' }}>Após preencher, clique em <strong>"Criar Tarefa"</strong> e ela aparecerá na sua lista!</p>
        </div>
      )
    },
    gerenciar_tarefas: {
      titulo: '📝 Gerenciar suas Tarefas',
      conteudo: (
        <div>
          <h3>Visualizar Tarefas</h3>
          <p>Acesse a seção de <strong>Tarefas</strong> pela barra lateral para ver todas as suas atividades organizadas.</p>

          <h3>Filtrar Tarefas</h3>
          <p>Há 3 filtros disponíveis no topo:</p>
          <ul>
            <li><strong>Hoje:</strong> Mostra apenas as tarefas de hoje</li>
            <li><strong>Esta Semana:</strong> Tarefas dos próximos 7 dias</li>
            <li><strong>Este Mês:</strong> Todas as tarefas do mês atual</li>
          </ul>

          <h3>Ações em cada Tarefa</h3>
          <p>Para cada tarefa, você pode:</p>
          <ul>
            <li><strong>✏️ Editar:</strong> Alterar os dados da tarefa</li>
            <li><strong>✅ Completar:</strong> Marcar como concluída (muda para verde!)</li>
            <li><strong>🗑️ Deletar:</strong> Remover a tarefa</li>
          </ul>

          <h3>Status da Tarefa</h3>
          <p>Cada tarefa tem um <strong>status de categoria</strong> (como "PENDENTE", "PROVA", etc) para você identificar rapidamente:</p>
          <ul>
            <li>Tarefas em atraso aparecem com um aviso especial</li>
            <li>Tarefas completadas são marcadas com verde</li>
          </ul>
        </div>
      )
    },
    calendario: {
      titulo: '📅 Usando o Calendário',
      conteudo: (
        <div>
          <h3>Visualização do Calendário</h3>
          <p>Clique no ícone de <strong>Calendário</strong> na barra lateral para ver uma visualização mensal das suas tarefas.</p>

          <h3>Entendendo as Cores</h3>
          <p>Os dias do calendário são coloridos para indicar o status:</p>
          <ul>
            <li><strong>Roxo/Azul:</strong> Dias com tarefas agendadas</li>
            <li><strong>Verde:</strong> Dias com tarefas completadas</li>
            <li><strong>Vermelho/Laranja:</strong> Dias com tarefas atrasadas</li>
          </ul>

          <h3>Navegando entre Meses</h3>
          <p>Use os botões de seta (< >) para ir para o mês anterior ou próximo.</p>

          <h3>Adicionando Tarefas pelo Calendário</h3>
          <p>Clique em um dia específico para criar uma nova tarefa naquele dia.</p>

          <h3>Visualizando Tarefas do Dia</h3>
          <p>Clique em um dia que tenha tarefas para ver a lista completa daquele dia.</p>
        </div>
      )
    },
    graficos: {
      titulo: '📊 Gráfico de Status',
      conteudo: (
        <div>
          <h3>O que é o Gráfico?</h3>
          <p>Na página Home, você verá um <strong>gráfico visual</strong> mostrando o resumo do seu progresso:</p>

          <h3>Categorias do Gráfico</h3>
          <ul>
            <li><strong>✅ Completas:</strong> Tarefas que você já finalizou</li>
            <li><strong>⏳ Pendentes:</strong> Tarefas ainda não iniciadas</li>
            <li><strong>⚠️ Atrasadas:</strong> Tarefas que perderam o prazo</li>
            <li><strong>❌ Sem Prazo:</strong> Tarefas que não têm data de vencimento</li>
          </ul>

          <h3>Como Usar</h3>
          <p>Use o gráfico como um <strong>termômetro da sua produtividade</strong>. Quanto mais tarefas verdes (completas), melhor!</p>
          <p>Se houver muitas tarefas vermelhas (atrasadas), tente dedicar tempo para completá-las o quanto antes.</p>
        </div>
      )
    },
    ia: {
      titulo: '✨ Sugestões da IA',
      conteudo: (
        <div>
          <h3>O Painel da IA</h3>
          <p>Clique no ícone de <strong>✨ IA</strong> na barra lateral para acessar sugestões inteligentes da Gemini AI.</p>

          <h3>O que a IA faz?</h3>
          <p>A IA analisa suas tarefas e oferece:</p>
          <ul>
            <li><strong>📋 Rotinas Inteligentes:</strong> Sugestão de ordem para fazer as tarefas</li>
            <li><strong>⏱️ Estimativa de Tempo:</strong> Quanto tempo cada tarefa pode levar</li>
            <li><strong>🎯 Priorização:</strong> Qual tarefa fazer primeiro</li>
            <li><strong>💡 Dicas de Produtividade:</strong> Conselhos personalizados</li>
          </ul>

          <h3>Como Usar</h3>
          <p>1. Acesse a seção IA</p>
          <p>2. Clique no botão para gerar sugestões</p>
          <p>3. Leia as recomendações no painel de resultado</p>
          <p>4. Se gostar, você pode criar uma tarefa diretamente a partir da sugestão</p>

          <div style={{ marginTop: '1.5rem', padding: '1rem', backgroundColor: '#fff3cd', borderRadius: '8px' }}>
            <strong>⚠️ Nota:</strong> A IA é uma auxiliadora! Tome suas próprias decisões sobre prioridades.
          </div>
        </div>
      )
    },
    dicas: {
      titulo: '💡 Dicas e Boas Práticas',
      conteudo: (
        <div>
          <h3>1. Seja Específico no Título</h3>
          <p>Em vez de "Tarefa", use "Estudar capítulos 1-3 de Cálculo" - assim você lembra do que fazer.</p>

          <h3>2. Defina Prazos Realistas</h3>
          <p>Dê-se tempo suficiente! Não agende tudo para amanhã.</p>

          <h3>3. Use a Descrição</h3>
          <p>Adicione links, referências ou notas na descrição para não esquecer detalhes importantes.</p>

          <h3>4. Revise Regularmente</h3>
          <p>Abra o app pelo menos uma vez por dia para verificar suas tarefas.</p>

          <h3>5. Marque como Completa</h3>
          <p>Quando terminar uma tarefa, clique em "Completar" para manter o registro atualizado.</p>

          <h3>6. Use a IA Para Organização</h3>
          <p>Quando tiver muitas tarefas, deixe a IA sugerir por onde começar.</p>

          <h3>7. Não Sobrecarregue</h3>
          <p>Tenha no máximo 5-7 tarefas ativas por semana. Qualidade sobre quantidade!</p>

          <h3>8. Organize por Tipo</h3>
          <p>Usar diferentes tipos (Prova, Projeto, etc) ajuda a visualizar melhor suas responsabilidades.</p>
        </div>
      )
    },
    faq: {
      titulo: '❓ Perguntas Frequentes',
      conteudo: (
        <div>
          <h4>Posso compartilhar tarefas com outras pessoas?</h4>
          <p>Atualmente, não. Cada usuário tem suas próprias tarefas privadas.</p>

          <h4>Minha tarefa desapareceu! O que fazer?</h4>
          <p>Verifique se o filtro está mostrando a tarefa. Se deletou acidentalmente, lamento - não há recuperação no momento.</p>

          <h4>Posso mudar a data de uma tarefa?</h4>
          <p>Sim! Clique em "Editar" na tarefa e altere a data de vencimento.</p>

          <h4>A IA sempre está correta?</h4>
          <p>Não. Use as sugestões como um guia, mas confie no seu julgamento.</p>

          <h4>Como faço backup dos meus dados?</h4>
          <p>Seus dados são salvos automaticamente no servidor. Não se preocupe em perder!</p>

          <h4>Posso usar no celular?</h4>
          <p>Sim! O site é responsivo e funciona bem em dispositivos móveis.</p>

          <h4>Esqueci minha senha. E agora?</h4>
          <p>Clique em "Esqueceu a senha?" na tela de login e siga as instruções.</p>

          <h4>Como saio da minha conta?</h4>
          <p>Procure pela opção de logout nas configurações (ícone de engrenagem).</p>
        </div>
      )
    }
  };

  type SecaoKey = keyof typeof secoes;

  return (
    <div className="manual-overlay" onClick={onFechar}>
      <div className="manual-modal" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="manual-header">
          <h1>📖 Manual do Usuário</h1>
          <button className="btn-fechar" onClick={onFechar}>✕</button>
        </div>

        {/* Conteúdo Principal */}
        <div className="manual-container">
          {/* Sidebar de Navegação */}
          <nav className="manual-nav">
            <button 
              className={`nav-item ${secaoAtiva === 'inicio' ? 'active' : ''}`}
              onClick={() => setSecaoAtiva('inicio')}
            >
              📖 Início
            </button>
            <button 
              className={`nav-item ${secaoAtiva === 'primeiros_passos' ? 'active' : ''}`}
              onClick={() => setSecaoAtiva('primeiros_passos')}
            >
              🚀 Primeiros Passos
            </button>
            <button 
              className={`nav-item ${secaoAtiva === 'nova_tarefa' ? 'active' : ''}`}
              onClick={() => setSecaoAtiva('nova_tarefa')}
            >
              ➕ Criar Tarefa
            </button>
            <button 
              className={`nav-item ${secaoAtiva === 'gerenciar_tarefas' ? 'active' : ''}`}
              onClick={() => setSecaoAtiva('gerenciar_tarefas')}
            >
              📝 Gerenciar Tarefas
            </button>
            <button 
              className={`nav-item ${secaoAtiva === 'calendario' ? 'active' : ''}`}
              onClick={() => setSecaoAtiva('calendario')}
            >
              📅 Calendário
            </button>
            <button 
              className={`nav-item ${secaoAtiva === 'graficos' ? 'active' : ''}`}
              onClick={() => setSecaoAtiva('graficos')}
            >
              📊 Gráfico de Status
            </button>
            <button 
              className={`nav-item ${secaoAtiva === 'ia' ? 'active' : ''}`}
              onClick={() => setSecaoAtiva('ia')}
            >
              ✨ Sugestões da IA
            </button>
            <button 
              className={`nav-item ${secaoAtiva === 'dicas' ? 'active' : ''}`}
              onClick={() => setSecaoAtiva('dicas')}
            >
              💡 Dicas Práticas
            </button>
            <button 
              className={`nav-item ${secaoAtiva === 'faq' ? 'active' : ''}`}
              onClick={() => setSecaoAtiva('faq')}
            >
              ❓ Perguntas Frequentes
            </button>
          </nav>

          {/* Conteúdo */}
          <div className="manual-conteudo">
            <h2>{(secoes[secaoAtiva as SecaoKey])?.titulo}</h2>
            <div className="manual-texto">
              {(secoes[secaoAtiva as SecaoKey])?.conteudo}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="manual-footer">
          <p>Tem dúvidas? Entre em contato com o suporte ou consulte este manual novamente!</p>
          <button className="btn-close-footer" onClick={onFechar}>Fechar Manual</button>
        </div>
      </div>
    </div>
  );
}
