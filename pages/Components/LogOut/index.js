import { useState } from "react";
import styles from './LogOut.module.css';
import {logout } from '../../../utils/auth';
import StyledBtn from '../StyledBtn/StyledBtn';
import { useRouter } from 'next/router';

export default function LoginReg() {
  const router = useRouter();

  const clicked = ()=>{
    logout();
    router.push('/login')
  }

  const cancel = ()=>{
    logout();
    router.push('/quizzes')
  }
  

  return (
    <>
      <div className={styles.wrapper}>
        <h1>Are you sure you want to logout?</h1>
        <div className={styles.btns}>
        <StyledBtn
            variant={'formBtn'}
            title={'cancel'}
            action={cancel}
          />
        <StyledBtn
            variant={'cancelBtn'}
            title={'logout'}
            action={clicked}
          />
        </div>
      </div>
    </>
  )
}

