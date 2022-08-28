import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import { getAuth, updateProfile } from 'firebase/auth';
import Image from 'next/image';
import React, { useState } from 'react';
import app from '../firebase';
function Name() {
const [id,setID] = useState()

  const auth = getAuth(app);
  const name = ()=>{
  updateProfile(auth.currentUser, {
    displayName: id,
  }).then(() => {
    // Profile updated!
    console.log("ye")
    window.location.reload();
  }).catch((error) => {
    // An error occurred
    console.log(error)
  });
}  
  return (
    <div className="name">

        <div className="id_input">
        <Image className="id_image" src="/name.svg" alt="signup" width={72} height={16} />

        <Input value={id}
          onChange={(e)=>setID(e.target.value)} placeholder="ID:" />
        <Button variant="contained" onClick={name} disabled={id===''}>Update</Button>
        
    </div>
    </div>
  )
}

export default Name