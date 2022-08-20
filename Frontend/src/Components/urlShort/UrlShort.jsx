import React from "react";
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
import { useCookies } from "react-cookie";
import { Navigate } from "react-router-dom";
import { useEffect } from "react";
export const UrlShort = () => {
  const [text, setText] = useState();
  const [token] = useCookies(["token"]);
  console.log(token)
const [url,setUrl]=useState([])
useEffect(()=>{
  getUrlData()
},[])
  if (!token.token) {
    return <Navigate to={"/login"} />;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;

    setText({ ...text, [name]: value });
  };
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      // console.log(text)
      const { InputMainURL, name } = text;
      let payload;
      if (InputMainURL && name) {
        payload = {
          mainUrl: InputMainURL,
          name: name,
        };
      }
      console.log(payload, token.token);

      let res = await fetch("http://localhost:4000/url", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${token.token.token}`,
        },
        body: JSON.stringify(payload),
      });
      //   console.log(res)
      let data = await res.json();
      console.log(data.url, "456214521542");
      getUrlData()
    } catch (error) {
      console.log({ message: error.message });
    }
  };

  const getUrlData=async()=>{
  try {
    let res = await fetch("http://localhost:4000/url", {
      method: "GET",
      headers: {
     
        authorization: `Bearer ${token.token.token}`,
      }
    });
    //   console.log(res)
    let data = await res.json();
    setUrl(data)
    console.log(data)
   
  } catch (error) {
    
  }
  }

  return (
    <div>
      <Container component="main" sx={{ m: 5, mx: "auto" }} maxWidth="sm">
        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <TextField
                required
                fullWidth
                id="name"
                label="Input Main URL"
                name="InputMainURL"
                onChange={handleChange}
                // autoComplete="family-name"
              />
            </Grid>
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

            <Grid
              item
              xs={12}
              sm={12}
              display="flex"
              justifyContent="space-between"
            >
              <Button variant="contained" type="submit" sx={{ width: "25%" }}>
                Create
              </Button>
            </Grid>
          </Grid>
        </Box>
        
       {
        
           url.length>0 ? 
          url.map((e)=>(
            <div  key={e._id}><a style={{color:new Date().getTime()-(+e.created)>=1000*3600*48?'grey':'green'}}  href={`http://localhost:4000/url/${e.name}`} target="_blank">http://localhost:4000/url/{e.name}</a></div>
          )):null
        }
        
      </Container>
    </div>
  );
};
