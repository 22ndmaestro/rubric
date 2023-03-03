import { useState, useEffect } from "react";
import styles from './LoginReg.module.css';
import { signIn, signInWithGoogle, logout } from '../../../utils/auth';
import { addUser } from '../../../utils/fireStore';
import StyledBtn from '../StyledBtn/StyledBtn';
import { useRouter } from 'next/router';
import { useAuth } from '../../../context/AuthContext'

export default function LoginReg() {
  const router = useRouter();
  const { currentUser } = useAuth();
  const [inputs, setInputs] = useState({});
  const [error, setError] = useState({});
  //const [inputs, setInputs] = useState({});
  useEffect(() => {
    if (currentUser) {
      router.push('/quizzes');
    }
  }, [currentUser])

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  return (
    <><div className={styles.wrapper}>
      <form className={styles.form}>
        <div className={styles.inWrapper}>
          <label for="email">email:</label>
          <input
            name="email"
            type="email"
            className={styles.input}
            onChange={(e) => handleChange(e)}
            placeholder="email..."
            required
          /></div>
        <div className={styles.inWrapper} >
          <label for="password">password:</label>
          <input
            name="password"
            type="password"
            className={styles.input}
            onChange={(e) => handleChange(e)}
            placeholder="password..."
            required
          /></div>
        <div className={styles.inWrapper}>
          <label for="confirmPassword">confirm password:</label>
          <input
            name="confirmPassword"
            type="password"
            className={styles.input}
            onChange={(e) => handleChange(e)}
            placeholder="confirm password..."
            required
          /></div>
        <StyledBtn
          variant={'formBtn'}
          title={'Register'}
          action={(e) => signIn(e, inputs)}
        />
      </form>

      <StyledBtn
        variant={'google'}
        title={'sign in with Google'}
        action={signInWithGoogle}
      /></div>
    </>
  )
}

