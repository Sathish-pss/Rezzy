import { useState } from "react";
// Importing the SCSS Files
import "./newHotel.scss";
// Importing the customized Components
import { hotelInputs } from "../../formSource";
import useFetch from "../../hooks/useFetch";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
// Importing the MUI Icons
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
// Importing the External Libraries
import axios from "axios";

const NewHotel = () => {
  const [files, setFiles] = useState(""); // State variable to set the files here
  const [info, setInfo] = useState({}); // State variable to set the Info here
  const [rooms, setRooms] = useState([]); // state variable to store the rooms

  // Fetching the data from the Custom Hook for rooms
  const { data, loading, error } = useFetch("/rooms");

  // Handle change function to set the data
  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  // Handle select function to set the Handle Array
  const handleSelect = (e) => {
    const value = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setRooms(value);
  };

  // Function to Upload the Files into cloudinary api - Upload a New Hotel
  const handleClick = async (e) => {
    e.preventDefault();

    try {
      const list = await Promise.all(
        Object.values(files).map(async (file) => {
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

      const newhotel = {
        ...info,
        rooms,
        photos: list,
      };

      await axios.post("/hotels", newhotel);
    } catch (err) {
      console.error("Error:", err);
      // Handle errors appropriately (e.g., display user-friendly messages)
    }
  };
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Add New Product</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                files
                  ? URL.createObjectURL(files[0])
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  multiple
                  onChange={(e) => setFiles(e.target.files)}
                  style={{ display: "none" }}
                />
              </div>

              {hotelInputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    id={input.id}
                    onChange={handleChange}
                    type={input.type}
                    placeholder={input.placeholder}
                  />
                </div>
              ))}
              <div className="formInput">
                <label>Featured</label>
                <select id="featured" onChange={handleChange}>
                  <option value={false}>No</option>
                  <option value={true}>Yes</option>
                </select>
              </div>
              <div className="selectRooms">
                <label>Rooms</label>
                <select id="rooms" multiple onChange={handleSelect}>
                  {loading
                    ? "loading"
                    : data &&
                      data.map((room) => (
                        <option key={room._id} value={room._id}>
                          {room.title}
                        </option>
                      ))}
                </select>
              </div>
              <button onClick={handleClick}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewHotel;
