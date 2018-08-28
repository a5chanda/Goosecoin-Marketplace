import React, { Component } from 'react'
import { Route } from 'react-router'

import UserInfoContainer from './layouts/UserInfo/UserInfoContainer'
import NavLink from "./layouts/UserInfo/nav_link";


// Styles
import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'
import './css/style.css'

class User extends Component {
  render() {
    return (
      <main className="HolyGrail">
      <div className="App HolyGrail-Body">
         
        <link href="https://fonts.googleapis.com/css?family=Do+Hyeon|Gugi" rel="stylesheet"></link>
        <header class="header-area clearfix">
          <nav class="amado-nav">
            <ul ul style={{"list-style-type": "none"}}>
              <li className="active" style={{"list-style-type": "none"}}>
              <NavLink to={"/UserInfo"} > Account ID</NavLink>
              </li>
              <li style={{"list-style-type": "none"}}>
                <a href="shop.html" style={{"text-decoration": "none"}}>All Listings</a>
              </li>
              <li style={{"list-style-type": "none"}}>
                <a href="product-details.html" style={{"text-decoration":"none"}}>Your Listings</a>
              </li>
              <li style={{"list-style-type": "none"}}>
                <a href="cart.html" style={{"text-decoration":"none"}}>Purchased</a>
              </li>
              <li style={{"list-style-type": "none"}}>
                <a href="checkout.html" style={{"text-decoration":"none"}}>Checkout</a>
              </li>
            </ul>
          </nav>
        </header>
       
        
        <article class="HolyGrail-content">
          <Route component={UserInfoContainer}/>          
        </article>
        {/* <Route path={"/UserInfo"} component={UserInfoContainer} exact={true} /> */}

       
      </div>
      </main>
    );
  }
}

export default User
