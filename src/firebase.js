import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
} from "firebase/firestore";
// import auth from "firebase.auth"
const firebaseConfig = {
  apiKey: "AIzaSyBlRej4GBK0P53Rp5V1e3CB17kUix0L1X4",
  authDomain: "fir-authentication-8828a.firebaseapp.com",
  projectId: "fir-authentication-8828a",
  storageBucket: "fir-authentication-8828a.appspot.com",
  messagingSenderId: "947798850162",
  appId: "1:947798850162:web:b960b864cf7bcefd0160eb",
  measurementId: "G-73SD0NWY4N"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();


const signInWithGoogle = async() => {
    try {
        const res = await signInWithPopup(auth, googleProvider);
        const user = res.user;
        const q = query(collection(db, "users"), where("uid", "==", "user.uid"));
        const docs = await getDocs(q);
        if(docs.docs.length === 0) {
            await addDoc(collection(db, "users"), {
                uid : user.uid,
                name : user.displayName,
                authProvider :"google",
                email :user.email
            });
        }
    } catch (err){
        console.error(err);
        alert(err.message);
    }
};

const logInWithEmailAndPassword = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch(err) {
        console.log(err);
        alert(err.message);
    }
};

const registerWithEmailAndPassword = async(name, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, "users"), {
            uid : user.uid,
            name, 
            authProvider : "local",
            email
        });
    } catch (err) {
        console.log(err);
        alert(err.message);
    }
};

const sendPasswordReset = async(email) =>{
    try {
        await sendPasswordResetEmail(auth, email);
        alert("Password reset link sent!");
    } catch (err) {
        console.log(err);
        alert(err.message);
    }
};

const logout = () => {
    signOut(auth);
}

export {
    auth,
    db,
    signInWithGoogle,
    logInWithEmailAndPassword,
    registerWithEmailAndPassword,
    sendPasswordReset,
    logout,
    signInWithEmailAndPassword
  };