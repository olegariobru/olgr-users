import { useState } from "react";
import Sidebar from "../../Componentes/USER/Sidebar";
import Dashboard from "../../Componentes/USER/Dashboard";
import Ferias from "../../Componentes/USER/Ferias";
import Holerite from "../../Componentes/USER/Holerite";


export default function TelaInicial() {
  const [aba, setAba] = useState("dashboard");

  function renderConteudo() {
    switch (aba) {
      case "dashboard":
        return <Dashboard />;
      case "Ferias":
        return <Ferias />;
      case "Holerite":
        return <Holerite />;
      default:
        return <Dashboard />;
    }
  }

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Sidebar setAba={setAba} />
      <div style={{ flex: 1, padding: "20px" }}>
        {renderConteudo()}
      </div>
    </div>
  );
}