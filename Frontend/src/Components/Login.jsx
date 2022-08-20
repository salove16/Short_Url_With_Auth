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

import { useState } from "react";
import { useCookies } from "react-cookie";

import { Link,useNavigate } from "react-router-dom";
import { fontSize } from "@mui/system";





export const Login = () => {
  const [text, setText] = useState();
  const [cookies, setCookie] = useCookies(['token']);

  const navigate=useNavigate()




  const handleChange = (e) => {
    const { name, value } = e.target;
    // console.log(name,value)
    setText({ ...text, [name]: value });
  };
  // console.log(text)

  const loginReq = async (e) => {
    try {
        e.preventDefault()
        // console.log(text)
      const { Email, password } = text;
      let payload;
      if (Email && password) {
        payload = {
          email: Email,
          password: password,
        };
      }
      // console.log(payload);

      let res = await fetch("https://short-url-supply-note.herokuapp.com/login", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(payload),
      });
   
      let data = await res.json();
   
 
      if(data.token){
        setCookie('token', {token:data.token,user:data.user.userName});
        // alert("Login successful")
      navigate("/url_short");
      }
    } catch (error) {
      alert("Your user ID or password is incorrect")
    }
  };

  return (
    <div style={{display:'flex',flexDirection:'row'}}>
      <div style={{height:'90%'}}>
        <img style={{width:"82%"}} src={supplynote_login} alt="" />
      </div>
      <Container component="main" sx={{ m: 3, mx: "auto" ,flex:1,marginTop:"5%" ,marginRight:"10%"}} maxWidth="sm">
      {/* <Avatar sx={{ width: 100, height: 100, m: 5, mx: "auto" }}>SS</Avatar> */}
      <Typography sx={{textAlign:'center', fontSize:34}}>Sign In to SupplyNote</Typography>
      <Typography sx={{textAlign:'center', fontSize:20 ,color:'#B3B3B3', marginBottom:'15%'}}>Enter Your Credentials</Typography>
      <Box component="form">
        <Grid container spacing={5}>
          <Grid item xs={12} sm={12} sx={{display:'flex' ,justifyContent:'center'}}>
            <AccountCircleIcon sx={{marginRight:"6%",marginTop:"8%"}}/>
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
              onClick={loginReq}
            >
              Login
            </Button>

            <Typography>
              Dont't have an Account? <Link to="/signup">signup</Link>
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Container>
    </div>
    
  );
};
