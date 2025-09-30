import { Link, useLocation } from "react-router-dom";
import styles from "./header.module.css";
import { motion } from "framer-motion";

export default function Header() {
  const location = useLocation();

  // rotas onde só o logo aparece
  const rotasSomenteLogo = ["/login", "/cadastro", "/forgotPass"];
  const somenteLogo = rotasSomenteLogo.includes(location.pathname);
  


  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}

    >
    <header>
        <div className={`${styles.entHeader} ${somenteLogo ? styles.somenteLogo : ""}`}>
            <h1 className={styles.logo}>      
                <Link to="/">Olg&lt;Users&gt;.</Link> 
            </h1>

        {!somenteLogo && (
        <div className={styles.buttonHead}>
            <Link to="/login" className={styles.btnEntrar}>Entrar</Link>
            <Link to="/cadastro" className={styles.btnCadastrar}>Cadastrar</Link>
        </div>
        )}
        </div>      

    </header>
    </motion.div>
  );
}
