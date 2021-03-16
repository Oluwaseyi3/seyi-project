import React, {createContext, useState, useEffect} from "react";


import Axios from "axios";


export const UserContext = createContext();



 export  function UserProvider(props) {

  
const [userData, setUserData] = useState({
  token: undefined,
  user: undefined
})

useEffect(() => {
  const checkLoggedIn = async () => {
    let token = localStorage.getItem("auth-token")
    let user = localStorage.getItem("user")
    if (token === null){
      localStorage.setItem("auth-token", "")
      token="";
    }
  
   
     
  
    const tokenRes = await Axios.post(
      "http://localhost:5000/users/tokenisValid", null,
      {headers: {"x-auth-token" : token}}
    )
     if (tokenRes.data){
       const userRes = await Axios.get("http://localhost:5000/users", 
       {headers: {"x-auth-token" : token}})
      
       setUserData({
         token,
         user: userRes.data
       })
      
     }
     
  }
  
  checkLoggedIn();
  },[])

 
  
    return (
        <div>
         <UserContext.Provider value={{userData, setUserData}}>
             {props.children}
         </UserContext.Provider>
        </div>
    )
}