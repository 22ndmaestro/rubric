import React, { useState, useEffect } from "react";
import OptionBtn from '../OptionBtn';
import styles from './QuizCard.module.css';
import { shuffleArray } from '../../../utils/chat2local'
import { updateScores } from '../../../utils/fireStore'

export default function QuizCard({ questions, setAddPressed, setIsSubmitted, questionsID }) {
  const [score, setScore] = useState(0);
  const [nextClicked, setNextClicked] = useState(false);
  const [oneBtnClicked, setOneBtnClicked] = useState(false);
  const length = questions.length;
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const quest = questions;
  const answerArray = [
    quest[index].correctanswer,
    quest[index].wronganswer1,
    quest[index].wronganswer2,
    quest[index].wronganswer3
  ];


  const nextClick = () => {

    setNextClicked(prev => !prev);
    if (length !== (index + 1)) {
      return setIndex(prev => prev + 1);
    }
    updateScores(questionsID, score, length);
    ()=>back();
  }

  useEffect(() => {
    setAnswers(prev => [...shuffleArray(answerArray)]);
    //console.log(questions);
    //console.log(answerArray);
  }, [index]);
  const back = () => {
    setIsSubmitted(() => false);
    setAddPressed(prev => !prev);
  }

  return (
    <>
      <div className={styles.header}>
        <button
          className={styles.backBtn}
          onClick={back}
        >back</button>
        <h1 className={styles.heading}>Quizzes</h1>
        <button className={styles.nothing} ></button>
      </div>
      <div className={styles.card}>
        <div className={styles.heading}>
          <h2 className={styles.subject}>Maths</h2>
          <p className={styles.topic}>Calculus</p>
        </div>
        <div className={styles.score}><div>{score}</div> <div>of</div> <div>{length}</div></div>
        <div className={styles.quiz}>
          <p className={styles.question}>{quest[index].question}</p>
          <div className={styles.options} >
            {answers.map((answer, i) => {
              return <OptionBtn
                key={i}
                value={answer}
                setScore={setScore}
                correct={quest[index].correctanswer}
                oneBtnClicked={oneBtnClicked}
                nextClicked={nextClicked}
                setNextClicked={setNextClicked}
                setOneBtnClicked={setOneBtnClicked}
              >{answer}</OptionBtn>
            })}
          </div>
          <button
            className={!oneBtnClicked ? styles.nextDisabled : styles.next}
            onClick={nextClick}

          >{length === (index + 1) ? 'complete' : 'next'}</button>
        </div>
        <div className={styles.position}><div>{index + 1}</div> <div>of</div> <div>{length}</div></div>
      </div>
    </>
  )
}

