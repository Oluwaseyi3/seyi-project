import React, {useContext, useEffect, useState} from "react";
import {UserContext} from "./context/UserContext.js"
import {Redirect} from "react-router-dom";
import { useMutate } from "restful-react";
import {Image} from "cloudinary-react"
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import { setAuthentication } from "./authStorage.js";
import Input from "@material-ui/core/Input";
import axios  from "axios"
import withStyles from "@material-ui/core/styles/withStyles";
import styles from "./styles/FormStyles";
import { useHistory} from "react-router-dom"


 function Account(props) {

    const { userData} = useContext(UserContext);
    const history = useHistory();
    const { classes } = props;
    
// const url = "	https://api.cloudinary.com/v1_1/seyi-codes" 
// const preset = "insta-clone"
const [image, setImage] = useState("");
const [fileData, setFileData] = useState("");
const [images, setFile] = useState("");
const home= () => history.push("/home");

const handleFileChange= ({target}) => {
 
  setFileData(target.files[0])
  setFile(target.value);
}

const handleSubmit = async (e) => {
  e.preventDefault();
  const formdata = new FormData();
  try {
formdata.append("image", fileData)

const result = await axios.post(`http://localhost:5000/users/upload/${userData.user.id}`, formdata);
 const display = result.data.imageUrl
//  console.log(display);
 setImage(display)
 
} catch (error) {
  console.log(error)
}
  
}
const loggedId = localStorage.getItem("userId")
const foundUser = JSON.parse(loggedId)
    return(
     <div>
  
{foundUser ?
    (
    <>
     <h1>Set up your Profile</h1>

        
        <form onSubmit={handleSubmit} encType="multipart/form-data">
      
         <Input
          type="file"
         accept="image/*"
         value={images}
         onChange={handleFileChange}
        placeholder="upload image"
        name="image"
           />
            <Button
              
              variant='contained'
              type='submit'
              color='primary'
            
            >
          Upload
            </Button>
       
        </form>
      

        <Button color="inherit" onClick={home}>Back to home</Button>
    </>


) : (
    <Redirect to="/Login"/>
     ) }
     </div>
    )
}


 
 



export default withStyles(styles)(Account)


// const [fileData, setFileData] = useState("");
// const [images, setFile] = useState("");

// const handleFileChange= ({target}) => {
 
//   setFileData(target.files[0])
//   setFile(target.value);
// }

// const handleSubmit = async (e) => {
//   e.preventDefault();
//   const formdata = new FormData();

// formdata.append("image", fileData)

// await Axios.post("http://localhost:5000/api/image", formdata)
//   .then((res) => console.log("res", res.data))
  
//   .catch((error) => console.log(error))
// }
