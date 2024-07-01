import { useContext } from "react";
import { Outlet, useLoaderData } from "react-router-dom";
import DarkModeContext from "./services/DarkModeContext";
import "./App.css";
import DarkMode from "./components/DarkMode/DarkMode";

function App() {
  // Contexte DarkMode
  const { mode } = useContext(DarkModeContext);
  const sports = useLoaderData();

  return (
    <main className={`container ${mode}`}>
      <DarkMode />
      <Outlet context={{ sports }} />
    </main>
  );
}

export default App;
