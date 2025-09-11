import styles from './login.module.css'
import { motion } from 'framer-motion'

export default function LoginPrin (){
    return(
        <motion.div
            initial={{ opacity: 0, y: 20}}
            animate={{ opacity: 1, y: 0}}
            exit={{ opacity: 0, y: -20}}
            transition={{ duration: 0.5}}
        ><div>
            <div className={styles.lgHeader}>
                <h1>olg&lt;Users&gt;.</h1>
            
            </div>

            <div className={styles.lgBody}>
                <h1 className={styles.lgBodyTitle}>Login</h1>
                <form className={styles.lgForm}>
                    <label className={styles.lgLabel} htmlFor="email">Email</label>
                    <input className={styles.lgInput} type="email" id="email" name="email" required />
                    <label className={styles.lgLabel} htmlFor="password">Senha</label>
                    <input className={styles.lgInput} type="password" id="password" name="password" required />
                    <button className={styles.lgButton} type="submit">Entrar</button>
                </form>
            </div>
        </div>
        </motion.div>
    )
}