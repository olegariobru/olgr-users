import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";
import { auth, db } from "../../firebaseConfig";
import { useNavigate, Link } from "react-router-dom";
import styles from "./esqueceuSenha.module.css";

export default function EsqueceuSenha() {
  const [email, setEmail] = useState("");
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // 🔎 Validação de formato de e-mail
  const validarEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email.toLowerCase());
  };

  // 🔍 Verifica se o e-mail existe no Firestore
  const emailExisteNoFirestore = async (email) => {
    const q = query(
      collection(db, "users"),
      where("email", "==", email.toLowerCase())
    );

    const snapshot = await getDocs(q);
    return !snapshot.empty;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro("");
    setSucesso("");

    // 1️⃣ Campo vazio
    if (!email.trim()) {
      setErro("O e-mail é obrigatório.");
      return;
    }

    // 2️⃣ Formato inválido
    if (!validarEmail(email)) {
      setErro("Digite um e-mail válido.");
      return;
    }

    try {
      setLoading(true);

      // 3️⃣ Verifica se existe no Firestore
      const existe = await emailExisteNoFirestore(email);

      if (!existe) {
        setErro("Não existe nenhuma conta com esse e-mail.");
        return;
      }

      // 4️⃣ Envia e-mail de recuperação
      await sendPasswordResetEmail(auth, email);

      setSucesso(
        "Link de recuperação enviado! Redirecionando para o login..."
      );

      // 5️⃣ Redireciona
      setTimeout(() => {
        navigate("/login");
      }, 2000);

    } catch (error) {
      console.error(error);
      setErro("Erro ao enviar o e-mail. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.fgForm} onSubmit={handleSubmit}>
        <h1 className={styles.fgTit}>Esqueceu a senha?</h1>

        <p className={styles.fgSubTit}>
          Informe seu e-mail para receber o link de recuperação.
        </p>

        <label htmlFor="email">E-mail:</label>
        <input
          id="email"
          type="email"
          className={styles.inputFg}
          placeholder="nome@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          className={styles.btnFg}
          type="submit"
          disabled={loading}
        >
          {loading ? "Enviando..." : "Enviar link de recuperação"}
        </button>

        {erro && <p className={styles.erro}>{erro}</p>}
        {sucesso && <p className={styles.sucesso}>{sucesso}</p>}

        <div className={styles.divisor}>
          <Link to="/login" className={styles.fgRod}>
            Voltar ao login
          </Link>
        </div>
      </form>
    </div>
  );
}
