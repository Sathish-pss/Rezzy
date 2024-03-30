import { useState } from "react";
// Import the SCSS FIles here
import "./new.scss";
// Import the Customized Components here
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
// Import the Material UI Icons
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
// Import the External Libraries
import axios from "axios";

/**
 *
 * @param {*} param0
 * @returns Functional Component to add new User
 */
const New = ({ inputs, title }) => {
  const [file, setFile] = useState(""); // State variable to store the FIles
  const [info, setInfo] = useState({}); // State variable to store the info

  // Function to set the files
  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  // Function to handle File Upload
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const list = await Promise.all(
        Object.values(file).map(async (file) => {
          const data = new FormData();
          data.append("file", file);
          data.append("upload_preset", "upload");

          // CORS Handling (Consider using a Cloudinary SDK for convenience)
          const uploadRes = await fetch(
            "https://api.cloudinary.com/v1_1/drsqoaebw/image/upload",
            {
              method: "POST",
              body: data,
            }
          );

          if (!uploadRes.ok) {
            throw new Error("Failed to upload file to Cloudinary");
          }

          const { url } = await uploadRes.json();
          return url;
        })
      );

      const newUser = {
        ...info,
        img: list,
      };
      console.log("newUser==>", newUser);

      await axios.post("/auth/register", newUser);
    } catch (err) {
      console.log(err);
    }
  };

  console.log(info);
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        {/* Rendering the Title here */}
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                file
                  ? URL.createObjectURL(file[0])
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form>
              {/* Image Upload Component  */}
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  multiple
                  onChange={(e) => setFile(e.target.files)}
                  style={{ display: "none" }}
                />
              </div>

              {/* Rendering the Input files here */}
              {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    onChange={handleChange}
                    type={input.type}
                    placeholder={input.placeholder}
                    id={input.id}
                  />
                </div>
              ))}
              {/* Button to submit the form */}
              <button onClick={handleClick}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;
