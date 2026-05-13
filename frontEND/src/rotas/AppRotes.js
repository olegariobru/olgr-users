import { Routes, Route } from "react-router-dom";

import PrivateRoute from "./privatesRoute";

import Forgot from "../paginas/forgotPass";
import LoginP from "../paginas/login";
import TelaDeEntrada from "../paginas/telaEntrada";
import Cadastro from "../paginas/cadastro";

import TelaADMinicial from "../paginas/telaADMinicial";
import TelaInicial from "../paginas/telaInicial";

export default function AppRoutes() {
  return (
    <Routes>

      {/* públicas */}
      <Route path="/" element={<TelaDeEntrada />} />

      <Route path="/login" element={<LoginP />} />

      <Route path="/forgotpass" element={<Forgot />} />

      <Route path="/cadastro" element={<Cadastro />} />

      {/* usuário */}
      <Route
        path="/user"
        element={
          <PrivateRoute allowedRoles={["user"]}>
            <TelaInicial />
          </PrivateRoute>
        }
      />

      {/* admin */}
      <Route
        path="/admin"
        element={
          <PrivateRoute allowedRoles={["admin"]}>
            <TelaADMinicial />
          </PrivateRoute>
        }
      />

      {/* fallback */}
      <Route
        path="*"
        element={<h1>Página não encontrada</h1>}
      />

    </Routes>
  );
}