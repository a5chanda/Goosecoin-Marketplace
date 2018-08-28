import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { AccountData, ContractData, ContractForm } from 'drizzle-react-components'
import {drizzle, drizzleStatus} from 'drizzle-react-components'
import "./../../css/style.css"
import ".//../../css/userInfo.css"


class YourListings extends Component {
  constructor(props, context) {
    super(props);
    this.contracts = context.drizzle.contracts
    this.state = {
      list:[],
      listings: []
    };
    
  }

  componentDidMount(){
    this.contracts.Classifieds.methods.getUserListings(this.props.accounts[0]).call()
    .then((result) => {
      console.log(result); 
      this.state.list = result; 
      this.state.list.map((list, index)=> {
        this.contracts.Classifieds.methods.allListings(list[index]).call()
        .then((res)=>{
          console.log(res);
  
        })})});
  }

  componentDidUpdate(prevProps) {
    Object.entries(this.props).forEach(([key, val]) =>
      prevProps[key] !== val && console.log(`Prop '${key}' changed`)
    );
    
  }
  shouldComponentUpdate(nextProps, nextState) {
    if(nextProps == nextState){
      return ;
    } 
    return false;
  }



  render(){
    if(this.props.drizzleStatus.initialized){
      console.log(this.props.accounts[0]);
    }
    
    // var list=[];
    // let data = asd();


    console.log(this.state.list);    
    let info = this.state.list.map ((index)=>{
      return(
        <div>{index}</div>
      )
    })
      
      

      
  

 
    return(
      <article className="HolyGrail-content" id="userInfo">
      <main className="container">
        {info}

      </main>
      </article>
    )

    
  }
 
}

YourListings.contextTypes = {
  drizzle: PropTypes.object
}

export default YourListings;