import React from 'react';
import "./App.css"
// import Registeration from './components/registeration/register.jsx';
import DoctorInfo from './components/registeration/register.jsx';

const App = () => {
  return (
    <div className="app">
      <div className="background" />
      <DoctorInfo/>
    </div>
  )
}

export default App;