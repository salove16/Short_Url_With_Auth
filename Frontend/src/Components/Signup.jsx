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
  InputAdornment,
  IconButton,
} from "@mui/material";
import { useState } from "react";


import {Link,useNavigate} from "react-router-dom"
export const SignUp = () => {
    const [text, setText] = useState();
  const navigate=useNavigate()


  const handleChange = (e) => {
    const { name, value } = e.target;
   
    setText({ ...text, [name]: value });
  };


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

      let res = await fetch("http://localhost:4000/signup", {
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
    <Container component="main" sx={{m:5,mx:"auto"}} maxWidth="sm">
        <Avatar sx={{ width: 100, height: 100 ,m:5, mx:"auto"  }} >SS</Avatar>
      <Box component="form">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12}>
            <TextField
              required
              fullWidth
              id="name"
              label="name"
              name="name"
              onChange={handleChange}
              // autoComplete="family-name"
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              required
              fullWidth
              id="Email"
              label="Email"
              name="Email"
              type="email"
              onChange={handleChange}
              // autoComplete="family-name"
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              required
              fullWidth
              id="password"
              label="password"
              name="password"
              type="password"
              onChange={handleChange}
              
            /> 
            
            
           </Grid> 
        
          <Grid item xs={12} sm={12} display="flex" justifyContent="space-between">
            <Button variant="contained" type="submit" sx={{width:'25%'}}   onClick={signupReq}>SignUp</Button>
      
            <Typography >
            Already have an Account? <Link to="/login">login</Link>
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};
