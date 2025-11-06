import { motion } from 'framer-motion';
import styles from './cadastro.module.css';
import { useState } from 'react';
import { auth, db } from '../../firebaseConfig'; // db vem do getFirestore(app)
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore'; // Import Firestore
import { Link, useNavigate } from 'react-router-dom';

export default function Cadastro() {
  const [form, setForm] = useState({
    nome: '',
    email: '',
    senha: '',
    telefone: '',
    role: 'Users', // Valor padrão
  });

  const [mensagem, setMensagem] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validarEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validarSenha = (senha) =>
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/.test(senha);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensagem('');

    // Validação de campos obrigatórios
    const campos = ['nome', 'email', 'senha', 'telefone'];
    for (const campo of campos) {
      if (!form[campo]) {
        setMensagem(`❌ O campo "${campo}" está vazio.`);
        return;
      }
    }

    if (!validarEmail(form.email)) {
      setMensagem('❌ O email informado não é válido.');
      return;
    }

    if (!validarSenha(form.senha)) {
      setMensagem(
        '❌ A senha deve ter pelo menos 6 caracteres, incluindo letras, números e caracteres especiais.'
      );
      return;
    }

    try {
      // 1️⃣ Cria o usuário no Firebase Authentication
      const cred = await createUserWithEmailAndPassword(auth, form.email, form.senha);

      // 2️⃣ Cria o documento no Firestore com o grupo selecionado
      await setDoc(doc(db, 'users', cred.user.uid), {
        nome: form.nome,
        email: form.email,
        telefone: form.telefone,
        role: form.role, // 🔹 Armazena o grupo escolhido
        criadoEm: new Date(),
      });

      setMensagem('✅ Usuário cadastrado com sucesso!');
      setTimeout(() => navigate('/login'), 2000);
    } catch (error) {
      console.error(error);
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
            <p className={styles.cadFormTitle}>Cadastrar novo usuário</p>
            <p className={styles.cadFormSubtitle}>Preencha as informações abaixo.</p>
          </div>

          <label className={styles.cadLabel} htmlFor="nome">Nome</label>
          <input
            className={styles.inputCad}
            type="text"
            id="nome"
            name="nome"
            value={form.nome}
            onChange={handleChange}
          />

          <label className={styles.cadLabel} htmlFor="email">Email</label>
          <input
            className={styles.inputCad}
            type="text"
            id="email"
            name="email"
            value={form.email}
            onChange={handleChange}
          />

          <label className={styles.cadLabel} htmlFor="senha">Senha</label>
          <input
            className={styles.inputCad}
            type="password"
            id="senha"
            name="senha"
            value={form.senha}
            onChange={handleChange}
          />

          <label className={styles.cadLabel} htmlFor="telefone">Telefone</label>
          <input
            className={styles.inputCad}
            type="text"
            id="telefone"
            name="telefone"
            value={form.telefone}
            onChange={handleChange}
          />

          {/* Campo para selecionar o grupo */}
          <label className={styles.cadLabel} htmlFor="role">Grupo</label>
          <select
            className={styles.inputCad}
            id="role"
            name="role"
            value={form.role}
            onChange={handleChange}
          >
            <option value="Admin">Administrador</option>
            <option value="Users">Usuário</option>
            <option value="Leitor">Leitor</option>
          </select>

          <button className={styles.btnCad} type="submit">
            Cadastrar
          </button>

          {mensagem && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className={mensagem.startsWith('✅') ? styles.msgSucesso : styles.msgErro}
            >
              {mensagem}
            </motion.p>
          )}

          <p className={styles.cadFormP}>
            Já tem conta?{' '}
            <Link to="/login" className={styles.cadLink}>
              Entrar
            </Link>
          </p>
        </form>
      </div>
    </motion.div>
  );
}
