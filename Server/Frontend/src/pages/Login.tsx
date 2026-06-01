import { useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../css/Login.css'; // Importando o seu estilo
import { saveAuthData } from '../utils/auth';

// Molde de dados do TypeScript para o envio
interface LoginDados {
    usuario?: string;
    email?: string;
    senha?: string;
}

export function Login() {
    // Variáveis de estado para guardar o que o usuário digita
    const [usuario, setUsuario] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    
    const navigate = useNavigate();

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();

        const loginUsuario: LoginDados = { usuario, email, senha };
        
        // tentativa de verificacao 
        try {
            const response = await fetch('http://127.0.0.1:8000/api/Login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(loginUsuario)
            });

            const resposta_API = await response.json();

            // caso a resposta do BACK seja OK
            if (response.ok) {
                // guarde o token de acesso e usuário no navegador
                saveAuthData(resposta_API.access_token, resposta_API.usuario ?? email);
                alert("Login OK! Redirecionando...");
                navigate("/pagina/Home"); // Navegação instantânea do React
            } else {
                alert("Erro: " + (resposta_API.mensagem || resposta_API.detail || 'Falha no login'));
            }
        } catch (error) {
            console.error('Erro de conexão: ', error);
            alert("Erro ao conectar com o servidor");
        }
    };

    return (
        <div className="login-container">
            <h2>Bem-vindo!</h2>
            
            <form id="form-login" onSubmit={handleSubmit}>
                <div className="input-group">
                    <label htmlFor="username">Nome de usuário</label>
                    <input type="text" id="username" placeholder="Joãozinho" value={usuario} onChange={(e) => setUsuario(e.target.value)} required />
                </div>

                <div className="input-group">
                    <label htmlFor="email">E-mail</label>
                    <input type="email" id="email" placeholder="Joãozinho@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                
                <div className="input-group">
                    <label htmlFor="password">Senha</label>
                    <input type="password" id="password" placeholder="********" value={senha} onChange={(e) => setSenha(e.target.value)} required />
                </div>

                <button type="submit">Entrar</button>

                <div className="options">
                    <Link to="/pagina/EsqueceuSenha">Esqueceu a senha?</Link>
                    <Link to="/pagina/Cadastro">Criar conta</Link>
                </div>
            </form>
        </div>
    );
}