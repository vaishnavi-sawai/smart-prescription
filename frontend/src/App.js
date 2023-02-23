import React, { useState, useEffect } from 'react';
import Registration from './components/Registration/Registration';
import Header from './components/Header/Header';

const App = () => {
const getAccount = async () =>  await window.ethereum.request({method: 'eth_accounts'})[0] || false;
const account = getAccount();

window.onload = () => {
   console.log(account ? `You're connected to: ${account}` : 'Metamask is not connected');
};

 return(
  <>
  {account? <Header/> : <Registration/>}
  </>
 )
}

export default App;