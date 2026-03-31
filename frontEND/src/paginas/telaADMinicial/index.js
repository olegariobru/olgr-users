import { useState } from "react";
import Sidebar from "../../Componentes/ADM/Sidebar";
import Dashboard from "../../Componentes/ADM/Dashboard";
import ListaUsuarios from "../../Componentes/ADM/ListaDeUsuarios";
import CriarUsuario from "../../Componentes/ADM/CriarUsuarios"; 

export default function TelaAdminInicial() {
  const [aba, setAba] = useState("dashboard");

  function renderConteudo() {
    switch (aba) {
      case "dashboard":
        return <Dashboard />;
      case "usuarios":
        return <ListaUsuarios />;
      case "criar":
        return <CriarUsuario />;
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