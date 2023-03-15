import React, { useState, useEffect, setState } from 'react';
import contractABI from "../abis/contractABI.json";
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import PostAddOutlinedIcon from '@mui/icons-material/PostAddOutlined';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import FindInPageOutlinedIcon from '@mui/icons-material/FindInPageOutlined';

const ethers = require("ethers");
const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;

const DoctorDashboard = () => {
  const [doctor, setDoctor] = useState({});
  const [prescriptions, setPrescriptions] = useState([]);
  const [toggleState, setToggleState] = useState(0);
  const [submitProcess, setSubmitProcess] = useState("Submit");
  const toggleTab = (index) => {
    setToggleState(index);
  };

  async function fetchDoctorsInfo() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractABI, signer);
    const doctorData = await contract.getDoctor();
    const prescriptionData = await contract.getDoctorPrescriptions();
    setDoctor({
      doctorId: doctorData[0],
      firstName: doctorData[1],
      lastName: doctorData[2],
      qualification: doctorData[3],
      specialization: doctorData[4],
      prescriptionCount: parseInt(String(doctorData[5]))
    })


    for (let i = 0; i < prescriptionData[0]["length"]; i++) {
      const newItem = {
        prescriptionId: String(prescriptionData[0][i]),
        patientId: String(prescriptionData[1][i]),
        condition: prescriptionData[2][i],
        medication: prescriptionData[3][i],
        // timestamp: prescriptionData[4][i]
      }
      setPrescriptions(prescriptions => [
        ...prescriptions, newItem
      ])
    }
  }

  const handleSubmit = async (event) => {
    setSubmitProcess("Processing...");
    event.preventDefault();
    const data = new FormData(event.target);
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractABI, signer);
    const createdTimestamp = new Date().toLocaleString() + "";
    await contract.addPrescription(
      data.get("patientId"),
      data.get("condition"),
      data.get("medication"),
      createdTimestamp
    );
    toggleTab(0);
    setSubmitProcess("Submit");
  }

  const handleCancel = () => {
    setSubmitProcess("Submit");
    toggleTab(0);
  }

  useEffect(() => {
    fetchDoctorsInfo();
  }, []);

  const StringToList = ({ itemStr }) => {
    const itemList = itemStr.split(", ");
    return itemList.map((eachItem) => (
      <li><big style={{ color: getPastelColor(), fontWeight: "900" }}>&bull;</big> {eachItem}</li>
    ))
  }

  const getPastelColor = () => {
    const hue = Math.floor(Math.random() * 360);
    const pastel = "hsl(" + hue + ", 100%, 80%)";
    return pastel;
  }

  const PrescriptionList = () => {
    return prescriptions.map((prescription) => (
      <div className="task ascend">
        <div class="taskTopper">
          <span class="material-icons-outlined headerMid">
            <AssignmentOutlinedIcon />
          </span>
          <div style={{
            width: "4px",
            borderRadius: "6px",
            backgroundColor: getPastelColor()
          }}></div>
          <h2 class="taskHeader">PrescriptionID: {prescription.prescriptionId}</h2>
        </div>
        <div class="taskDescription">
          <span class="taskKeys">
            <p>Patient ID</p>
            <p>Doctor ID</p>
            <p>Created Timestamp</p>
            <p>Condition</p>
            <p>Medication</p>
          </span>
          <span class="taskValues">
            <p>: &emsp;{prescription.patientId}</p>
            <p>: &emsp;{doctor.doctorId}</p>
            {/* <p>: &emsp;{prescription.createdTimestamp}</p> */}
            <p><ul class="inlineList">:<StringToList itemStr={prescription.condition} /></ul></p>
            <p><ul class="inlineList">:<StringToList itemStr={prescription.medication} /></ul></p>
          </span>
        </div>
      </div>
    ))
  };
  return (
    <>
      <div class="root">
        <div class="background"></div>
        <div className={toggleState === 1 ? "services__modal active-modal" : "services__modal"}>
          <div class="loginParent">
            <div class="loginChild mainBG">
              <div class="formHeader">
                <span class="taskValues">
                  <PostAddOutlinedIcon fontSize='large' />
                </span>
                <h1>Create Prescription</h1>
              </div>
              <form onSubmit={handleSubmit} className="material-icons-outlined">
                <label>PatientID</label>
                <br></br>
                <input class="input" type="text" name="patientId" placeholder="Enter Patient's Id"></input>
                <br></br>
                <label>Condition</label>
                <br></br>
                <input class="input" type="text" name="condition" placeholder="Patient's Condition comma seperated"></input>
                <br></br>
                <label>Medication</label>
                <br></br>
                <input class="input" type="text" name="medication" placeholder="Prescribed Medication comma seperated"></input>
                <br></br>
                <br></br>
                <button class="button ascend secondaryBG" type="submit">{submitProcess}</button>
              </form>
              <button onClick={handleCancel} class="button ascend secondaryBG" type="submit">Cancel</button>
            </div>
          </div>
        </div>
        <div class="taskManagerParent">
          <div class="category">
            <div class="categoryTopper">
              <span class="material-icons-outlined">
                <LocalHospitalIcon />
              </span>
              <h1 class="categoryHeader headerMid">Doctor's Info
              </h1>
              <span class="createButton ascend">
                <span class="material-icons-outlined icon1"><FindInPageOutlinedIcon /></span>
                <h1>View Prescription
                </h1>
              </span>
              <span class="createButton ascend" onClick={() => toggleTab(1)}>
                <span class="material-icons-outlined icon1"><BorderColorOutlinedIcon /></span>
                <h1>Create Prescription
                </h1>
              </span>
            </div>
            <div class="categoryTopper1">
              <div class="categorySubHeading">DoctorID
                <div class="categoryValue">{doctor.doctorId}</div>
              </div>
              <div class="categorySubHeading">First Name
                <div class="categoryValue">{doctor.firstName}</div>
              </div>
              <div class="categorySubHeading">Last Name
                <div class="categoryValue">{doctor.lastName}</div>
              </div>
              <div class="categorySubHeading">Qulification
                <div class="categoryValue">{doctor.qualification}</div>
              </div>
              <div class="categorySubHeading">Specialization
                <div class="categoryValue">{doctor.specialization}</div>
              </div>
              <div class="categorySubHeading">Prescriptions Count
                <div class="categoryValue">{doctor.prescriptionCount}</div>
              </div>
            </div>
            <div class="categoryInfo">
              <PrescriptionList />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default DoctorDashboard;