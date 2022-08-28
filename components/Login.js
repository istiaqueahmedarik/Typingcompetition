import { Button } from '@mui/material';
import Input from '@mui/material/Input';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Image from 'next/image';
import React, { useState } from 'react';
import app from '../firebase';
function Login() {  
  const [email,setEmail] = useState('')
  const [pass,setPass] = useState('')  
  const [err,setErr] = useState('')
  const auth = getAuth(app);
  const signIn = () =>{
    signInWithEmailAndPassword(auth, email, pass)
    .then((userCredential) => {
      console.log("Nice")
    })
    .catch((error) => {
      const errorCode = error.code;
      setErr("Wrong password or email : )")
    });
  }
  
  return (
    <div className="signUp_container">
        <Image src="/Login.svg" alt="signup" width={72} height={16} />

      <div className="signUp">

        <Input value={email}
        onChange={(e)=>setEmail(e.target.value)} placeholder="Enter Your Email:"  />
        <Input value={pass}
        onChange={(e)=>setPass(e.target.value)} placeholder="Password:" type="password"/>
        <Button variant="contained" onClick={signIn} disabled={email==='' || pass===''}>Login!</Button>
        <b style={{color:"red"}}>{err}</b>

    </div>
    </div>
  )
}

export default Login