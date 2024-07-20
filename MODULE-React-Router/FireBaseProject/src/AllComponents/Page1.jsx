import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth, db } from "../firebaseConfig";
import SendIcon from "@mui/icons-material/Send";
import { useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import FilledInput from "@mui/material/FilledInput";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import { Box, Button, TextField, Typography, colors } from "@mui/material";
import { doc, setDoc } from "firebase/firestore";
export default function Page1() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [msg, setmsg] = useState();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const usedetails = await createUserWithEmailAndPassword(auth, email, password);
    const user = usedetails.user;

    await setDoc(doc(db, "Data", user.uid), {
      name: name,
      email: email,
      userId: user.uid,
    });
    setmsg("SuccessFully Registered ");
    navigate("/dashbord");
  };
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <div className="main">
      <div className="main-wrap">
        <h1>Register Yourself</h1>
        <form className="form" onSubmit={(e) => handleSubmit(e)} autoComplete="off">
          <Box sx={{ input: { color: "white" } }}>
            <TextField fullWidth label="Name" id="fullWidth" className="inp" onChange={(e) => setName(e.target.value)} sx={{ color: "white" }} />
          </Box>
          <Box sx={{ input: { color: "white" } }}>
            <div className="box-wrap">
              <TextField fullWidth label="Email" id="fullWidth" className="inp" onChange={(e) => setEmail(e.target.value)} />
              {/* <TextField fullWidth label="Password" id="fullWidth" className="inp" onChange={(e) => setPassword(e.target.value)} /> */}
            </div>
          </Box>
          <FormControl sx={{ width: "100%" }} variant="outlined" sx={{ input: { color: "white" } }}>
            <InputLabel htmlFor="outlined-adornment-password" className="inp">
              Password
            </InputLabel>
            <OutlinedInput
              onChange={(e) => setPassword(e.target.value)}
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>

          <Box className="btn">
            <Button variant="contained" color="secondary" size="large" style={{ width: "100%" }} type="submit" endIcon={<SendIcon />}>
              Submit
            </Button>
            <h3 className="loginLink" onClick={() => navigate("/login")}>
              Already have an Account ? Click Here To Login
            </h3>

            {msg && <p>{msg}</p>}
          </Box>
        </form>
      </div>

      <Typography sx={{ color: "white", fontSize: "12px" }}>
        <h2 onClick={() => navigate("/adminLogin")}>Admin Login? Click Here!!!</h2>
      </Typography>
    </div>
  );
}
