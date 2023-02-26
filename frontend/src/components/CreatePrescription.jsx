// import React from 'react';
// import contractABI from "../abis/contractABI.json";
// import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
// const ethers = require("ethers");
// const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;

// const CreatePrescription = () => {
//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     const data = new FormData(event.target);
//     const provider = new ethers.providers.Web3Provider(window.ethereum);
//     const signer = provider.getSigner();
//     const contract = new ethers.Contract(contractAddress, contractABI, signer);
//     await contract.addPrescription(
//       data.get("patientId"),
//       data.get("condition"),
//       data.get("medication")
//     );
//   }

//   {/* <div className="backgroundHeader">Create Prescription</div>
//   <form onSubmit={handleSubmit} className="form">
//     <label>Patient Id</label>
//     <br></br>
//     <input type="text" name="patientId" placeholder="Enter Patient Id"></input>
//     <br></br>
//     <label>Condition</label>
//     <br></br>
//     <input type="text" name="condition" placeholder="Describe your Condition"></input>
//     <br></br>
//     <label>Medication</label>
//     <br></br>
//     <input type="text" name="medication" placeholder="Prescribed Medication"></input>
//     <br></br>
//     <button type="submit">Submit</button>
//   </form> */}
//   return (
//     <>
//       <div class="root">
//         <div class="background"></div>
//         <div class="loginParent">
//           <div class="loginChild mainBG">
//             <div class="formHeader">
//               <span class="taskValues">
//               <PersonAddAltOutlinedIcon fontSize='large' />
//               </span>
//               <h1>Doctor Registration</h1>
//             </div>
//             <form onSubmit={handleSubmit} className="material-icons-outlined">
//               <label>PatientID</label>
//               <br></br>
//               <input class="input" type="text" name="patientId" placeholder="Enter Patient's Id"></input>
//               <br></br>
//               <label>Condition</label>
//               <br></br>
//               <input class="input" type="text" name="condition" placeholder="Describe your Condition"></input>
//               <br></br>
//               <label>Medication</label>
//               <br></br>
//               <input class="input" type="text" name="medication" placeholder="Prescribed Medication"></input>
//               <br></br>
//               <br></br>
//               <button class="button ascend secondaryBG" type="submit">Submit</button>
//             </form>
//             <button class="button ascend secondaryBG" type="submit">Cancel</button>
//           </div>
//         </div>
//       </div>
//     </>
//   )
// }

// export default CreatePrescription;