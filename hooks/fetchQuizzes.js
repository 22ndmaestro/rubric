import React, { useState, useEffect, useRef } from 'react';
import { auth, db } from '../pages/api/firebase';
import { getDocs } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext'

export default function usefetchQuizzes(){

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [quizzes, setQuizzes] = useState(null);

  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ref = collection(db, 'users');
        const docSnap = await getDocs(ref);
        if (docSnap.exists()) {
          console.log(docSnap.map((doc)=({...doc.data(),id:doc.id})))
           setQuizzes(docSnap.map((doc)=({...doc.data(),id:doc.id})))
        }else{
          console.log('oops')
        }

      } catch (err) {
        setError(() => 'Failed to load')
      } finally {
        setLoading(() => false)
      }
    }
    fetchData();
  }
    , [])

  return { loading, error, quizzes }

}