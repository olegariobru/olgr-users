import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./privatesRoute";
import PublicRoute from "./publicRotes";
import Forgot from "../paginas/forgotPass"
import LoginP from "../paginas/login";
import TelaDeEntrada from "../paginas/telaEntrada";
import Cadastro from "../paginas/cadastro";
import TelaADMinicial from "../paginas/telaADMinicial";

export default function AppRoutes() {
  return (
    <Routes>

      {/* tela inicial */}
      <Route
        path="/"
        element={
          <PublicRoute>
            <TelaDeEntrada />
          </PublicRoute>
        }
      />

      {/* login */}
      <Route
        path="/login"
        element={
          <PublicRoute>
            <LoginP />
          </PublicRoute>
        }
      />


      {/* forgot password */} 
        <Route
          path="/forgotpass"
          element={
            <PublicRoute>
              <Forgot />
            </PublicRoute>
          }
        />


      {/* cadastro */}
      <Route
        path="/cadastro"
        element={
          <PublicRoute>
            <Cadastro />
          </PublicRoute>
        }
      />

      {/* área protegida */}
      <Route
        path="/admin"
        element={
          <PrivateRoute>
            <TelaADMinicial />
          </PrivateRoute>
        }
      />

      {/* fallback */}
      <Route
        path="*"
        element={
          <PrivateRoute>
            <TelaADMinicial />
          </PrivateRoute>
        }
      />

    </Routes>
  );
}