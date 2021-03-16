import logo from './logo.svg';
import './App.css';
import Axios from "axios";
import React, { useEffect, useState} from "react";
import {UserProvider} from "./context/UserContext.js"
import {Switch, Route, Redirect} from "react-router-dom"
import Home from "./Home.js"
import Login from "./Login.js"
import Account from "./Account.js";
import Register from "./Register.js"
import Navbar from "./Navbar.js"

import CheckTwo from "./CheckTwo.js";





function App() {


  
  return (
    <>
   <UserProvider>
    <Navbar/>
 
     <Switch>
       <Route exact path="/home" render={() => <Home/>}/>

       <Route exact path="/CheckTwo" render={() => <CheckTwo/>}/>
       <Route exact path="/Login" render={() => <Login/>}/>
       <Route exact path="/Register" render={() => <Register/>}/>
       <Route exact path="/Account" render={() => <Account/>}/>
       
     </Switch> 
     </UserProvider>
    </>
    
  )
}

export default App;
