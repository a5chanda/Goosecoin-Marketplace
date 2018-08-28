import React, { Component } from 'react'
import { AccountData, ContractData, ContractForm } from 'drizzle-react-components'
import logo from '../../logo.png'
import "./../../css/style.css"
import ".//../../css/userInfo.css"


class BuyListing extends Component {

  render() {
    return (
      <article className="HolyGrail-content" id="userInfo">
      <main className="container">

            <p> 
              <h3> Buy Listing </h3>  
              <ContractForm contract="Classifieds" method="buyListingValue" labels={['id', 'Price']}/>
            </p>   
          

      </main>
      </article>
    )
  }
}

export default BuyListing
