import { Routes, Route } from "react-router-dom";
import TelaADMinicial from "../paginas/telaADMinicial";

export default function Admin() {
  return (
    <Routes>
      <Route path="painel" element={<admin />} />
    </Routes>
  );
}