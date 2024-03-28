// Importing the Context hooks from React
import { createContext, useReducer } from "react";
import DarkModeReducer from "./darkModeReducer";

// Defining the Initial State for Dark Mode
const INITIAL_STATE = {
  darkMode: false,
};

// Assigning a variable to the dark mode context
export const DarkModeContext = createContext(INITIAL_STATE);

// Function to Provide the Dark Mode the appsss
export const DarkModeContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(DarkModeReducer, INITIAL_STATE);

  return (
    <DarkModeContext.Provider value={{ darkMode: state.darkMode, dispatch }}>
      {children}
    </DarkModeContext.Provider>
  );
};