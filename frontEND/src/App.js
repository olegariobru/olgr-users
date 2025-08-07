import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import LoginPrin from './paginas/login'
import { AnimatePresence } from 'framer-motion'
import TelaDeEntrada from './paginas/telaEntrada'; 


function AnimatedRoutes(){
  const location = useLocation();

  return (
    <AnimatePresence mode='wait'>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<TelaDeEntrada/>}/>
        <Route path="/Login" element={<LoginPrin/>}/>
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
