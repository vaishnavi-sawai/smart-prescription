import React from 'react'
import CreatePrescription from '../Pages/createPrescription'
import ViewPrescription from '../Pages/ViewPrescription'
import DoctorDashboard from '../Pages/DoctorDashboard'

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Navbar from './Navbar.jsx'

const Header = () => {
  return (
<>
<Router>
  <Navbar/>
  <Switch>
    <Route exact path = "/">
     <DoctorDashboard/>
     </Route>
    <Route  path = "/CreatePrescription">
    <CreatePrescription/>
    </Route>
    <Route  path = "/ViewPrescription">
    <ViewPrescription/>
    </Route>
    <Route path ="*">
      <p>This page does not exits, try going back to the Home Page!</p>
    </Route>
 </Switch>
</Router>
</>
  )
}

export default Header