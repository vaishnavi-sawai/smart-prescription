import React from 'react';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';

const DoctorRegistration = () => {
  return (
    <>
      <div class="root">
        <div class="background"></div>
        <div class="loginParent">
          <div class="loginChild mainBG">
            <div class="formHeader">
              <span class="taskValues">
                <PersonAddAltOutlinedIcon fontSize='large' />
              </span>
              <h1>Create Prescription</h1>
            </div>
            <form className="material-icons-outlined">
              <label>PatientID</label>
              <br></br>
              <input class="input" type="text" name="patientId" placeholder="Enter Patient's Id"></input>
              <br></br>
              <label>Condition</label>
              <br></br>
              <input class="input" type="text" name="condition" placeholder="Patient's Condition"></input>
              <br></br>
              <label>Medication</label>
              <br></br>
              <input class="input" type="text" name="medication" placeholder="Prescribed Medication"></input>
              <br></br>
              <br></br>
              <button class="button ascend secondaryBG" type="submit">submit</button>
            </form>
            <button class="button ascend secondaryBG" type="submit">Cancel</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default DoctorRegistration;