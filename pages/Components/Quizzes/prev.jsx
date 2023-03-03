import React, { useState, useEffect } from "react";
import StyledBtn from '../StyledBtn/StyledBtn';
import styles from './Quizzes.module.css';
import { getCollection, addTest, addUser, addQuiz } from '../../../utils/fireStore';
import usefetchQuizzes from '../../../hooks/fetchQuizzes';
import { useAuth } from '../../../context/AuthContext'


/**  
export default function Quizzes({quiz}) {

  return (
    <>
      <div className={styles.wrapper}>
        <StyledBtn
          variant={'sCTA'}
          title={'+'}
        />
        <section className={styles.qsection}>
          {
            collection.map((quiz) => (
              <div className={styles.quiz}>
                <h1>{quiz.subject}</h1>
                <p>{quiz.topic}</p>
                <StyledBtn
                  variant={'sCTA'}
                  title={'x'}
                />
              </div>
            ))
           }
        </section>
      </div>

    </>
  )
}
*/

import { db, auth } from '../../api/firebase';

export async function getServerSideProps() {
  const querySnapshot = await getDocs(collection(db, "users"));
  const users = querySnapshot.docs.map((doc) => doc.data());
  const { loading, error, quizzes } = usefetchQuizzes();
  console.log('banana');


  return {
    props: {
      quizzes,
    },
  };
}

export default function Movies({ quizzes }) {
  const { currentUser } = useAuth();
  return (
    <div className={styles.wrapper}>
      <StyledBtn
        variant={'sCTA'}
        title={'+'}
        action={() => addQuiz('English', 'Literature', 'Cyfiram', currentUser.uid)}
      />
      <section className={styles.qsection}>
        {
          console.log(quizzes)
        /** 
          users.map((quiz) => (
            <div className={styles.quiz}>
              <h1>{quiz.subject}</h1>
              <p>{quiz.topic}</p>
              <StyledBtn
                variant={'sCTA'}
                title={'x'}
              />
            </div>
          ))
          */}
      </section>
    </div>
  );
}

