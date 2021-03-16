import React, {useContext, useEffect, useReducer, useState} from 'react';
import { useHistory} from "react-router-dom"
import {UserContext} from "./context/UserContext.js"
import {Redirect} from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import UseLocalStorageState from "./useLocalStorageState.js"
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Account from "./Account.js"
import CheckTwo from "./CheckTwo.js"
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function ButtonAppBar() {
  const history = useHistory();
  const { userData, setUserData} = useContext(UserContext);
  const classes = useStyles();
  const register= () => history.push("/register");
  const login= () => history.push("/login");
  const home= () => history.push("/home");
  const account= () => history.push("/account");

  const logout = ()=> {
    localStorage.clear()
    setUserData({
      token: undefined,
      user: undefined,
      
    });
    history.push("/login");
    localStorage.setItem("auth-token", "")

  
  }
  const loggedId = localStorage.getItem("userId")
  const foundUser = JSON.parse(loggedId)
  console.log(foundUser);
  
  const initialState = {
    error: "",
    image: {}
}
const reducer = (state, action) => {
  switch(action.type){
    case "FETCH_SUCCESS":
        return {
            image: action.payload
        }

      case "FETCH_ERROR":
          return {
              image: {},
              error: "Something went wrong"
          }
      
      default:
          return state
  }
}
  const [state, dispatch] = useReducer(reducer, initialState)






  useEffect(()=> {
    try {

         async function GetData(){
       
        
          const response = await axios.get(`http://localhost:5000/users/getLatest/${foundUser}`)
        
          console.log(response.data.imageUrl);
          // setAuthentication(response.data.imageUrl)

           dispatch({type: "FETCH_SUCCESS",payload:response.data} )
            }   
      GetData()
  } catch (error) {
      dispatch({type: "FETCH_ERROR"} )
  }
}, []) 

 

 

       

  // const picture = localStorage.getItem("user2")
  // const foundPicture = JSON.parse(picture)


 

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            News
          </Typography>
         {  !foundUser &&
              
         <>
          <Button color="inherit" onClick={register}>Register</Button>
          <Button color="inherit" onClick={login}>Login</Button>
        </>
      }   
      {  foundUser &&
         <>
          <Button color="inherit" onClick={logout}>Log Out</Button>
              <img src={state.image.imageUrl} style={{"height": "4rem"}}/>
          </>}
          
        
            
      
        
        </Toolbar>
      </AppBar>
    </div>
  );
}