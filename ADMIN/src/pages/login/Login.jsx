import { Fragment, useContext, useState } from "react";
// Importing the SCSS files here
import "./login.scss";
import { customStyles } from "../../style/styles";
// Importing the External Libraries
import {
  Grid,
  Typography,
  Box,
  Button,
  TextField,
  FormControl,
  FormLabel,
} from "@mui/material";
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// Importing the Customized Components here
import { AuthContext } from "../../context/AuthContext";

// Initial values for Login Page
const initialValues = {
  username: "",
  password: "",
};
/**
 *
 * @returns Functional Component that returns the Login Page
 */
const Login = () => {
  // Initializing the Login form using useFormik hook here
  const loginFormik = useFormik({
    initialValues: initialValues,
    onSubmit: () => {
      handleSubmit();
    },
  });

  // Destructuring the User Context from the Auth Context
  const { error, dispatch } = useContext(AuthContext);

  // Assigning a variable to the Navigate hook
  const navigate = useNavigate();

  /**
    
   * @returns Function to Submit the Login Form
   */
  const handleSubmit = async () => {
    dispatch({ type: "LOGIN_START" });
    try {
      let payload = loginFormik?.values;
      const res = await axios.post("/auth/login", payload);
      if (res.data.isAdmin) {
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
        // Storing the token in the Session
        sessionStorage.setItem("access_token", res?.data?.token);
        navigate("/");
      } else {
        dispatch({
          type: "LOGIN_FAILURE",
          payload: { message: "You are not allowed!" },
        });
      }
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  };

  return (
    <Grid
      container
      alignItems={"center"}
      justifyContent={"center"}
      direction={"column"}
      sx={{ minHeight: "100vh" }}>
      {/* title text */}
      <Grid item>
        <Typography sx={titleTextStyle}>Rezzy</Typography>
      </Grid>

      {/* Login text */}
      <Grid item>
        <Typography sx={primaryTextStyle}>Login here</Typography>
      </Grid>

      {/* User name form control */}
      <Grid item>
        <FormControl>
          <FormLabel sx={formLableNameStyle}>Username</FormLabel>
          <TextField
            name="username"
            onChange={loginFormik?.handleChange}
            size="small"
            type="text"
            autoComplete="off"
            placeholder="Enter User Name"
            value={loginFormik?.values?.username}
          />
        </FormControl>
      </Grid>

      {/* Password Form Control */}
      <Grid item>
        <FormControl>
          <FormLabel sx={formLableNameStyle}>Password</FormLabel>
          <TextField
            name="password"
            onChange={loginFormik?.handleChange}
            size="small"
            type="text"
            autoComplete="off"
            value={loginFormik?.values?.password}
            placeholder="Enter Password"
          />
        </FormControl>
      </Grid>

      {/* Submit Button */}
      <Grid item>
        <Button
          onClick={loginFormik?.handleSubmit}
          variant="contained"
          fullWidth>
          Login
        </Button>
      </Grid>
      <Grid item>
        <Typography>{error && <span>{error.message}</span>}</Typography>
      </Grid>
    </Grid>
  );
};

// Custom styles can be destructured here
const { primaryTextStyle, titleTextStyle, formLableNameStyle } = customStyles;
export default Login;
