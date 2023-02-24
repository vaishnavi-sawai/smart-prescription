import React, { useState, useEffect, setState } from 'react';
import contractABI from "../abis/contractABI.json";
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
const ethers = require("ethers");
const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;

const DoctorDashboard = () => {
  const [doctor, setDoctor] = useState({});
  const [prescriptions, setPrescriptions] = useState([]);

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
        medication: prescriptionData[3][i]
      }
      setPrescriptions(prescriptions => [
        ...prescriptions, newItem
      ])
    }
  }

  useEffect(() => {
    fetchDoctorsInfo();
  }, []);


  const PrescriptionList = () => {
    return prescriptions.map((prescription) => (
      <div className="task ascend">
        <div class="taskTopper">
          <span class="material-icons-outlined headerMid">
            <AssignmentOutlinedIcon />
          </span>
          <div class="taskColor"></div>
          <h2 class="taskHeader">PrescriptionID: {prescription.prescriptionId}</h2>
        </div>
        <div class="taskDescription">
          <li>
            <span class="taskKeys">
              <p>Patient ID</p>
              <p>Doctor ID</p>
              <p>Condition</p>
              <p>Medication</p>
            </span>
            <span class="taskValues">
              <p>: {prescription.patientId}</p>
              <p>: {doctor.doctorId}</p>
              <p>: {prescription.condition}</p>
              <p>: {prescription.medication}</p>
            </span>
          </li>
        </div>
      </div>
    ))
  };
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
              <h1 class="categoryHeader headerMid">Doctor's Info
              </h1>
              <span class="createButton ascend">
                <span class="material-icons-outlined icon1"><BorderColorOutlinedIcon/></span>
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