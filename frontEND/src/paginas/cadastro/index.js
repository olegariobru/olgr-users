import { motion } from 'framer-motion';
import styles from './cadastro.module.css';
import React from 'react';

export default function Cadastro() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20}}
            animate={{ opacity: 1, y: 0}}
            exit={{ opacity: 0, y: -20}}
            transition={{ duration: 0.5}}
        >
            <div className={styles.cadHeader}>
                <h1>olg&lt;Users&gt;.</h1>
            </div>
            <div className={styles.container}>

                <form className={styles.cadForm}>
                    <h1 className={styles.cadTit}>Crie sua conta</h1>
                    <p className={styles.cadSubTit}>Vamos começar com suas informações básicas</p>
                    <label className={styles.labelCad} htmlFor="nome">Nome</label>
                    <input className={styles.inputCad} type="text" id="nome" name="nome" required />
                    <label className={styles.labelCad} htmlFor="email">Email</label>
                    <input className={styles.inputCad} type="email" id="email" name="email" required />
                    <label className={styles.labelCad} htmlFor="password">Senha</label>
                    <input className={styles.inputCad} type="password" id="senha" name="senha" required />
                    <button className={styles.btnCad} type="submit">Cadastrar</button>
                    <div className={styles.divisor}>
                        <p className={styles.cadRod}>Já tem uma conta? <a href="/login" className={styles.cadLink}>Entrar</a></p>
                    </div>
                </form>
                
            </div>
        </motion.div>
    );
}