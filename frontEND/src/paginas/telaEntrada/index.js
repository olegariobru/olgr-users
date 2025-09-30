import styles from '../telaEntrada/teladeentrada.module.css';
import { motion } from 'framer-motion'


export default function Teladeentrada(){

    return(
        <motion.div
            initial={{ opacity: 0, y: 20}}
            animate={{ opacity: 1, y: 0}}
            exit={{ opacity: 0, y: -20}}
            transition={{ duration: 0.5}}
        >
    
        <div>


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