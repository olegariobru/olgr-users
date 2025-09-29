import { motion } from 'framer-motion';
import styles from './cadastro.module.css';

import { useState } from 'react';
import { auth, db } from '../../firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

export default function Cadastro() {
  const [form, setForm] = useState({
    nome: '',
    email: '',
    senha: '',
    telefone: '',
    cpf: '',
    role: 'leitor', // padrão: leitor
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCred = await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.senha
      );

      await setDoc(doc(db, 'users', userCred.user.uid), {
        nome: form.nome,
        email: form.email,
        telefone: form.telefone,
        cpf: form.cpf,
        role: form.role,
      });

      alert('Usuário cadastrado com sucesso!');
    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error);
      alert('Erro ao cadastrar usuário: ' + error.message);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <div className={styles.cadHeader}>
        <h1>olg&lt;Users&gt;.</h1>
      </div>

      <div className={styles.container}>
        <form className={styles.cadForm} onSubmit={handleSubmit}>
          <h1 className={styles.cadTit}>Crie sua conta</h1>
          <p className={styles.cadSubTit}>
            Vamos começar com suas informações básicas
          </p>

          <label className={styles.labelCad} htmlFor="nome">Nome</label>
          <input
            className={styles.inputCad}
            type="text"
            id="nome"
            name="nome"
            value={form.nome}
            onChange={handleChange}
            required
          />

          <label className={styles.labelCad} htmlFor="email">Email</label>
          <input
            className={styles.inputCad}
            type="email"
            id="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <label className={styles.labelCad} htmlFor="senha">Senha</label>
          <input
            className={styles.inputCad}
            type="password"
            id="senha"
            name="senha"
            value={form.senha}
            onChange={handleChange}
            required
          />

          <label className={styles.labelCad} htmlFor="telefone">Telefone</label>
          <input
            className={styles.inputCad}
            type="text"
            id="telefone"
            name="telefone"
            value={form.telefone}
            onChange={handleChange}
            required
          />

          <label className={styles.labelCad} htmlFor="cpf">CPF</label>
          <input
            className={styles.inputCad}
            type="text"
            id="cpf"
            name="cpf"
            value={form.cpf}
            onChange={handleChange}
            required
          />

          <label className={styles.labelCad} htmlFor="role">Permissão</label>
          <select
            className={styles.inputCad}
            id="role"
            name="role"
            value={form.role}
            onChange={handleChange}
          >
            <option value="leitor">Leitor</option>
            <option value="editor">Editor</option>
            <option value="admin">Administrador</option>
          </select>

          <button className={styles.btnCad} type="submit">Cadastrar</button>

          <div className={styles.divisor}>
            <p className={styles.cadRod}>
              Já tem uma conta?{' '}
              <a href="/login" className={styles.cadLink}>Entrar</a>
            </p>
          </div>
        </form>
      </div>
    </motion.div>
  );
}
