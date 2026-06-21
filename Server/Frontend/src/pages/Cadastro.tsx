import { useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../css/Cadastro.css';
import { hashPassword } from '../utils/auth';
import { apiFetch } from '../utils/api';

// Molde de dados do TypeScript para o envio
interface CadastroDados {
    usuario: string;
    email: string;
    senha: string;
    nascimento: string;
}

export function Cadastro() {
    const [usuario, setUsuario] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');
    const [nascimento, setNascimento] = useState('');
    
    const navigate = useNavigate();

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault(); 

        if (senha !== confirmarSenha) {
            alert("As senhas não coincidem!");
            return;
        }

        const senhaHash = await hashPassword(senha);
        const dadosCadastro: CadastroDados = {
            usuario: usuario,
            email: email,
            senha: senhaHash,
            nascimento: nascimento
        };

        try {
            // Alterado para usar o apiFetch padronizado
            const response = await apiFetch('/Cadastro', {
                method: 'POST',
                body: JSON.stringify(dadosCadastro)
            });

            // Litura defensiva da resposta para evitar panes de JSON vazio
            let resultado: any = {};
            const textoResposta = await response.text();
            if (textoResposta) {
                resultado = JSON.parse(textoResposta);
            }

            if (response.ok) {
                alert(resultado.mensagem || "Cadastro realizado com sucesso!");
                navigate("/pagina/Login"); 
            } else {
                // FastAPI envia erros dentro de 'detail'
                alert("Erro no cadastro: " + (resultado.detail || resultado.mensagem || "E-mail já cadastrado."));
            }
        } catch (error) {
            console.error('Erro:', error);
            alert("Erro ao conectar com o servidor.");
        }
    };
    
    return (
        /*colocar componentes */
        <div className="signup-container">
            <h2>Criar Nova Conta</h2>
            {/* o campo form e usado para fazer um requerimento do back */}
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label htmlFor="usuario">Usuario</label>
                    <input type="text" id="usuario" placeholder="teste da silva" value={usuario} onChange={(e) => setUsuario(e.target.value)} required />
                </div>

                <div className="input-group">
                    <label htmlFor="email">E-mail</label>
                    <input type="email" id="email" placeholder="exemplo@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>

                <div className="input-group">
                    <label htmlFor="password">Senha</label>
                    <input type="password" id="password" placeholder="Mínimo 8 caracteres" value={senha} onChange={(e) => setSenha(e.target.value)} required />
                </div>

                <div className="input-group">
                    <label htmlFor="confirm-password">Confirmar Senha</label>
                    <input type="password" id="confirm-password" placeholder="Repita a senha" value={confirmarSenha} onChange={(e) => setConfirmarSenha(e.target.value)} required />
                </div>

                <div className="input-group">
                    <label htmlFor="birthdate">Data de Nascimento</label>
                    <input type="date" id="birthdate" value={nascimento} onChange={(e) => setNascimento(e.target.value)} required />
                </div>

                <button type="submit" className="btn-register">Finalizar Cadastro</button>

                <Link to="/pagina/Login" className="back-link">Já tem uma conta? Faça login</Link>
            </form>
        </div>
    );
}