import React, { useState, useEffect } from "react";
import styles from './OptionBtn.module.css';

export default function QuizCard({ value, correct, setOneBtnClicked, setScore, oneBtnClicked,nextClicked, setNextClicked, children }) {
  const [clicked, setClicked] = useState(false);
  console.log(oneBtnClicked);

  const handleClick = () => {
    setClicked(prev => true);
    setOneBtnClicked(prev => true);
    if (value === correct) { setScore(prev => prev + 1) }
  }
  useEffect(()=>{
    setClicked(prev => false);
    setOneBtnClicked(prev => false);
  },[nextClicked])


  return (
    <>
      <button
        className={`${(
          clicked ? (
            value === correct ? styles.correct : styles.wrong
          ) : (
              oneBtnClicked && (value === correct) ? (styles.correct) : styles.option
            ))} ${(oneBtnClicked ? styles.disabled : '')}`}
        value={value}
        onClick={handleClick}
      >{children}</button>
    </>
  )
}

