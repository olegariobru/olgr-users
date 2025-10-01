import { motion } from 'framer-motion';
import styles from './cadastro.module.css';
import { useState } from 'react';
import { auth } from '../../firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';

export default function Cadastro() {
  const [form, setForm] = useState({
    nome: '',
    email: '',
    senha: '',
    telefone: '',
  });

  const [mensagem, setMensagem] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validarEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }
  const validarSenha = (senha) => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/;
    return regex.test(senha);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensagem('');

    if (!validarEmail(form.email)) {
      setMensagem('❌ O email informado não é válido.');
      return;
    }
    if (!validarSenha(form.senha)) {
      setMensagem('❌ A senha deve ter pelo menos 6 caracteres, incluindo letras, números e caracteres especiais.');
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, form.email, form.senha);
      setMensagem('✅ Usuário cadastrado com sucesso!');

      setTimeout(() => {
        navigate('/login');
      }, 2000);

    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        setMensagem('❌ Este email já está em uso.');
      } else if (error.code === 'auth/weak-password') {
        setMensagem('❌ A senha deve ter pelo menos 6 caracteres.');
      } else if (error.code === 'auth/invalid-email') {
        setMensagem('❌ O email informado não é válido.');
      } else {
        setMensagem('❌ Erro ao cadastrar: ' + error.message);
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <div className={styles.cadBody}>
        <form className={styles.cadForm} onSubmit={handleSubmit}>

          <div className={styles.cadFormDiv}>
            <p className={styles.cadFormTitle}>Crie sua conta</p>
            <p className={styles.cadFormSubtitle}>Preencha suas informações abaixo.</p>
          </div>

          <label className={styles.cadLabel} htmlFor="nome">Nome</label>
          <input className={styles.inputCad} type="text" id="nome" name="nome" value={form.nome} onChange={handleChange} />

          <label className={styles.cadLabel} htmlFor="email">Email</label>
          <input className={styles.inputCad} type="text" id="email" name="email" value={form.email} onChange={handleChange} />

          <label className={styles.cadLabel} htmlFor="senha">Senha</label>
          <input className={styles.inputCad} type="password" id="senha" name="senha" value={form.senha} onChange={handleChange} />


          <button className={styles.btnCad} type="submit">Cadastrar</button>

          {mensagem && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className={mensagem.startsWith("✅") ? styles.msgSucesso : styles.msgErro}
            >
              {mensagem}
            </motion.p>
          )}

          <p className={styles.cadFormP}>Já tem conta? <Link to="/login" className={styles.cadLink}>Entrar</Link></p>
        </form>
      </div>
    </motion.div>
  );
}
