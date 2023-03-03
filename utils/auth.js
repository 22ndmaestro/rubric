import { auth, googleProvider } from '../pages/api/firebase';
import {addUser, addTest} from './fireStore'
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut
} from 'firebase/auth';


export const signIn = async (e, inputs) => {
  e.preventDefault();
  try {
    await createUserWithEmailAndPassword(auth, inputs.email, inputs.password);
    
  } catch (err) {
    console.error(err)
  }
};

export const signInWithGoogle = async () => {
  try {
    await signInWithPopup(auth, googleProvider);
    //addTest('banana')
  } catch (err) {
    console.error(err)
  }
};


export const logout = async () => {
  try {
    await signOut(auth);
  } catch (err) {
    console.error(err)
  }
  //console.log('logging out!');
};

export const user = auth;