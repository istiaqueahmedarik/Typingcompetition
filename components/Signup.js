import { Button } from '@mui/material';
import Input from '@mui/material/Input';
import { getAuth } from "firebase/auth";
import Image from 'next/image';
import React, { useState } from 'react';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import app from '../firebase';
function Signup() {  
  const [email,setEmail] = useState('')
  const [pass,setPass] = useState('')
  const [err,setErr] = useState('')
  const auth = getAuth(app);
  const [
    createUserWithEmailAndPassword,
    user,
    loading,
    error,
  ] = useCreateUserWithEmailAndPassword(auth);  
  const signUp = () =>{
    createUserWithEmailAndPassword(email, pass)
    .then((userCredential) => {
        console.log("Nice")
      })
      .catch((error) => {
        const errorCode = error.code;
        setErr("Problem Error : )")
      });
    setEmail('')
    setPass('')
  }
  
  return (
    <div className="signUp_container">
        <Image src="/Sgn.svg" alt="signup" width={72} height={16} />
        <div className="signUp">
        <Input value={email}
        onChange={(e)=>setEmail(e.target.value)} placeholder="Enter Your Email:"  />
        <Input value={pass}
        onChange={(e)=>setPass(e.target.value)} placeholder="Password:" type="password"/>
        
        <Button variant="contained" onClick={signUp} disabled={email==='' || pass===''}>Sign Up🔥!</Button>     
        <b style={{color: 'red'}}>{err}</b>

    </div>
    </div>
  )
}

export default Signup