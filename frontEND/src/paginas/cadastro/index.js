import { motion } from 'framer-motion';
import styles from './cadastro.module.css';
import { useState } from 'react';
import { auth } from '../../firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';

export default function Cadastro() {
  const [form, setForm] = useState({
    nome: '',
    email: '',
    senha: '',
    telefone: '',
  });

  const [mensagem, setMensagem] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensagem('');

    try {
      await createUserWithEmailAndPassword(auth, form.email, form.senha);
      setMensagem('✅ Usuário cadastrado com sucesso!');
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
      className={styles.container}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h2>Crie sua conta</h2>
      <p>Vamos começar com suas informações básicas</p>

      {mensagem && <p>{mensagem}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="nome"
          placeholder="Nome"
          value={form.nome}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="senha"
          placeholder="Senha"
          value={form.senha}
          onChange={handleChange}
        />
        <input
          type="tel"
          name="telefone"
          placeholder="Telefone"
          value={form.telefone}
          onChange={handleChange}
        />
        <button type="submit">Cadastrar</button>
      </form>
    </motion.div>
  );
}
