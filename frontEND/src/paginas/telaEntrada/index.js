import styles from '../telaEntrada/teladeentrada.module.css';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion'


export default function Teladeentrada(){

    const navigate = useNavigate();
    const goLogin = () => {
        navigate('/login');
    };
    const goCadastro = () => {
        navigate('/cadastro');
    };
    return(
        <motion.div
            initial={{ opacity: 0, y: 20}}
            animate={{ opacity: 1, y: 0}}
            exit={{ opacity: 0, y: -20}}
            transition={{ duration: 0.5}}
        >
    
        <div>
        <div className={styles.entHeader}>
            <h1>olg&lt;Users&gt;.</h1>
            
        <div className={styles.buttonHead}>
            <p className={styles.btnEntrar} onClick={goLogin}> Entrar </p>
            <button className={styles.btnCadastrar} onClick={goCadastro}>Cadastrar</button>
        </div>
        </div>

        <div className={styles.slgPrin}>
            <h1 className={styles.slgPrinBody}>O futuro da saúde começa com <strong>VOCÊ.</strong></h1>
        </div>
        <div className={styles.slgPrin2}>
            <p className={styles.slgPriParag}>Seja bem vindo!</p>
        </div>
        </div>

        </motion.div>
    )
}