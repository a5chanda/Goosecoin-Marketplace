import React, { Component } from 'react'
import { AccountData, ContractData, ContractForm } from 'drizzle-react-components'
import logo from '../../logo.png'
import "./../../css/style.css"
import ".//../../css/userInfo.css"


class AddListing extends Component {

  render() {
    return (
      <article className="HolyGrail-content" id="userInfo">
      <main className="container">


            <p> 
              <h3> Add Listing </h3>  
              <ContractForm contract="Classifieds" method="addListing" labels={['Listing Name', 'Description', 'Price', "Date"]}/>
            </p>   
          

      </main>
      </article>
    )
  }
}

export default AddListing
