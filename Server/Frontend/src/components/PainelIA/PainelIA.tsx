import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import './PainelIA.css'; // Crie este arquivo para os estilos abaixo, se desejar
import { getAccessToken } from '../../utils/auth';
import { apiFetch } from '../../utils/api';

interface PainelIAProps {
  onTarefaAdicionada?: () => void;
}

export function PainelIA({ onTarefaAdicionada }: PainelIAProps) {
  const [direcionamento, setDirecionamento] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [erro, setErro] = useState<string>('');

  const resetPrompt = () => {
    setDirecionamento('');
    setErro('');
    setLoading(false);
  };

  const pedirDirecionamento = async () => {
    setLoading(true);
    setErro('');
    setDirecionamento(''); // Limpa o anterior enquanto carrega o novo

    try {
      const token = getAccessToken(); 
      if (!token) {
        throw new Error('Usuário não autenticado. Faça login novamente.');
      }
      
      // O apiFetch já configura a base URL e insere o header Authorization automaticamente
      const response = await apiFetch('/IA/Direcionamento', {
        method: 'GET'
      });

      if (!response.ok) {
        throw new Error('Falha ao obter resposta da IA.');
      }

      const data = await response.json();
      setDirecionamento(data.direcionamento);

      // Atualiza apenas se a IA retornou um resultado válido
      if (onTarefaAdicionada && data.direcionamento) {
        onTarefaAdicionada();
      }
    } catch (err: any) {
      setErro('Erro ao consultar a IA. Verifique sua conexão ou a chave da API.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="painel-ia-container">
      <div className="ia-header">
        <h2>✨ Assistente de Produtividade</h2>
        <p>A IA analisa suas tarefas pendentes e te diz o que priorizar.</p>
      </div>

      <div className="ia-actions">
        <button 
          className="btn-ia" 
          onClick={pedirDirecionamento} 
          disabled={loading}
        >
          {loading ? 'Analisando suas tarefas...' : 'O que devo fazer primeiro?'}
        </button>
        <button
          className="btn-reset"
          type="button"
          onClick={resetPrompt}
          disabled={loading}
        >
          Limpar resultado
        </button>
      </div>

      {erro && <p className="ia-erro">{erro}</p>}

      {direcionamento && (
        <div className="ia-resultado">
          {/* O ReactMarkdown vai converter os ** asteriscos ** em negrito e - em listas! */}
          <ReactMarkdown>{direcionamento}</ReactMarkdown>
        </div>
      )}
    </div>
  );
}
