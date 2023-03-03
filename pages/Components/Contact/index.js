import React, { useState, useRef, useEffect } from "react";
import StyledBtn from '../StyledBtn/StyledBtn';
import styles from './Contact.module.css';
import { processString } from '../../../utils/chat2local';
import { addQuiz } from '../../../utils/fireStore';
import { useAuth } from '../../../context/AuthContext';
import emailjs from "emailjs-com";


export default function Contact() {
  const form = useRef();
  const [inputs, setInputs] = useState({});
  const [isSent, setisSent] = useState(false);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  useEffect(()=>{
    setisSent(()=>false)
  },[])



  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_7e8t4e8",
        "template_0k5xck4",
        form.current,
        "x7myiilLn5IoCgK_G"
      )
      .then(
        (result) => {
          console.log(result.text);
          setInputs(() => {})
          setisSent((prev) => !prev);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };




  return (
    <div className={styles.wrapper}>
      {isSent?<div className={styles.sent}>EMAIL SENT!!!</div>:(
      <form
        className={styles.form}
        ref={form}
      >
        <div className={styles.section}>
          <label for="email">Email:</label><br />
          <input
            type="email"
            className={styles.textInput}
            name="email"
            required
            onChange={handleChange}
          />
        </div>
        <div className={styles.section}>
          <label for="heading">Title:</label><br />
          <input
            type="text"
            className={styles.textInput}
            name="heading"
            required
            onChange={handleChange}
          />
        </div>
        <div className={styles.section}>
          <label for="content">Study content:</label><br />
          <textarea
            placeholder="How may we be of service please?..."
            className={styles.textArea}
            name="content"
            onChange={handleChange}
          />
        </div>
        <StyledBtn
          variant={'formBtn'}
          title={'Send email'}
          action={(e) => sendEmail(e)}
        />
      </form>)}
    </div>
  )
}

