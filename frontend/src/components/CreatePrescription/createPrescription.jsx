import React from 'react'
import './createPrescription.css'
import contractABI from "../../abis/contractABI.json";
const ethers = require("ethers");
const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;

const CreatePrescription = () => {


    const handleSubmit = async (e) =>{
        e.preventDefault();
        const data = new FormData(e.target);
        console.log(e.medication);
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract( contractAddress, contractABI, signer );
        await contract.addPrescription(
            data.get("patientId"),
            data.get("condition"),
            data.get("medication")
        );

    }

  return (
   <> 
    <div className="background header">Create Prescription</div>
    <form onSubmit={handleSubmit} className="form">

        <label>Patient Id</label>
        <br></br>
        <input type="text" name="patientId" placeholder="Enter Patient Id"></input>
        <br></br>
        <label>Condition</label>
        <br></br>
        <input type="text" name="condition" placeholder="Describe your Condition"></input>
        <br></br>
        <label>Medication</label>
        <br></br>
        <input type="text" name="medication" placeholder="Prescribed Medication"></input>
        <br></br>
        <button type="submit">Submit</button>

    </form>
    </>
  )
}

export default CreatePrescription;