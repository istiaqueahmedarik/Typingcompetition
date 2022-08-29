import { FormControl } from '@mui/material';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import axios from 'axios';
import { getAuth, signOut } from 'firebase/auth';
import { doc, getFirestore, setDoc } from "firebase/firestore";
import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { useAuthState } from 'react-firebase-hooks/auth';
import toast, { Toaster } from 'react-hot-toast';
import { useCountdownTimer } from 'use-countdown-timer';
import app from '../firebase';
function Main({data}) {
  const columns = [
    {
        name: 'Name',
        selector: row => row.fields?.name.stringValue,
        sortable: true
    },
    {
        name: 'WPM',
        selector: row => row.fields?.wpm.integerValue,
        sortable: true,
    },
    {
      name: 'Accuracy',
      selector: row => row.fields?.accuracy.integerValue,
      sortable: true
  },
];
const db = getFirestore(app);
const auth = getAuth(app);
const [user, loading, error] = useAuthState(auth);
const [typing,setType] = useState('')
const [strt,setStart] = useState(0)
const [index,setIndex] = useState(0)
const [correct,setCorrect] = useState(0);
const [wrong,setWrong] = useState(0);
const [dtlst,setList] = useState([])
const [wpm,setWpm] = useState(0)
const [acc,setAcc] = useState(0)
const [word,setWord] = useState(0)

const { countdown, start, reset, pause, isRunning } = useCountdownTimer({
    timer: 1000 * 60,
  });
useEffect(()=>{
  axios.get('https://firestore.googleapis.com/v1/projects/typingmaster-b19f6/databases/(default)/documents/record')
  .then(function (response) {
    // handle success
    console.log(response.data.documents);
    setList(response.data.documents);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  if(!loading){
    axios.get(`https://firestore.googleapis.com/v1/projects/typingmaster-b19f6/databases/(default)/documents/${user.email}/Best_record`)
  .then(function (response) {
    // handle success
    console.log(response.data);
    setWpm(response.data.fields.wpm.integerValue);
    setAcc(response.data.fields.accurate.integerValue);
    
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  }
},[])
let s = data.data.replace(/[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g,'')+' ';
const [rept,setRept] = useState(2)
const [lst,setLst] = useState(s.repeat(rept)
.split(' '))
console.log(lst)
const logout = () => {
  signOut(auth)
};
if(isRunning===false && strt!==0 && wpm<=(word)/60 && acc<=((Math.abs(correct-wrong))/correct)*100){
   setDoc(doc(db, user.email, "Best_record"), {
    wpm : (word)/60,
    accurate: ((Math.abs(correct))/word)*100
  })
  .then(function (response) {
    // handle success
    console.log(response);
    
    
  })
}
if(isRunning===false && strt!==0 && wpm<=(word)/60 && acc<=((Math.abs(correct-wrong))/correct)*100){
  setDoc(doc(db, "record", user.email), {
    wpm : (word)/60,
    accuracy: ((Math.abs(correct))/word)*100,
    name:user.displayName
  });
 
}
const handle_key_press=(e)=>{    
    if(e.code === 'Space'){
        if(isRunning!==false &&index<=lst.length-1){
          if(typing.replace(/\s+/g, '')===lst[index]){     
            setWord(word+typing.replace(/\s+/g, '').length)

            let newArr = [...lst]; // copying the old datas array
            newArr[index] = `<b className="fine" style="color:#01a801">${lst[index]}</b>` ; // replace e.target.value with whatever you want to change it to
            setLst(newArr)            
            
              setIndex(index+1)
               
            setCorrect(correct+1)
            setType('')

        }else{
            setWord(word+typing.replace(/\s+/g, '').length)
    

            let newArr = [...lst]; // copying the old datas array
            newArr[index] = `<b className="fine" style="color:#f0250a">${lst[index]}</b>` ; // replace e.target.value with whatever you want to change it to
            setLst(newArr)
            
            
            setIndex(index+1)
            
            setWrong(wrong+1)
            setType('')
        }


        }
        else if(index>lst.length-1){
          pause();
          toast('Good Job!',
                {
                  icon: '👏',
                  style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                  },
                }
              );

        }
        setType('')
      }
}
const handle_change=(e)=>{
    setType(e.target.value)
    setStart(1)
    if(strt===0){
        console.log("off")
        start();
        
    }
    else{
        console.log("on")        
    }
}
  return (
    <div className="container">
      <div className="main">
        <h1 className="header">Typing Competition</h1>     
        <Toaster
          position="top-center"
          reverseOrder={false}
        />
     
        <div className="idealtext">
        <div className="container">
        {lst.map((i,j) =><>
            <div className="txt" dangerouslySetInnerHTML={{ __html: i }} />
            <>&nbsp;</>
        </>
  )}
        </div>
        </div>
        
      <div className="input_part">
      <FormControl>
        <InputLabel htmlFor="component-outlined">Start typing</InputLabel>
        <OutlinedInput
          id="component-outlined"
          value={typing}
          onChange={(e)=>handle_change(e)}
          onKeyPress={(e)=>handle_key_press(e)}
          label="Name"
          
        />
        
      </FormControl>
      <div className="submit_button"> 
        <Button variant="contained">{countdown/1000}</Button>
        <Button variant="contained" onClick={()=>window.location.reload()}>Restart</Button>
        <Button variant="contained" color="secondary" onClick={logout}>Sign Out☹</Button>
      </div>
      <div className="submit_button" hidden={strt===0 && isRunning===false}> 
        <h1>WPM:{isRunning===false?((word)/60):"waiting"}</h1>
        <h2>Accuracy: {((Math.abs(correct))/word)*100}%</h2>        
      </div>
      
      
      
      </div>
    </div>
    <div className="table">
    <DataTable
            title="Leader Board"
            columns={columns}
            data={dtlst}
            direction="auto"
            fixedHeaderScrollHeight="300px"
            pagination
            responsive
            subHeaderAlign="right"
            subHeaderWrap
            highlightOnHover
		        pointerOnHover
            theme="dark"
            
        />
    </div>
    <div className="developer">
        Developed by <i>Syed Tamal and Istiaque Ahmed</i>
    </div>
    </div>
    
  )
}

export default Main