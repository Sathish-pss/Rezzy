import { useContext } from "react";
// Importing the SCSS files
import "./navbar.scss";
// Importing the MUI & React Icons here
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
// Importing the Dark Mode context here
import { DarkModeContext } from "../../context/darkModeContext";

const Navbar = () => {
  // Dispatching the Darkmode context here
  const { dispatch } = useContext(DarkModeContext);

  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="items">
          <div className="item">
            <DarkModeOutlinedIcon
              className="icon"
              onClick={() => dispatch({ type: "TOGGLE" })}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
