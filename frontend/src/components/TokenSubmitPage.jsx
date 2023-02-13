import React from 'react';

const TokenSubmitPage = () => {
  return (
    <div className="loginParent">
      <div className="loginChild mainBG">
        <h1 className="loginHeader">Custom ERC-20 Token</h1>

        <form type="text">
          <input className="input ascend"></input>
        </form>
        <button className="button ascend secondaryBG">
          Submit
        </button>
      </div>
    </div>
  )
}

export default TokenSubmitPage;