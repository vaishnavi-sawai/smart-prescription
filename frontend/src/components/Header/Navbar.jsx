import React from 'react';
import { Link } from 'react-router-dom';


const Navbar = () => {
  return (
   <nav>
    <ul>
        <li> 
            <Link to = "/"> Home Page </Link>
        </li>
        <li> 
            <Link to = "/CreatePrescription">Create Prescription </Link>  
        </li>
        <li> 
            <Link to = "/ViewPrescription">View Prescription </Link> 
        </li>
    </ul>
   </nav>
  )
}

export default Navbar;
