import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link } from 'react-router-dom';
import '../css/EsqueceuSenha.css';

export function EsqueceuSenha() {
    const [email, setEmail] = useState('');

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        
        if (email === "teste@teste.com") {
            alert("Código de recuperação enviado!");
        } else {
            alert("Erro: E-mail não encontrado");
        }
    };

    return (
        <div className="signup-container">
            <h2>Recuperar Senha</h2>
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label htmlFor="email">Email para recuperação</label>
                    <input type="email" id="email" placeholder="Digite seu email para recebimento do código" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>

                <button type="submit" className="btn-register">Pedir Código de Recuperação</button>
                
                <Link to="/pagina/Login" className="back-link">Lembrou sua senha? Faça login</Link>
            </form>
        </div>
    );
}