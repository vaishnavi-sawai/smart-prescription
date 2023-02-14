import React from 'react';

const Registeration = () => {
  return (
    <div className="loginParent">
      <div className="loginChild mainBG">
        <h1 className="loginHeader">Register As Doctor</h1>

        <form type="text">Doctor_Id
          <input className="input ascend" placeholder="Doctor_Id"></input>
        </form>
        <form type="text">Name
          <input className="input ascend" placeholder="Name"></input>
        </form>
                <form type="text">Sepacilization
          <input className="input ascend"  placeholder="Sepacilization"></input>
        </form>
        <form type="text">Qualification
          <input className="input ascend" placeholder='Qualification'></input>
        </form>
        <form type="text">
          
        </form>
        
        <button className="button ascend secondaryBG">
          Submit
        </button>
      </div>
    </div>
  )
}

export default Registeration;