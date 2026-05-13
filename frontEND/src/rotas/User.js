import { Routes, Route } from "react-router-dom";
import TelaIncial from "../paginas/telaInicial";

export default function User() {
  return (
    <Routes>
      <Route path="painel" element={<user />} />
    </Routes>
  );
}