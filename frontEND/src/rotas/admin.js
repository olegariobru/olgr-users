import { Routes, Route } from "react-router-dom";
import TelaInicial from "../paginas/telaInicial";
import TelaADMinicial from "../paginas/telaADMinicial";

export default function Admin() {
  return (
    <Routes>
      <Route path="/" element={<TelaInicial />} />
      <Route path="painel" element={<TelaADMinicial />} />
    </Routes>
  );
}