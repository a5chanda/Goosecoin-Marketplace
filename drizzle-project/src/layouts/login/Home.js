import React, { Component } from 'react'
import { AccountData, ContractData, ContractForm } from 'drizzle-react-components'
import logo from '../../logo.png'
import "./../../css/style.css"
import "./../../css/login.css"


class Home extends Component {

  render() {
    return (
      <article class="HolyGrail-content">
      <main className="container">

        <div className="pure-g">
          <div className="pure-u-1-1 header">
            <img src={logo} alt="drizzle-logo" />
            <h1>Goosecoin Marketplace</h1>
            <p>This app is meant for decentralized classifieds</p>

            <br/><br/>
          </div>

          <div className="pure-u-1-1">
            <h2>Active Account</h2>
            <AccountData accountIndex="0" units="ether" precision="3" />
            <br/><br/>
          </div>

          <div className="pure-u-1-1">
            <h2>Enroll User</h2>
            <p> Form for enrolling user into Classifieds Contract.</p>
            {/* <p><strong>Total Supply</strong>: <ContractData contract="TutorialToken" method="totalSupply" methodArgs={[{from: this.props.accounts[0]}]} /> <ContractData contract="TutorialToken" method="symbol" hideIndicator /></p>
            <p><strong>My Balance</strong>: <ContractData contract="TutorialToken" method="balanceOf" methodArgs={[this.props.accounts[0]]} /></p> */}
            <h3>Enroll User</h3>
            <ContractForm contract="Classifieds" method="enrollUser" labels={['First Name', 'Last Name', 'Email Address']} />
            <br/><br/>
            {/* <p> 
              <h3> User Info </h3>  
              <ContractData contract="Classifieds" method="allUsers" methodArgs={[this.props.accounts[0]]} />
            </p>    */}
          </div>

        </div>
      </main>
      </article>
    )
  }
}

export default Home
