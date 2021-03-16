import React, {useState, useContext, useEffect, useReducer} from "react";

import {useHistory, useLocation, Link, Redirect} from "react-router-dom";
import axios  from "axios"
import {UserContext} from "./context/UserContext.js"
import Button from "@material-ui/core/Button";

import UseLocalStorageState from "./useLocalStorageState.js"
import { setAuthentication } from "./authStorage.js";





export default function Home() {

  const { userData, setUserData} = useContext(UserContext);

  // const initialState = {
  //   error: "",
  //   image: {}
  // }
  
  // const reducer = (state, action) => {
  //   switch(action.type){
  //     case "FETCH_SUCCESS":
  //         return {
  //             image: action.payload
  //         }
  
  //       case "FETCH_ERROR":
  //           return {
  //               image: {},
  //               error: "Something went wrong"
  //           }
        
  //       default:
  //           return state
  //   }
  // }
  

  const account= () => history.push("/Account");

  
  const loggedId = localStorage.getItem("userId")
  const foundUser = JSON.parse(loggedId)


  let history = useHistory();
//  const [state, dispatch] = useReducer(reducer, initialState)
//   useEffect(()=> {
//     try {

//          async function GetData(){
       
        
        
//           const response = await axios.get(`http://localhost:5000/users/getLatest/${foundUser}`)
        
//           console.log(response.data.imageUrl);
//           setAuthentication(response.data.imageUrl)

//            dispatch({type: "FETCH_SUCCESS",payload:response.data} )
//             }   
//       GetData()
//   } catch (error) {
//       dispatch({type: "FETCH_ERROR"} )
//   }
// }, []) 
  
  
  

    return (
      <div>
     { foundUser &&
     <>
        <h1>Home</h1>
    
        <Button color="primary" onClick={account}>Create profile picture</Button>
        
        </>
     }
  
    </div>
)}