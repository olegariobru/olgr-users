import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import styles from './footer.module.css';
import { motion } from 'framer-motion'

export default function Footer() { 
    return(
        <motion.div
            initial={{ opacity: 0, y: 20}}
            animate={{ opacity: 1, y: 0}}
            exit={{ opacity: 0, y: -20}}
            transition={{ duration: 0.5}}
        >


        <footer className={styles.footer}>
            <div className={styles.footersite}>
                <p>© 2024 olg&lt;Users&gt;. Todos os direitos reservados.</p>
            </div>

            <div className={styles.redes}>
                <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook size={24} color="black" /></a>
                <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram size={24} color="black" /></a>
                <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer"><FaLinkedin size={24} color="black" /></a>   
                <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter size={24} color="black" /></a>
            </div>
        </footer>
        </motion.div>
        
    )
}