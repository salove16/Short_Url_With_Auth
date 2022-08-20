import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Grid,
  Box,
  Typography,
  Container,
  Paper,
} from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HttpsIcon from '@mui/icons-material/Https';
import supplynote_login from "../../assets/img/supplynote_login.png"
import EmailIcon from '@mui/icons-material/Email';
import { useState } from "react";
import { useCookies } from "react-cookie";

import { Link,useNavigate } from "react-router-dom";
import { fontSize } from "@mui/system";





export const SignUp = () => {
  const [text, setText] = useState();

  const navigate=useNavigate()




  const handleChange = (e) => {
    const { name, value } = e.target;
    // console.log(name,value)
    setText({ ...text, [name]: value });
  };
  // console.log(text)

  const signupReq = async (e) => {
    try {
        e.preventDefault()
        // console.log(text)
      const { name,Email, password } = text;
      let payload;
      if (name && Email && password) {
        payload = {
            userName:name,
          email: Email,
          password: password,
        };
      }
      // console.log(payload);

      let res = await fetch("https://short-url-supply-note.herokuapp.com/signup", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(payload),
      });
    //   console.log(res)
      let data = await res.json();
      // console.log(data,"456214521542")
      if(data.message=="Email already exists"||data.message=="undefined"||payload==undefined){
        alert("This Email is alreday in use by another account")
      }else{
        alert("SignUp Successful")
        navigate("/login");
      }
    } catch (error) {
      console.log({ message: error.message });
    }
  };

  return (
    <div style={{display:'flex',flexDirection:'row'}}>
      <div style={{height:'90%'}}>
        <img style={{width:"82%"}} src={supplynote_login} alt="" />
      </div>
      <Container component="main" sx={{ m: 3, mx: "auto" ,flex:1,marginTop:"5%" ,marginRight:"10%"}} maxWidth="sm">
      {/* <Avatar sx={{ width: 100, height: 100, m: 5, mx: "auto" }}>SS</Avatar> */}
      <Typography sx={{textAlign:'center', fontSize:34}}>Sign Up to SupplyNote</Typography>
      <Typography sx={{textAlign:'center', fontSize:20 ,color:'#B3B3B3', marginBottom:'15%'}}>Enter Your Credentials</Typography>
      <Box component="form">
        <Grid container spacing={5}>
        <Grid item xs={12} sm={12} sx={{display:'flex' ,justifyContent:'center'}}>
        <AccountCircleIcon sx={{marginRight:"6%",marginTop:"8%"}}/>
            <TextField
              required
              fullWidth
              id="name"
              label="name"
              name="name"
              variant="standard"
              onChange={handleChange}
              // autoComplete="family-name"
            />
          </Grid>
          <Grid item xs={12} sm={12} sx={{display:'flex' ,justifyContent:'center'}}>
            
            <EmailIcon sx={{marginRight:"6%",marginTop:"8%"}}/>
            <TextField
              required
              fullWidth
              id="Email"
              label="Email"
              name="Email"
              type="email"
              variant="standard"
              // autoComplete="family-name"
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={12} sx={{display:'flex' ,justifyContent:'center'}}>
          <HttpsIcon sx={{marginRight:"6%",marginTop:"8%"}}/>
            <TextField
              required
              fullWidth
              id="name"
              label="password"
              name="password"
              type="password"
              variant="standard"
              onChange={handleChange}
            />
          </Grid>

          <Grid
            item
            xs={12}
            sm={12}
            display="flex"
            justifyContent="space-between"
          >
            <Button
              variant="contained"
              type="submit"
              sx={{width:'25%',marginLeft:'10%'}}
              onClick={signupReq}
            >
              SignUp
            </Button>

            <Typography>
              Dont't have an Account? <Link to="/login">login</Link>
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Container>
    </div>
    
  );
};
