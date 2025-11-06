
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import LoginPrin from './paginas/login';
import EsqueceuSenha from './paginas/forgotPass';
import TelaDeEntrada from './paginas/telaEntrada';
import Cadastro from './paginas/cadastro';
import Footer from './Componentes/footer';
import Header from './Componentes/Header';
import { AuthProvider } from './Context/AuthContext'; 
import TelaInicial from './paginas/telaInicial';
import TelaADMinicial from './paginas/telaADMinicial';

function AnimatedRoutes() { 
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<TelaDeEntrada />} />
        <Route path="/login" element={<LoginPrin />} />
        <Route path="/forgotPass" element={<EsqueceuSenha />} /> 
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/telaInicial" element={<TelaInicial />} />'
        <Route path="/telaADMinicial" element={<TelaADMinicial/>} />
        <Route path="*" element={<h1>Erro 404 - Página não encontrada!</h1>} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App" style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
          <div style={{ flex: 1 }}>
            <Header />
            <AnimatedRoutes />
          </div>
          <Footer />
        </div>  
      </Router>
    </AuthProvider>
  );
}

export default App;
