import React, { Component } from 'react'
import { Route } from 'react-router'
import HomeContainer from './layouts/login/HomeContainer'
import UserInfoContainer from './layouts/UserInfo/UserInfoContainer'
import YourListingsContainer from './layouts/YourListings/YourListingsContainer';
import AllListingsContainer from './layouts/AllListings/AllListingsContainer';
import AddListingContainer from './layouts/AddListing/AddListingContainer';
import BuyListingContainer from './layouts/BuyListing/BuyListingContainer';
import NavLink from "./nav_link.js";


// Styles
import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'
import './css/style.css'


class App extends Component {
  render() {
    return (
      <main className="HolyGrail-body">
      
        <link href="https://fonts.googleapis.com/css?family=Do+Hyeon|Gugi" rel="stylesheet"></link>
        <header className="header-area clearfix">
          <nav className="amado-nav HolyGrail-nav">
            <ul className="sidebar-nav" ul style={{"listStyleType": "none"}}>

              <li  style={{"listStyleType": "none"}}>
                <NavLink to={"/Enroll"} style={{"textDecoration":"none"}} >Enroll</NavLink>
              </li>

              <li style={{"listStyleType": "none"}}>
                <NavLink to={"/UserInfo"} style={{"textDecoration":"none"}} > Account Info</NavLink>
              </li>

              <li style={{"listStyleType": "none"}}>
                <NavLink to={"/AddListing"} style={{"textDecoration":"none"}}>Add Listing</NavLink>
              </li>

              <li style={{"listStyleType": "none"}}>
                <NavLink to={"/AllListings"}style={{"textDecoration": "none"}}>All Listings</NavLink>
              </li>
              <li style={{"listStyleType": "none"}}>
                <NavLink to={"/YourListings"} style={{"textDecoration":"none"}}>Your Listings</NavLink>
              </li>
              
              <li style={{"listStyleType": "none"}}>
                <NavLink to={"/BuyListing"} style={{"textDecoration":"none"}}>Buy Listings</NavLink>
              </li>
            </ul>
          </nav>
        </header>

       
        
       
        <Route path ="/" component={HomeContainer} exact={true}/>   
        <Route path ="/Enroll" component={HomeContainer} exact={true}/>  
        <Route path='/UserInfo' component={UserInfoContainer} exact={true}/>  
        <Route path='/YourListings' component={YourListingsContainer} exact={true}/>    
        <Route path='/AllListings' component={AllListingsContainer} exact={true}/>   
        <Route path='/AddListing' component={AddListingContainer} exact={true}/> 
        <Route path='/BuyListing' component={BuyListingContainer} exact={true}/> 
        
        
        

       
      
      </main>
    );
  }
}

export default App
