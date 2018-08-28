import React, { Component } from 'react'
import { AccountData, ContractData, ContractForm } from 'drizzle-react-components'
import logo from '../../logo.png'


class Home extends Component {

  render() {
    return (
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1 header">
            <img src={logo} alt="drizzle-logo" />
            <h1>Drizzle Examples</h1>
            <p>Examples of how to get started with Drizzle in various situations.</p>

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
            <p> 
              <h3> User Info </h3>  
              <ContractData contract="Classifieds" method="allUsers" methodArgs={[this.props.accounts[0]]} />
            </p>
            
          </div>

          

          <div className="pure-u-1-1">
            <h2>ComplexStorage</h2>
            <p>Finally this contract shows data types with additional considerations. Note in the code the strings below are converted from bytes to UTF-8 strings and the device data struct is iterated as a list.</p>
            <p><strong>String 1</strong>: <ContractData contract="ComplexStorage" method="string1" toUtf8 /></p>
            <p><strong>String 2</strong>: <ContractData contract="ComplexStorage" method="string2" toUtf8 /></p>
            <strong>Single Device Data</strong>: <ContractData contract="ComplexStorage" method="singleDD" />
            <br/><br/>
          </div>
        </div>

      </main>
    )
  }
}

export default Home
