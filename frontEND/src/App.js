import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import LoginPrin from './paginas/login'
import EsqueceuSenha from './paginas/forgotPass';
import TelaDeEntrada from './paginas/telaEntrada'; 
import Cadastro from './paginas/cadastro';
import Footer from './Componentes/footer';
import { AnimatePresence } from 'framer-motion'
import Header from './Componentes/Header';

function AnimatedRoutes(){ 
  const location = useLocation();

  return (
    <AnimatePresence mode='wait'>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<TelaDeEntrada/>}/>
        <Route path="/Login" element={<LoginPrin/>}/>
        <Route path="/forgotPass" element={<EsqueceuSenha/>}/> 
        <Route path="/cadastro" element={<Cadastro/>}/>
        <Route path="*" element={<h1>Erro 404 - Página não encontrada!</h1>}/>
      </Routes>
    </AnimatePresence>


  )
}

function App() {
  return (
    <Router>
      
      <div className="App" style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <div style={{ flex: 1 }}>
          <Header />
          <AnimatedRoutes/>
        </div>
        
        <Footer />
      </div>  
    </Router>

  );
}

export default App;
