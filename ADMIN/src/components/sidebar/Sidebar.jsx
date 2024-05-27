import { useContext, useState } from "react";
// Importing the sccs file here
import "./sidebar.scss";
// Importing the MUI & React ICons here 
// Importing the External packages here
import { Link } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
// Import Data files here
import { sideBar } from "../../data/data";

const Sidebar = () => {
  const [sidebarData, setSidebarData] = useState(sideBar); // State to set the side bar data
  // Dispatching the Props from the Darkmode context
  const { dispatch } = useContext(DarkModeContext);
  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">Rezzy</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        {sidebarData?.map((data, index) => (
          <ul key={data?.id}>
            <Link to={data?.link} style={{ textDecoration: "none" }}>
              <li>
                {data?.icon}
                <span>{data?.name}</span>
              </li>
            </Link>
          </ul>
        ))}
      </div>
      <div className="bottom">
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "LIGHT" })}></div>
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "DARK" })}></div>
      </div>
    </div>
  );
};

export default Sidebar;
