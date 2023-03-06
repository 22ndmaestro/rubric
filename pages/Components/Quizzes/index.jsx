import React, { useState, useEffect } from "react";
import { doc, collection, query, where, getDocs, onSnapshot } from 'firebase/firestore';

import { db, auth } from '../../api/firebase';
import styles from './Quizzes.module.css';

function Quizzes({ setAddPressed, isLoaded,
  setIsLoaded, settingQuestions, addPressed,
  setIsSubmitted }) {
  const [quizzes, setQuizzes] = useState([]);


  useEffect(() => {
    const setQuiz = async () => {
        const colRef = collection(db, "quizzes");
      let ref = '';
          if (auth.currentUser) {
          ref = auth.currentUser.uid;
        }
        const q = query(colRef, where('user_uid', '==', ref));
  
  
        const querySnapshot = await getDocs(q);
        let quizzesData = [];
        querySnapshot.forEach((doc) => {
          quizzesData.push({id: doc.id,
        ...doc.data(),});
        });
        // update the state with the quizzes data
        setQuizzes(quizzesData);
        setIsLoaded(() => true);
    };
      setQuiz();
    
  }, [auth,addPressed]);


  const clicked = () => {
    setAddPressed(() => true);
    setIsLoaded(() => false);
    setIsSubmitted(() => false);
  }

  const quizClick = (id) => {
    setIsLoaded(prev => !prev);
    setAddPressed(prev => !prev);
    //console.log(id);
    settingQuestions(id);
  }

  const percentage = (scores, length) => {
    if (length > 0) {
      const scoresWithoutFirstElement = scores.slice(1);
      const sumOfScores = scoresWithoutFirstElement.reduce((a, b) => a + b);
      const averageScore = sumOfScores / scoresWithoutFirstElement.length;
      const averagePercentageScore = (averageScore / length) * 100;
      return averagePercentageScore.toFixed(2);
    }
    return 0;
  }


  return (
    <>
      <div className={styles.container}>
        <div className={styles.header}>
          <button className={styles.backBtn} ></button>
          <h1 className={styles.heading}>Quizzes</h1>
          <button className={styles.nothing} ></button>
        </div>

        <button
          className={styles.add}
          onClick={clicked}
        >+ add quiz</button>

        <ul className={styles.ul}><section className={styles.section}>
          {!isLoaded ? <div>loading... </div> : (
            quizzes.map((quiz) => (
              <li
                className={styles.li}
                key={quiz.id}
              >
                <div
                  value={quiz.id}
                  className={styles.quizWrapper}
                  onClick={() => quizClick(quiz.id)}
                >
                  <div className={styles.textWrapper}>
                    <h1 className={styles.h1}>{quiz.subject}</h1>
                    <p className={styles.p}>{quiz.topic}</p>
                  </div>
                  <div className={styles.score}>
                    {percentage(quiz.scores, quiz.maxScore)}
                  </div>
                  <button className={styles.btn}>✕</button>
                </div>
              </li>
            )))}
        </section></ul>
      </div>
    </>
  );
}

export default Quizzes;