import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Importando as nossas telas
import { Login } from './pages/Login';
import { Cadastro } from './pages/Cadastro';
import { EsqueceuSenha } from './pages/EsqueceuSenha';
import { Home } from './pages/Home';
import { ProtectedRoute } from './routes/ProtectedRoute';


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/pagina/Login" element={<Login />} />
        <Route path="/pagina/Cadastro" element={<Cadastro />} />
        <Route path="/pagina/EsqueceuSenha" element={<EsqueceuSenha />} />
        <Route
          path="/pagina/Home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        {/* Se a rota for vazia ou não existir, manda direto pro Login */}
        <Route path="/" element={<Navigate to="/pagina/Login" />} />
        <Route path="*" element={<Navigate to="/pagina/Login" />} />
      </Routes>
    </BrowserRouter>
  );
}