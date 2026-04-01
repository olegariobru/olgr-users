import { BrowserRouter as Router } from 'react-router-dom';
import Footer from './Componentes/footer';
import Header from './Componentes/Header';
import { AuthProvider } from './Context/AuthContext'; 
import AppRoutes from './rotas/AppRotes';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div 
          className="App" 
          style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
        >
          <Header />

          <div style={{ flex: 1 }}>
            <AppRoutes />
          </div>

          <Footer />
        </div>  
      </Router>
    </AuthProvider>
  );
}

export default App;