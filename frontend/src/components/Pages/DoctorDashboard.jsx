import React, { useState, useEffect, setState } from 'react';
import contractABI from "../../abis/contractABI.json";

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
      secondName: doctorData[2],
      qualification: doctorData[3],
      specialization: doctorData[4],
      prescriptionCount: parseInt(String(doctorData[5]))
    })


    for (let i = 0; i < prescriptionData[0]["length"]; i++) {
      const newItem = {
        prescriptionId: String(prescriptionData[0][i]),
        patientId: prescriptionData[1][i],
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

  return (
    <>
    <div>
    </div>
      <div>
        <h1>{doctor.doctorId}</h1>
        <h1>{doctor.firstName}</h1>
        <h1>{doctor.lastName}</h1>
        <h1>{doctor.qualification}</h1>
        <h1>{doctor.specialization}</h1>
        <h1>{doctor.prescriptionCount}</h1>
        <ul>
        {prescriptions.map((prescription) => (
          <li>
            <p>prescriptionId: {prescription.prescriptionId}</p>
            <p>patientId: {prescription.patientId}</p>
            <p>condition: {prescription.condition}</p>
            <p>medication: {prescription.medication}</p>
          </li>
        ))}
      </ul>
      </div>
    </>
  )
}

export default DoctorDashboard;