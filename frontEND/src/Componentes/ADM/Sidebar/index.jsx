import styles from "./sidebar.module.css";

export default function Sidebar({ setAba, aba }) {
  function getClass(tab) {
    return `${styles.item} ${aba === tab ? styles.active : ""}`;
  }

  return (
    <div className={styles.container}>
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
    </div>
  );
}