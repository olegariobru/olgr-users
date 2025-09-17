import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import LoginPrin from './paginas/login'
import EsqueceuSenha from './paginas/forgotPass';
import TelaDeEntrada from './paginas/telaEntrada'; 
import { AnimatePresence } from 'framer-motion'


function AnimatedRoutes(){
  const location = useLocation();

  return (
    <AnimatePresence mode='wait'>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<TelaDeEntrada/>}/>
        <Route path="/Login" element={<LoginPrin/>}/>
        <Route path="/forgotPass" element={<EsqueceuSenha/>}/> 
        <Route path="*" element={<h1>Erro 404 - Página não encontrada!</h1>}/>
      </Routes>
    </AnimatePresence>
  )
}

function App() {
  return (
    <Router>
      <AnimatedRoutes/>
    </Router>

  );
}

export default App;
