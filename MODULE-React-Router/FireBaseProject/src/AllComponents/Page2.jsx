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

export default function Page2() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();
  function Copyright(props) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {"Copyright © "}
        <Link color="inherit" href="https://mui.com/">
          Your Website
        </Link>{" "}
        {new Date().getFullYear()}
        {""}
      </Typography>
    );
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const userdetails = await signInWithEmailAndPassword(auth, email, password);
    const user = userdetails.user;
    console.log(user);
    const userdoc = await getDoc(doc(db, "Data", user.uid));
    console.log(userdoc);
    if (userdoc.exists) {
      alert(`welcome ${userdoc.data().name}`);
      navigate("/dashbord", { replace: true });
    }
  };

  // TODO remove, this demo shouldn't need to reset the theme.

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
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
        <Grid
          item
          xs={12}
          sm={8}
          md={5}
          component={Paper}
          elevation={6}
          square
          sx={{
            backgroundColor: "#4f2b64",
            display: "felx",
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              backgroundColor: "#141f40a2",
              padding: "20px",
              borderRadius: "10px",
              // backdropFilter: "blur(10px)",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5" sx={{ color: "white" }}>
              Sign in
            </Typography>
            <Box component="form" noValidate sx={{ mt: 1, input: { color: "white" } }}>
              {/* <TextField margin="normal" required fullWidth id="email" label="Email Address" name="email" autoComplete="email" autoFocus className="login-inp" /> */}
              <TextField fullWidth label="Email" id="fullWidth" className="inp" onChange={(e) => setEmail(e.target.value)} sx={{ color: "white" }} />
              <TextField margin="normal" required fullWidth name="password" label="Password" type="password" id="password" autoComplete="current-password" className="inp" onChange={(e) => setPassword(e.target.value)} />
              <FormControlLabel control={<Checkbox value="remember" />} label="Remember me" className="inp" />
              <Button type="submit" fullWidth variant="contained" color="secondary" sx={{ mt: 3, mb: 2 }} onClick={(e) => handleSubmit(e)}>
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <h3 href="#" variant="body2" className="loginLink">
                    Forgot password?
                  </h3>
                </Grid>
                <Grid item>
                  <h3 onClick={() => navigate("/", { replace: true })} className="loginLink">
                    Don't have an account? Register Yourself
                  </h3>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
