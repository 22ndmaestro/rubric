import { db, auth } from '../pages/api/firebase';
import {
  doc, getDoc, getDocs, collection,
  addDoc, Timestamp, setDoc,
  onSnapshot, updateDoc, arrayUnion
} from 'firebase/firestore';





export const getCollection = async (collectionId) => {
  let ref = collection(db, collectionId);
  try {
    let data = await getDocs(ref); //.where('userId', '==', auth.currentUser.id);
    return data.docs.map((doc) => ({ ...doc.data(), id: doc.id, }))
  } catch (err) {
    console.error(err)
  }
};

export const getQuestionsByQuizID = async (quizID) => {
  let ref = collection(db, quizID);
  try {
    let data = await getDocs(ref); //.where('userId', '==', auth.currentUser.id);
    return data.docs.map((doc) => ({ ...doc.data(), id: doc.id, }))
  } catch (err) {
    console.error(err)
  }
};

// Define a function that returns an array of paths for all posts in the database
export const getAllPostPaths = async () => {
  // Get a reference to the posts collection
  const postsRef = collection(db, "quizzes");
  // Get all documents in the collection
  const snapshot = await getDocs(postsRef);
  // Create an array to store the paths
  const paths = snapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }))
  // Return the array of paths
  return paths;
}

// Define a function that takes a post id and returns a promise with the post data
export const getPostById = async (postId) => {
  // Get a reference to the post document
  const postRef = doc(db, "quizzes", postId);
  // Get the document data
  const postDoc = await getDoc(postRef);
  // Return the document data
  return postDoc.data();
}





//////////////////////////////////////////////

// define a function that takes an object with the fields as parameters
export const addUser = async (newdeleted, newfirstname, newlastname, newsk_uid, newsubscribed, newsubscriptionDuration) => {
  try {
    // create a reference to the users collection
    const usersRef = collection(db, "users");
    // create a Timestamp object from the subStart date string
    const subStartTimestamp = Date.now(); //Timestamp.fromDate(Date.now());
    // add a new document with the fields to the users collection
    const docRef = await addDoc(usersRef, {
      deleted: newdeleted,
      firstname: newfirstname,
      lastname: newlastname,
      sk_uid: newsk_uid,
      subStart: subStartTimestamp,
      subscribed: newsubscribed,
      subscriptionDuration: newsubscriptionDuration,
    });
    // log the document ID
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    // handle any errors
    console.error("Error adding document: ", e);
  }
};

export const addTest = async (newName) => {
  try {
    // create a reference to the test collection
    const colRef = collection(db, "test");
    // create a Timestamp object from the current date
    //const subStartTimestamp = firebase.firestore.Timestamp.fromDate(new Date());
    // add a new document with the fields to the test collection
    const docRef = await addDoc(colRef, {
      name: newName
    });
    // log the document ID
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    // handle any errors
    console.error("Error adding document: ", e);
  }
};


export const addQuiz = async (newSubject, newTopic, newMaterial, u_id, questions) => {
  try {
    // create a reference to the users collection
    const colRef = collection(db, "quizzes");
    console.log('1');
    // create a Timestamp object from the subStart date string
    const subStartTimestamp = Date.now(); //Timestamp.fromDate(Date.now());
    console.log(`test: [${auth.currentUser.id}]`)
    console.log('2');

    if (!newMaterial) {
      newMaterial = '';
    }

    // add a new document with the fields to the  collection
    const docRef = await addDoc(colRef, {
      date: subStartTimestamp,
      deleted: false,
      material: newMaterial,
      subject: newSubject,
      topic: newTopic,
      user_uid: u_id,
      scores: [0],
      maxScore: 0,
    });
    console.log('3');
    // log the document ID
    console.log("Document written with ID: ", docRef.id);
    questions = questions.replace(/\[\[/g, "");
    questions = questions.replace(/\]\]/g, "");
    questions = questions.replace(/]\s+,/g, "],");
    questions = questions.replace(/,\s+\[/g, ",[");

    questions = questions.replace(/"\s+,/g, '",');
    questions = questions.replace(/,\s+\"/g, ',"');
    //questions = questions.replace(/"/g, '');
    questions = questions.replace(/\t/g, '');
    let arrays = questions.split('],[');
    //console.log(arrays)
    let result = [];
    for (let i = 0; i < arrays.length; i++) {
      result.push(arrays[i].split('","'));
    }
    for (let i = 0; i < result.length; i++) {
      result[i][0] = result[i][0].replace('"', '');
    }
    console.log(result)


    result.forEach(question => (addQuestion(question[0], question[1], question[2], question[3], question[4], docRef.id, u_id)
    ))
    return docRef.id;
  } catch (e) {
    // handle any errors
    console.error("Error adding document: ", e);
  }
};


export const addQuestion = async (newquestion, newcorrectanswer, newwronganswer1, newwronganswer2, newwronganswer3, newsk_quizzes_docID, newuser_id) => {
  try {
    // create a reference to the users collection
    const colRef = collection(db, "questions");

    // add a new document with the fields to the  collection
    const docRef = await addDoc(colRef, {
      correctanswer: newcorrectanswer,
      question: newquestion,
      sk_quizzes_docID: newsk_quizzes_docID,
      user_id: newuser_id,
      wronganswer1: newwronganswer1,
      wronganswer2: newwronganswer2,
      wronganswer3: newwronganswer3,
    });
    // log the document ID
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    // handle any errors
    console.error("Error adding document: ", e);
  }
};

export const updateScores = async (id, score, newMaxScore) => {
  const Doc = doc(db, "quizzes", id);
  await updateDoc(Doc, { scores: arrayUnion(score) });
  await updateDoc(Doc, { maxScore: newMaxScore });
};

export const qArray = (questions) => {
  questions = questions.replace(/\[\[/g, "");
  questions = questions.replace(/\]\]/g, "");
  questions = questions.replace(/]\s+,/g, "],");
  questions = questions.replace(/,\s+\[/g, ",[");

  questions = questions.replace(/"\s+,/g, '",');
  questions = questions.replace(/,\s+\"/g, ',"');
  //questions = questions.replace(/"/g, '');
  questions = questions.replace(/\t/g, '');
  let arrays = questions.split('],[');
  //console.log(arrays)
  let result = [];
  for (let i = 0; i < arrays.length; i++) {
    result.push(arrays[i].split('","'));
  }
  for (let i = 0; i < result.length; i++) {
    result[i][0] = result[i][0].replace('"', '');
  }
  let out = [];
  result.forEach((arr, index )=>{
    out.push({
      question: arr[0] ,
      correctanswer: arr[1],
      wronganswer1: arr[2],
      wronganswer2: arr[3],
      wronganswer3: arr[4]
      })})
  console.log(`qArray: ${out} `)
  return out;
}