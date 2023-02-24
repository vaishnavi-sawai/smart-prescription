import React, { useState, useEffect } from 'react';
import Registration from './components/Registration/Registration';
import Header from './components/Header/Header';

const App = () => {
const [loading,SetLoading] = useState(false);

const getAccount = async () =>  await window.ethereum.request({method: 'eth_requestAccounts'}).then((val)=>{
   console.log(val);
   const len = val.length;
   console.log(len);
   if(len === 1){
      SetLoading(true);
   }
});



useEffect(()=>{
getAccount();
},[])

 return(
  <>
  {loading? <Header/> : <Registration/>}
  </>
 )
}

export default App;