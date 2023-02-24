import React, { useState } from 'react';
// import Registration from './components/Registration/Registration';
// import Navbar  from './components/Navbar/navbar.jsx';
// import CreatePrescription from './components/CreatePrescription/CreatePrescription';
import Dashboard from './components/Dashboard';
import './App.css';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';


// <Registration/>
// <Navbar/>
// <CreatePrescription/>
// <Dashboard />
// )
const App = () => {
  return (
    <>
      <div class="root">
        <div class="background"></div>
        <div class="taskManagerParent">
          <div class="category">
            <div class="categoryTopper">
              <span class="material-icons-outlined">
                <LocalHospitalIcon />
              </span>
              <h1 class="categoryHeader headerMid">Doctor's Info</h1>
            </div>
            <div class="categoryInfo">
              <div class="categorySubHeading">First Name</div>
              <div class="categoryValue">asdf</div>
              <div class="categorySubHeading">Last Name</div>
              <div class="categoryValue">asdf</div>
              <div className="task ascend">
                <div class="taskTopper">
                  <span class="material-icons-outlined headerMid">
                    <AssignmentOutlinedIcon />
                  </span>
                  <div class="taskColor"></div>
                  <h2 class="taskHeader">Prescription!</h2>
                </div>
                <div class="taskDescription">
                  <span class="taskKeys">
                    <p>PatientID </p>
                    <p>DoctorId</p>
                    <p>Condition</p>
                    <p>Medication</p>
                  </span>
                  <span class="taskValues">
                    <p>gautam</p>
                    <p>verma</p>
                    <p>none</p>
                    <p>none</p>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App;