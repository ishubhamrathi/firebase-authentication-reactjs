import React, {useEffect, useState} from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { NavLink, useNavigate } from "react-router-dom";
import {
    auth,
    registerWithEmailAndPassword,
    signInWithGoogle
} from "../../firebase";
import "./register.css"

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();
    const register = () => {
        if (!name) alert("Please enter your name");
        registerWithEmailAndPassword(name, email, password);
    };
    useEffect(()=>{
        if(loading) return;
        if(user) navigate("/dashboard");
    }, [user, loading]);
    return (
        <div className="register">
            <div className="register__container">
                <input type="text" className="register__textBox" value={name} onChange={(e)=>setName(e.target.value)} placeholder="Full Name"/>
                <input type="text" className="register__textBox" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email address" />   
                <input type='password'  className="register__textBox" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Password"/>
                <button className="register__btn" onClick={register}>Register</button> 
                <button className="register__btn register__google" onClick={signInWithGoogle}>
                Register with Google
                </button>
                <div>Already have an account? <NavLink to="/">Login</NavLink> now.</div>   
            </div>
        </div>
    )
}

export default Register;