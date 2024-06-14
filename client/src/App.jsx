import { useContext } from "react";
import { Outlet } from "react-router-dom";
import DarkModeContext from "./services/DarkModeContext";
import "./App.css";

function App() {
  // Contexte DarkMode
  const { mode } = useContext(DarkModeContext);

  return (
    <main className={`container ${mode}`}>
      <Outlet />
    </main>
  );
}

export default App;
