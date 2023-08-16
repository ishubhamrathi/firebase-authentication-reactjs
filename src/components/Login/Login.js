import React, {useEffect, useState} from "react";
import { NavLink, useNavigate} from "react-router-dom";
import { auth, signInWithEmailAndPassword, signInWithGoogle } from "../../firebase";
import {useauthState} from "react-firebase-hooks/auth";
import "./login.css"

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, loading , error ] = useState("");
    const navigate = useNavigate();

    useEffect(()=>{
        if(loading) {
            return;
        }
        if (user) navigate("/dashboard");
    },[user,loading]);

    return (
    <div className='login'>
        <div className='login__container'>
            <input type="text" className='login__textBox' value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='Email Address'/>
            <input type="password" className='login__textBox' value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='Password'/>
            <button className='login__btn' onClick={()=> signInWithEmailAndPassword(email, password)}>Login</button>
            <button className='login__btn login__google' onClick={signInWithGoogle}>Login with Google</button>
            <div>
                <NavLink to="/reset">Forgot Password</NavLink>
            </div>
            <div>
                Don't have an account? <NavLink to="/register">Register</NavLink> now.   
            </div>
        </div>
    </div>
  
)
}

export default Login