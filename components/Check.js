import { Button } from '@mui/material';
import React, { useState } from 'react';
import Login from './Login';
import Signup from './Signup';


function Check() {
  const [situation,setSit] = useState(true)  
  return (
    <div className="check">
        <div className="situation">
    {situation===true?<Login/>:<Signup/>}
    <Button variant="contained" color="secondary" onClick={()=>setSit(!situation)}>{situation===true?<>New Here? Please Create a account</>:<>Already has an account? Please Login</>}</Button>

    </div>
    </div>
  )
}

export default Check