import { Link } from 'react-router-dom';
import styles from './esqueceuSenha.module.css';
import { motion } from 'framer-motion';

export default function EsqueceuSenha() {


    return (
        <motion.div
            initial={{ opacity: 0, y: 20}}
            animate={{ opacity: 1, y: 0}}
            exit={{ opacity: 0, y: -20}}
            transition={{ duration: 0.5}}
        >
            <div className={styles.fgHeader}>
                <h1>olg&lt;Users&gt;.</h1>
            </div>            

        <div className={styles.container}>

            <form className={styles.fgForm}>
                <h1 className={styles.fgTit}>Esqueceu a senha?</h1>
                <p className={styles.fgSubTit}>Tudo bem :) insira seu e-mail para receber um link de recuperação de senha.</p>
                <label htmlFor="email">Email:</label>
                <input className={styles.inputFg} type="email" id="email" name="email" required />
                <button className={styles.btnFg} type="submit">Enviar link de recuperação</button>
                <div className={styles.divisor}>
                    <Link to="/login" className={styles.fgRod}>Voltar ao login</Link>
                </div>
            </form>
        </div>
        </motion.div>
    );
}