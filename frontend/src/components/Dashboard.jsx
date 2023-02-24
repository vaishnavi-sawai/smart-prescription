import React, { useState, useEffect, setState } from 'react';
import contractABI from "../abis/contractABI.json";
const ethers = require("ethers");
const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;

const Dashboard = () => {
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

  // {/* <div>
  //   <h1>{doctor.doctorId}</h1>
  //   <h1>{doctor.firstName}</h1>
  //   <h1>{doctor.lastName}</h1>
  //   <h1>{doctor.qualification}</h1>
  //   <h1>{doctor.specialization}</h1>
  //   <h1>{doctor.prescriptionCount}</h1>
  //   <ul>
  //   {prescriptions.map((prescription) => (
  //     <li>
  //       <p>prescriptionId: {prescription.prescriptionId}</p>
  //       <p>patientId: {prescription.patientId}</p>
  //       <p>condition: {prescription.condition}</p>
  //       <p>medication: {prescription.medication}</p>
  //     </li>
  //   ))}
  // </ul>
  // </div> */}
  return (
    <>
      <div class="relative overflow-x-auto">
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">
                Product name
              </th>
              <th scope="col" class="px-6 py-3">
                Color
              </th>
              <th scope="col" class="px-6 py-3">
                Category
              </th>
              <th scope="col" class="px-6 py-3">
                Price
              </th>
            </tr>
          </thead>
          <tbody>
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                Apple MacBook Pro 17"
              </th>
              <td class="px-6 py-4">
                Silver
              </td>
              <td class="px-6 py-4">
                Laptop
              </td>
              <td class="px-6 py-4">
                $2999
              </td>
            </tr>
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                Microsoft Surface Pro
              </th>
              <td class="px-6 py-4">
                White
              </td>
              <td class="px-6 py-4">
                Laptop PC
              </td>
              <td class="px-6 py-4">
                $1999
              </td>
            </tr>
            <tr class="bg-white dark:bg-gray-800">
              <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                Magic Mouse 2
              </th>
              <td class="px-6 py-4">
                Black
              </td>
              <td class="px-6 py-4">
                Accessories
              </td>
              <td class="px-6 py-4">
                $99
              </td>
            </tr>
          </tbody>
        </table>
      </div>

    </>
  )
}

export default Dashboard;