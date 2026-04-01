import styles from "./sidebar.module.css";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../../firebaseConfig";
import { useState } from "react";

export default function Sidebar({ setAba, aba }) {
  const [saindo, setSaindo] = useState(false);
  const navigate = useNavigate();

  function getClass(tab) {
    return `${styles.item} ${aba === tab ? styles.active : ""}`;
  }

  const handleLogout = async () => {
    setSaindo(true);

    setTimeout(async () => {
      await signOut(auth);
      navigate("/login", { replace: true });
    }, 700);
  };

  return (
    <>
      <div className={`${styles.container} ${saindo ? styles.iosExit : ""}`}>
        <div className={styles.title}>⚙️ Admin</div>

        <div
          className={getClass("dashboard")}
          onClick={() => setAba("dashboard")}
        >
          📊 Dashboard
        </div>

        <div
          className={getClass("usuarios")}
          onClick={() => setAba("usuarios")}
        >
          👤 Usuários
        </div>

        <div
          className={getClass("criar")}
          onClick={() => setAba("criar")}
        >
          ➕ Criar usuário
        </div>

        <div className={styles.logout} onClick={handleLogout}>
          🚪 Sair
        </div>
      </div>

      {saindo && (
        <div className={styles.overlay}>
          <div className={styles.spinner}></div>
        </div>
      )}
    </>
  );
}