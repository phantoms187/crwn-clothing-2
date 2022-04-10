import { initializeApp } from 'firebase/app';
import { 
    getAuth, 
    signInWithRedirect,
    signInWithPopup,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from 'firebase/auth'

import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
} from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC5zUh1cyvRH_hSvcBhm9nCHT7gg1zEx50",
    authDomain: "crwn-clothing-db-8d06e.firebaseapp.com",
    projectId: "crwn-clothing-db-8d06e",
    storageBucket: "crwn-clothing-db-8d06e.appspot.com",
    messagingSenderId: "471191316964",
    appId: "1:471191316964:web:21798dd465760be14fbff1"
  };
  
  const firebaseApp = initializeApp(firebaseConfig);

  const googleProvider = new GoogleAuthProvider();
  
  googleProvider.setCustomParameters({
      prompt: "select_account"
  });

  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
  export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

  export const db = getFirestore();

  export const createUserDocumentFromAuth = async (userAuth, additionalInformation) => {
      if(!userAuth) return;

      const userDocRef = doc(db, 'users', userAuth.uid);

      const userSnapshot = await getDoc(userDocRef);

      if(!userSnapshot.exists()) {
          const { displayName, email } = userAuth;
          const createdAt = new Date();

          try {
              await setDoc(userDocRef, {
                  displayName,
                  email,
                  createdAt,
                  ...additionalInformation
              });
          } catch (error) {
              console.log('error creating the user', error.message);
          }
      }

      return userDocRef;
  };

  export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password);
  };

  export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;

    return await signInWithEmailAndPassword(auth, email, password);
  }

  export const signOutUser = async () => await signOut(auth);

  export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback)