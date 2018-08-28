import React, { Component } from 'react'
import { AccountData, ContractForm } from 'drizzle-react-components'
import ContractData from '../../drizzle-react-components-master/src/ContractData'
import logo from '../../logo.png'
import "./../../css/style.css"
import ".//../../css/userInfo.css"


class YourListings extends Component {

  render() {
    return (
      <article className="HolyGrail-content" id="userInfo">
      <main className="container">

            <p>               
              <h3> Your Listing IDs </h3>
              <ContractData contract="Classifieds" method="getUserListings" methodArgs={[this.props.accounts[0]]}/>
            </p>
      </main>
      </article>
    )
  }
}

export default YourListings
