import React, { useState, useEffect } from "react";
import { doc, onSnapshot, collection, query, where, getDocs } from 'firebase/firestore';
import { db, auth } from '../api/firebase';
import Form from '../Components/Form';
import QuizCard from '../Components/QuizCard';
import Quizzes from '../Components/Quizzes';
import Users from '../Components/Users';
import styles from './quizzes.module.css'



import SecurePage from '../Components/SecurePage';
import { async } from "@firebase/util";


export default function quizesPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [addPressed, setAddPressed] = useState(false);
  const [questionsID, setQuestionsID] = useState('');

  const settingQuestions = async (id) => {
    setIsSubmitted(prev => prev = true)
    // create a reference to the quizzes collection
    const questionsRef = collection(db, 'questions');
    const q = query(questionsRef, where('sk_quizzes_docID', '==', id));
    const querySnapshot = await getDocs(q);
    let questionsData = [];
    querySnapshot.forEach((doc) => {
      questionsData.push(doc.data());
    });

    // update the state with the questions data
    setQuestionsID(id);
    setQuestions(questionsData);
    setIsLoaded(prev => true)

  }




  return (
    <SecurePage>
      <div className={styles.wrapper}>
        {
          !addPressed ? auth.currentUser && <Quizzes
            setAddPressed={setAddPressed}
            isLoaded={isLoaded}
            setIsLoaded={setIsLoaded}
            settingQuestions={settingQuestions}
            setIsSubmitted={setIsSubmitted}
            addPressed={addPressed}
          /> : (
              !isSubmitted ? <Form
                               setAddPressed={setAddPressed}
                               setIsSubmitted={setIsSubmitted}
                               setQuestions={setQuestions}
                               setIsLoaded={setIsLoaded}
                               setAddPressed={setAddPressed}
                               setQuestionsID={setQuestionsID}
              /> : (
                  isLoaded && (questions.length !== 0) ? (<QuizCard
                    questions={questions}
                    setAddPressed={setAddPressed}
                    setIsSubmitted={setIsSubmitted}
                    questionsID={questionsID}
                  />) : <div>Loading... </div>
                )
            )}</div>
    </SecurePage>)
}

