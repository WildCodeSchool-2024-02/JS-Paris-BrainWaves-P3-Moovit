import { useContext } from "react";
import { Outlet } from "react-router-dom";
import DarkModeContext from "./services/DarkModeContext";
import "./App.css";
import DarkMode from "./contexts/DarkMode/DarkMode";

function App() {
  // Contexte DarkMode
  const { mode } = useContext(DarkModeContext);

  return (
    <main className={`container ${mode}`}>
      <DarkMode />
      <Outlet />
    </main>
  );
}

export default App;
