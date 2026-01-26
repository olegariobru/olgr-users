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
  const [mensagem, setMensagem] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setUserRole } = useAuth();

  // ?? Atualiza os campos do formulário
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ?? Valida formato de e-mail e senha
  const validarEmail = (email) => /\S+@\S+\.\S+/.test(email);
  const validarSenha = (senha) =>
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/.test(senha);

  // ?? Envio do formulário
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensagem('');

    // Validação dos campos
    if (!form.email.trim() || !form.password.trim()) {
      setMensagem('? Preencha todos os campos antes de continuar.');
      return;
    }

    if (!validarEmail(form.email)) {
      setMensagem('? O email informado não é válido.');
      return;
    }

    if (!validarSenha(form.password)) {
      setMensagem(
        '? A senha está incorreta.'
      );
      return;
    }

    try {
      setLoading(true);

      // ?? Faz login no Firebase
      const userCredential = await signInWithEmailAndPassword(auth, form.email, form.password);
      const user = userCredential.user;

      // ?? Busca role no Firestore
      const docRef = doc(db, 'users', user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const role = docSnap.data().role || 'user';
        setUserRole(role);

        // ?? Exibe mensagem de sucesso
        setMensagem('? Login realizado com sucesso! Redirecionando...');

        // ?? Redireciona conforme o tipo de usuário
        setTimeout(() => {
          if (role.toLowerCase() === 'admin') {
            navigate('/telaADMinicial');
          } else {
            navigate('/telaInicial');
          }
        }, 1000);
      } else {
        setMensagem('? Usuário não encontrado no banco de dados.');
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);

      // ?? Tratamento de erros comuns do Firebase
      let mensagemErro = '? Erro ao fazer login. Tente novamente.';
      if (error.code === 'auth/invalid-email') {
        mensagemErro = '? O formato do email é inválido.';
      } else if (error.code === 'auth/user-not-found') {
        mensagemErro = '? Usuário não encontrado.';
      } else if (error.code === 'auth/wrong-password') {
        mensagemErro = '? Senha incorreta. Verifique e tente novamente.';
      } else if (error.code === 'auth/too-many-requests') {
        mensagemErro = '? Muitas tentativas falhas. Tente novamente mais tarde.';
      }

      setMensagem(mensagemErro);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <div className={styles.lgBody}>
        <form className={styles.lgForm} onSubmit={handleSubmit}>
          <div className={styles.lgFormDiv}>
            <p className={styles.lgFormPtitle}>Bem-vindo de volta! :)</p>
            <p className={styles.lgFormPsubtitle}>
              Insira suas credenciais para acessar sua conta.
            </p>
          </div>

          <label className={styles.lgLabel} htmlFor="email">Email</label>
          <input
            className={styles.lgInput}
            type="email"
            id="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="seuemail@exemplo.com"
          />

          <label className={styles.lgLabel} htmlFor="password">Senha</label>
          <input
            className={styles.lgInput}
            type="password"
            id="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="********"
          />

          <button className={styles.lgButton} type="submit" disabled={loading}>
            {loading ? 'Entrando...' : 'Entrar'}
          </button>

          {mensagem && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className={mensagem.startsWith('?') ? styles.msgSucesso : styles.msgErro}
            >
              {mensagem}
            </motion.p>
          )}

          <p className={styles.lgFormP}>
            Esqueceu sua senha?{' '}
            <Link to="/forgotPass" className={styles.lgLink}>
              Clique aqui.
            </Link>
          </p>
          <p className={styles.lgFormP}>
            Não tem conta?{' '}
            <Link to="/cadastro" className={styles.lgLink}>
              Cadastre-se.
            </Link>
          </p>
        </form>
      </div>
    </motion.div>
  );
}
