import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import styles from './login.module.css';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../../firebaseConfig';
import { useAuth } from '../../Context/AuthContext';

export default function LoginPrin() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { setUserRole } = useAuth();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validarEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro('');
    setSucesso('');

    const emailNormalizado = form.email.trim().toLowerCase();

    if (!emailNormalizado || !form.password.trim()) {
      setErro('Preencha todos os campos.');
      return;
    }

    if (!validarEmail(emailNormalizado)) {
      setErro('O e-mail informado não é válido.');
      return;
    }

    try {
      setLoading(true);

      // 🔐 Login via Firebase Auth
      const userCredential = await signInWithEmailAndPassword(
        auth,
        emailNormalizado,
        form.password
      );

      const user = userCredential.user;

      // 📄 Busca dados no Firestore
      const docRef = doc(db, 'users', user.uid);
      const docSnap = await getDoc(docRef);

      let role = 'user'; // Valor padrão seguro
      if (docSnap.exists() && docSnap.data().role) {
        const fetchedRole = String(docSnap.data().role).toLowerCase();
        // Garante que o role seja 'admin' ou 'user', caso contrário, assume 'user'
        if (fetchedRole === 'admin' || fetchedRole === 'user') {
          role = fetchedRole;
        } else {
          console.warn('Role inesperado encontrado para o usuário:', user.uid, fetchedRole);
        }
      }

      setUserRole(role);

      setSucesso('Login realizado com sucesso! Redirecionando...');

      // Redirecionamento imediato com base no role
      if (role === 'admin') {
        navigate('/admin');
      }else {
        setErro('Role do usuário é inválido. Contate o suporte.');
      }

      if (role === 'user') {
        navigate('/user');
      }else {
        // Caso role seja algo inesperado, redireciona para uma página segura ou mostra mensagem
        setErro('Role do usuário é inválido. Contate o suporte.');
      }

    } catch (error) {
      console.error(error);

      switch (error.code) {
        case 'auth/user-not-found':
          setErro('Usuário não encontrado.');
          break;
        case 'auth/wrong-password':
          setErro('Senha incorreta.');
          break;
        case 'auth/invalid-email':
          setErro('E-mail inválido.');
          break;
        case 'auth/too-many-requests':
          setErro('Muitas tentativas. Tente mais tarde.');
          break;
        default:
          setErro('Erro ao fazer login.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className={styles.lgBody}>
        <form className={styles.lgForm} onSubmit={handleSubmit}>
          <p className={styles.lgFormPtitle}>Bem-vindo de volta!</p>

          <label>Email</label>
          <input
            name="email"
            type="email"
            value={form.email} 
            onChange={handleChange}
            className={styles.lgInput}
          />

          <label>Senha</label>
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            className={styles.lgInput}
          />

          <button disabled={loading} className={styles.lgButton}>
            {loading ? 'Entrando...' : 'Entrar'}
          </button>

          {erro && <p className={styles.msgErro}>{erro}</p>}
          {sucesso && <p className={styles.msgSucesso}>{sucesso}</p>}

          <p className={styles.lgFormP}>
            Esqueceu a senha? <Link to="/forgotPass">Clique aqui</Link>
          </p>
        </form>
      </div>
    </motion.div>
  );
}
