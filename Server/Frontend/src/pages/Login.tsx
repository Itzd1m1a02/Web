import { useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../css/Login.css'; // Importando o seu estilo
import { saveAuthData, hashPassword } from '../utils/auth';
import { apiFetch } from '../utils/api';

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

        const senhaHash = await hashPassword(senha);
        const loginUsuario: LoginDados = { usuario, email, senha: senhaHash };
        
        try {
            console.log('Enviando login para:', loginUsuario);
            const response = await apiFetch('/Login', {
                method: 'POST',
                body: JSON.stringify(loginUsuario)
            });

            console.log('Status da resposta:', response.status, response.ok);
            const resposta_API = await response.json();
            console.log('Body da resposta:', resposta_API);

            if (response.ok) {
                console.log('Login bem-sucedido! Redirecionando...');
                saveAuthData(resposta_API.usuario);
                navigate('/pagina/Home');
            } else {
                console.error('Erro de login:', resposta_API.detail);
                alert(resposta_API.detail || "Erro ao fazer login");
            }
        } catch (error) {
            console.error('Erro de conexão: ', error);
            alert("Erro ao ligar ao servidor");
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