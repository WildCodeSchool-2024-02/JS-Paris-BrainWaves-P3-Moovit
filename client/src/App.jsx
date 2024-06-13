import { Outlet } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <main className="container">
      <Outlet />
    </main>
  );
}

export default App;
