import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";

import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
const defaultTheme = createTheme();

export default function AdminLogin() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userdetails = await signInWithEmailAndPassword(auth, email, password);

    navigate("/adminDash", { replace: true });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={12}
          sm={8}
          md={5}
          component={Paper}
          elevation={6}
          square
          sx={{
            backgroundColor: " #4f2b64;",
            display: "felx",
            justifyContent: "center",
            alignContent: "center",
            // height: "500px",
          }}
        >
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              //   backgroundColor: "#141f40a2",
              padding: "20px",
              borderRadius: "10px",

              boxShadow: " rgba(110, 9, 63, 0.25) 0px 54px 55px, rgba(111, 10, 64, 0.12) 0px -12px 30px, rgba(59, 13, 38, 0.413) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(54, 11, 31, 0.32) 0px -3px 5px;",
              backdropFilter: "blur(10px)",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5" sx={{ color: "white" }}>
              Admin Login
            </Typography>
            <Box component="form" noValidate sx={{ mt: 1, input: { color: "white" } }}>
              {/* <TextField margin="normal" required fullWidth id="email" label="Email Address" name="email" autoComplete="email" autoFocus className="login-inp" /> */}
              <TextField fullWidth label="Email" id="fullWidth" className="inp" onChange={(e) => setEmail(e.target.value)} sx={{ color: "white" }} />
              <TextField margin="normal" required fullWidth name="password" label="Password" type="password" id="password" autoComplete="current-password" className="inp" onChange={(e) => setPassword(e.target.value)} />
              <FormControlLabel control={<Checkbox value="remember" />} label="Remember me" className="inp" />
              <Button type="submit" fullWidth variant="contained" color="secondary" sx={{ mt: 3, mb: 2 }} onClick={(e) => handleSubmit(e)}>
                Login
              </Button>
              <Grid container>
                <Grid item xs sx={{ textAlign: "center" }}>
                  <h3 href="#" variant="body2" className="loginLink">
                    Forgot password?
                  </h3>
                </Grid>
                {/* <Grid item></Grid> */}
              </Grid>
              {/* <Copyright sx={{ mt: 5 }} /> */}
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: "url(./src/images/image.png)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) => (t.palette.mode === "light" ? t.palette.grey[50] : t.palette.grey[900]),
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      </Grid>
    </ThemeProvider>
  );
}
