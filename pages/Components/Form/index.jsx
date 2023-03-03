import React, { useState, useRef } from "react";
import StyledBtn from '../StyledBtn/StyledBtn';
import styles from './Form.module.css';
import { processString } from '../../../utils/chat2local';
import { addQuiz } from '../../../utils/fireStore';
import { useAuth } from '../../../context/AuthContext'


export default function Form({ setIsSubmitted, setQuestions, setIsLoaded, setAddPressed }) {
  const { currentUser } = useAuth();
  const [inputs, setInputs] = useState({});

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitted(prev => true);

    //fetch data from server -> bot's response

    const response = await fetch('/api/handleForm', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        subject: inputs.subject,
        topic: inputs.topic,
        material: inputs.material
      })
    })

    if (response.ok) {
      //giving us response from the backend
      const data = await response.json();
      const parsedData = data.bot.trim();
      console.log(parsedData);

      //console.log(addQuiz(inputs.subject, inputs.topic, processString(parsedData)));
      const question = {
        'subject': inputs.subject,
        'topic': inputs.topic,
        'questions': parsedData
      };

      setQuestions(prev => [...prev, ...parsedData]);
      addQuiz(inputs.subject, inputs.topic, inputs.material, currentUser.uid, question.questions)
      setIsLoaded(prev=>true);
    } else {
      const err = await response.json();
      alert(err);
    }
  }
  const back =()=>{
    setInputs(prev=>prev={});
    setIsLoaded(prev=>true);
    setAddPressed(prev=>!prev);
  }



  return (
    <>
      <div className={styles.header}>
        <button 
          className={styles.backBtn}
          onClick={back}
          >{`←`}</button>
        <h1 className={styles.heading}>Create quiz</h1>
        <button className={styles.nothing} ></button>
      </div>
      <form
        className={styles.form}
      >
        <div className={styles.section}>
          <label for="subject">Subject:</label><br />
          <input
            type="text"
            className={styles.textInput}
            name="subject"
            required
            onChange={handleChange}
          />
        </div>
        <div className={styles.section}>
          <label for="topic">Topic:</label><br />
          <input
            type="text"
            className={styles.textInput}
            name="topic"
            required
            onChange={handleChange}
          />
        </div>
        <div className={styles.section}>
          <label for="material">Study material:</label><br />
          <textarea
            placeholder="Input your material"
            className={styles.textArea}
            name="material"
            onChange={handleChange}
          />
        </div>
        <StyledBtn
          variant={'formBtn'}
          title={'+ create quiz'}
          action={(e) => handleSubmit(e)}
        />
      </form>
    </>
  )
}

