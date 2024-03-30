import { useContext, useState } from "react";
// Importing the SCSS files here
import "./login.scss";
// Importing the External Libraries
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
    <div className="login">
      <div className="lContainer">
        {/* User Name Input Field */}
        <input
          type="text"
          placeholder="username"
          id="username"
          onChange={handleChange}
          className="lInput"
        />
        {/* Password input Field */}
        <input
          type="password"
          placeholder="password"
          id="password"
          onChange={handleChange}
          className="lInput"
        />
        {/* Login Button */}
        <button disabled={loading} onClick={handleClick} className="lButton">
          Login
        </button>
        {error && <span>{error.message}</span>}
      </div>
    </div>
  );
};

export default Login;
