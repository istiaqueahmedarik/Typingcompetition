import Button from '@mui/material/Button';
import { getAuth, sendEmailVerification } from 'firebase/auth';
import Image from 'next/image';
import React, { useState } from 'react';
import app from '../firebase';
function Verify() {
    const [msg,setMsg] = useState('')
    const auth = getAuth(app);
    const ver = () =>{
    sendEmailVerification(auth.currentUser)
  .then(() => {
    setMsg("Check Your Email Please 😌 If you can't find it check spam folder.Verify and reload this page")
  });
    }
  return (   

<div className="name">

        <div className="id_input">
        <Image className="id_image" src="/verify.svg" alt="signup" width={72} height={16} />

        <Button variant="contained" color="secondary" onClick={ver}>Verify your email!</Button><br/>
        <h4>{msg}</h4>

        </div>
</div>

  )
}

export default Verify