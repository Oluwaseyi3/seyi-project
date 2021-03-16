// import React, {useReducer, useEffect, useContext} from "react";

// import {Redirect} from "react-router-dom";
// import axios  from "axios"
// import {UserContext} from "./context/UserContext.js"
// import UseLocalStorageState from "./useLocalStorageState.js"
// import { setAuthentication } from "./authStorage.js";

// export const initialState = {
//     error: "",
//     image: {}
// }



// export const reducer = (state, action) => {
//     switch(action.type){
//       case "FETCH_SUCCESS":
//           return {
//               image: action.payload
//           }

//         case "FETCH_ERROR":
//             return {
//                 image: {},
//                 error: "Something went wrong"
//             }
        
//         default:
//             return state
//     }
// }

// export default function CheckTwo(props) {
//     const { userData, setUserData} = useContext(UserContext);
//     // const [userInfo, setUserInfo] = UseLocalStorageState("userId", userData)

//     const [state, dispatch] = useReducer(reducer, initialState)
  
   
    
// useEffect(()=> {


        
//         try {
  
         
             
//             async function GetData(){
              
     
             
//               const loggedId = localStorage.getItem("userId")
//               const foundUser = JSON.parse(loggedId)
//                 const response = await axios.get(`http://localhost:5000/users/getLatest/${foundUser}`)
              
                
               
               
                
                
         
//                 dispatch({type: "FETCH_SUCCESS",payload:response.data} )
             
               
//             }
          
//             GetData()
//         } catch (error) {
//             dispatch({type: "FETCH_ERROR"} )
//         }

     
 
//     }, []) 

//     return (
//      <div>
//        <img src={state.image.imageUrl}  />
//      </div>
//     )
// }