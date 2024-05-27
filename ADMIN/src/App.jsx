import { useContext } from "react";
// Importing the SCSS Files here
import "./style/dark.scss";
import "./index.css";
// Importing the Pages here
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import NewHotel from "./pages/newHotel/NewHotel";
import NewRoom from "./pages/newRoom/NewRoom";
// Importing the External LIbraries here
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// Importing the Data files here
import { productInputs, userInputs } from "./formSource";
import { hotelColumns, roomColumns, userColumns } from "./datatablesource";
// Importing the Context files here
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/AuthContext";

/**
 *
 * @returns Functional Component that returns the Reservation Application
 */
function App() {
  // Destructuring the Dark Mode Context using the Dark Mode Context here
  const { darkMode } = useContext(DarkModeContext);

  // Protected Route to ensure the User is Logged in
  const ProtectedRoute = ({ children }) => {
    // Destructuring the user here
    const { user } = useContext(AuthContext);
    // If the User is not logged in, Returns to the Login Page
    if (!user) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  return (
    // Toggling the App in Dark and Light Mode
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            {/* Login Page */}
            <Route path="login" element={<Login />} />
            <Route
              index
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            {/* Users Page */}
            <Route path="users">
              <Route
                index
                element={
                  <ProtectedRoute>
                    <List columns={userColumns} />
                  </ProtectedRoute>
                }
              />
              {/* Single User Page based on Id */}
              <Route
                path=":userId"
                element={
                  <ProtectedRoute>
                    <Single />
                  </ProtectedRoute>
                }
              />
              {/* Create New User Page */}
              <Route
                path="new"
                element={
                  <ProtectedRoute>
                    <New inputs={userInputs} title="Add New User" />
                  </ProtectedRoute>
                }
              />
            </Route>
            {/* Hotels Page */}
            <Route path="hotels">
              <Route
                index
                element={
                  <ProtectedRoute>
                    <List columns={hotelColumns} />
                  </ProtectedRoute>
                }
              />
              {/* Single Product View Page */}
              <Route
                path=":productId"
                element={
                  <ProtectedRoute>
                    <Single />
                  </ProtectedRoute>
                }
              />
              {/* New Hotel Page */}
              <Route
                path="new"
                element={
                  <ProtectedRoute>
                    <NewHotel />
                  </ProtectedRoute>
                }
              />
            </Route>
            {/* Rooms Page */}
            <Route path="rooms">
              <Route
                index
                element={
                  <ProtectedRoute>
                    <List columns={roomColumns} />
                  </ProtectedRoute>
                }
              />
              {/* Single Product View Page */}
              <Route
                path=":productId"
                element={
                  <ProtectedRoute>
                    <Single />
                  </ProtectedRoute>
                }
              />
              {/* New rooms Page */}
              <Route
                path="new"
                element={
                  <ProtectedRoute>
                    <NewRoom />
                  </ProtectedRoute>
                }
              />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
