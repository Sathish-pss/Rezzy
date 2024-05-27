import { Fragment, useContext, useState } from "react";
// Importing the SCSS files here
import "./login.scss";
// Importing the External Libraries
import { Grid, Typography, Box, Button } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// Importing the Customized Components here
import { AuthContext } from "../../context/AuthContext";

/**
 *
 * @returns Functional Component that returns the Login Page
 */
const Login = () => {
  // State Variable to store the Input Credentials
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });

  // Destructuring the User Context from the Auth Context
  const { loading, error, dispatch } = useContext(AuthContext);

  // Assigning a variable to the Navigate hook
  const navigate = useNavigate();

  // Function to set the Input Values
  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  /**
   *
   * @param {*} e
   * @returns Function to Submit the Login Form
   */
  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("/auth/login", credentials);
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
    <Fragment>
      <Grid container alignItems={"center"}>
        <Grid item xs={6}>
          <Box
            component={"img"}
            alt="logi_img"
            src="./assets/login.jpg"
            width={600}
            height={400}
          />
        </Grid>
        <Grid item xs={6}>
          <Grid
            container
            direction={"column"}
            alignItems={"center"}
            spacing={2}>
            <Grid item>
              {/* User Name Input Field */}
              <input
                type="text"
                placeholder="Enter username"
                id="username"
                onChange={handleChange}
                className="lInput"
                autoComplete="off"
              />
            </Grid>
            <Grid item>
              {/* Password input Field */}
              <input
                type="password"
                placeholder="Enter password"
                id="password"
                onChange={handleChange}
                className="lInput"
                autoComplete="off"
              />
            </Grid>
            <Grid item>
              <Button
                onClick={handleClick}
                variant="contained"
                fullWidth
                sx={{ width: "100%" }}>
                Login
              </Button>
            </Grid>
            <Grid item>
              <Typography>{error && <span>{error.message}</span>}</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default Login;
