import React, { Component } from 'react'
import ContractData from '../../drizzle-react-components-master/src/ContractData'
import logo from '../../logo.png'
import "./../../css/style.css"
import ".//../../css/userInfo.css"



class AllListings extends Component {
  // constructor(props){
  //   super(props);
  //   this.state = {
  //     value : 0,
  //     'submitted': false
  //   };
  
  //   this.handleChange = this.handleChange.bind(this);
  //   this.handleSubmit = this.handleSubmit.bind(this);
  // }

  
  // getInitialState() {
  //   return { 'submitted': false };
  // }
  // handleChange(event) {
  //   this.setState({ value: event.target.value });
  // }

  // handleSubmit(event) {
  //   event.preventDefault();

  // }
  render() {
    //console.log(this.state.value);
    // let getListing = <ContractData contract="Classifieds" method="allListings" methodArgs={[this.state.value]} />
      
    
    return (
      <article className="HolyGrail-content" id="userInfo">
      <main className="container">
            <p> 
              <h3> All Listings </h3> 

              {/* <form onSubmit={this.handleSubmit}>
                     <label>
                         Listing ID:
                         <br></br>
                       <input type="text" value={this.state.value} onChange={this.handleChange} />
                     </label>
                    <input type="submit" value="Submit" />
                 </form> */}
                 {/* <ContractData contract="Classifieds" method="allListings" methodArgs={[this.state.value]} /> */}
                
                <ContractData contract="Classifieds" method="getTotalListings"/>
                {/* //<ContractData contract="Classifieds" method="getTotalListingPrices"/> */}
                
            </p>   
          

      </main>
      </article>
    )
  }
}

export default AllListings
