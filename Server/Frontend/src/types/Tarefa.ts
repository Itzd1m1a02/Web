/**
 * Tipos e interfaces centralizadas para Tarefas
 * Todos os componentes devem usar essas definições para manter consistência
 */

export type TarefaStatus = 'pendente' | 'atrasada' | 'concluido';
export type TarefaTipo = 'Prova' | 'Lista de Exercício' | 'Projeto' | 'Compromisso' | 'Outro';

export interface Tarefa {
  id: number;
  nome: string;
  tipo: TarefaTipo;
  datalimite: string;
  observacoes?: string;
  status: TarefaStatus;
  user_id?: number;
}

/**
 * Função utilitária para determinar o status automático de uma tarefa
 * baseado na data limite e status atual
 */
export function determinarStatusAutomatico(
  tarefa: Tarefa,
  dataAtual: Date = new Date()
): TarefaStatus {
  // Se já está concluída, mantém como concluída
  if (tarefa.status === 'concluido') {
    return 'concluido';
  }

  // Se não tem data limite, é pendente
  if (!tarefa.datalimite) {
    return 'pendente';
  }

  // Compara data limite com data atual
  const prazo = new Date(tarefa.datalimite + 'T00:00:00');
  dataAtual.setHours(0, 0, 0, 0);

  if (prazo < dataAtual) {
    return 'atrasada';
  }

  return 'pendente';
}

/**
 * Função para contar tarefas por status
 */
export function contarTarefasPorStatus(tarefas: Tarefa[]) {
  return {
    concluidas: tarefas.filter((t) => t.status === 'concluido').length,
    pendentes: tarefas.filter((t) => t.status === 'pendente').length,
    atrasadas: tarefas.filter((t) => t.status === 'atrasada').length,
    semPrazo: tarefas.filter((t) => !t.datalimite).length,
  };
}
