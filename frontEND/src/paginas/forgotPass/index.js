import styles from './esqueceuSenha.module.css';


export default function EsqueceuSenha() {
    return (
        <div className={styles.container}>
            <h1>Esqueceu a senha</h1>
            <form className={styles.form}>
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" required />
                <button type="submit">Enviar link de recuperação</button>
            </form>
        </div>
    );
}