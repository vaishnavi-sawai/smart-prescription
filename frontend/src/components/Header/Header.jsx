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
    <Route exact path = "/CreatePrescription">
    <CreatePrescription/>
    </Route>
    <Route exact path = "/ViewPrescription">
    <ViewPrescription/>
    </Route>
    <Route path ="*">
      <h1>This page does not exits, try going back to the Home Page!</h1>
    </Route>
 </Switch>
</Router>
</>
  )
}

export default Header