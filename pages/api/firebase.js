// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCp1aHVmcJzS1GcbjiLKpm30FxSuc_13LU",
  authDomain: "rubric-95790.firebaseapp.com",
  projectId: "rubric-95790",
  storageBucket: "rubric-95790.appspot.com",
  messagingSenderId: "448027274151",
  appId: "1:448027274151:web:2f50ad377d8aff4bce6482",
  measurementId: "G-G9DPWVZYG2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
