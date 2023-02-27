import React, { useState, useEffect } from 'react';
import DoctorRegistration from './components/DoctorRegistration';
import DoctorDashboard from './components/DoctorDashboard';
import './App.css';

const App = () => {
const [loading,SetLoading] = useState(false);

const getAccount = async () =>  await window.ethereum.request({method: 'eth_requestAccounts'}).then((val)=>{
   console.log(val);
   const len = val.length;
   console.log(len);
   if(len === 1){
      SetLoading(true);
      console.log('Registered Succesfully');
   }
});

useEffect(()=>{
getAccount();
},[])

 return(
  <>
  {loading? <DoctorDashboard/> : <DoctorRegistration/>}
  </>
 )
}

export default App;