// import React, { useState } from 'react';
// import contractABI from "../abis/contractABI.json";
// const ethers = require("ethers");
// const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;

// const Registration = () => {
//   const [errorMessage, setErrorMessage] = useState(null);
//   const [defaultAccount, setDefaultAccount] = useState(null);
  
//   const handleRegistration = async (event) => {
//     event.preventDefault();
//     const data = new FormData(event.target);
//     const provider = new ethers.providers.Web3Provider(window.ethereum);
//     const singer = provider.getSigner();
//     const contract = new ethers.Contract(contractAddress, contractABI, singer);
//     await contract.addDoctor(data.get("firstName"), data.get("lastName"));
//   }
//   return (
//     <div>
//       <h1>Test App</h1>
//       <form onSubmit={handleRegistration}>
//         <label>First Name</label>
//         <br></br>
//         <input type="text" id="firstName" name="firstName" placeholder="enter your first name"></input>
//         <br></br>
//         <label>Last Name</label>
//         <br></br>
//         <input type="text" name="lastName" placeholder="enter your last name"></input>
//         <br></br>
//         <label>Specialization</label>
//         <br></br>
//         <input type="text" id="specialization" name="specialization" placeholder="enter your specialization"></input>
//         <br></br>
//         <label>Qualification</label>
//         <br></br>
//         <input type="text" id="qualification" name="qualification" placeholder="enter your qualification"></input>
//         <br></br>
//         <button type="submit">Submit</button>
//       </form>
//     </div>
//   )
// }

// export default Registration;