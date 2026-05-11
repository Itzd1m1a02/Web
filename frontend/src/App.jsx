import { useState } from "react";
import "./App.css";
import { disciplinas, atividades } from "./data/dados";

function DisciplinaCard({ disciplina }) {
  return (
    <div className="card">
      <h2>{disciplina.nome}</h2>

      <p>
        <strong>Professor:</strong> {disciplina.professor}
      </p>

      <p>
        <strong>Período:</strong> {disciplina.periodo}
      </p>
    </div>
  );
}

function AtividadeList({ atividades, disciplinas }) {
  return (
    <table className="tabela">
      <thead>
        <tr>
          <th>Atividade</th>
          <th>Status</th>
          <th>Disciplina</th>
        </tr>
      </thead>

      <tbody>
        {atividades.map((atividade) => {
          const disciplina = disciplinas.find(
            (d) => d.id === atividade.disciplinaId
          );

          return (
            <tr key={atividade.id}>
              <td>{atividade.titulo}</td>
              <td>{atividade.status}</td>
              <td>{disciplina?.nome}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

function FormularioAtividade() {
  const [titulo, setTitulo] = useState("");
  const [status, setStatus] = useState("Pendente");
  const [mensagem, setMensagem] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    setMensagem("Atividade cadastrada com sucesso!");

    setTitulo("");
    setStatus("Pendente");
  }

  return (
    <div className="formulario">
      <h2>Nova Atividade</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Digite o título"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          required
        />

        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option>Pendente</option>
          <option>Em andamento</option>
          <option>Concluída</option>
        </select>

        <button type="submit">Salvar</button>
      </form>

      {mensagem && <p className="sucesso">{mensagem}</p>}
    </div>
  );
}

export default function App() {
  const [filtro, setFiltro] = useState("Todos");

  const atividadesFiltradas =
    filtro === "Todos"
      ? atividades
      : atividades.filter((a) => a.status === filtro);

  return (
    <div className="container">
      <h1 className="titulo">Organizador De Tarefas</h1>

      <div className="grid-disciplinas">
        {disciplinas.map((disciplina) => (
          <DisciplinaCard key={disciplina.id} disciplina={disciplina} />
        ))}
      </div>

      <div className="filtro">
        <label>Filtrar atividades:</label>

        <select value={filtro} onChange={(e) => setFiltro(e.target.value)}>
          <option>Todos</option>
          <option>Pendente</option>
          <option>Em andamento</option>
          <option>Concluída</option>
        </select>
      </div>

      <AtividadeList
        atividades={atividadesFiltradas}
        disciplinas={disciplinas}
      />

      <FormularioAtividade />
    </div>
  );
}
