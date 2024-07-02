/* eslint-disable import/no-unresolved */
import { useContext, useEffect, useState } from "react";
import { Outlet, useLoaderData, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import DarkModeContext from "./services/DarkModeContext";
import "./App.css";
import DarkMode from "./components/DarkMode/DarkMode";
import { useUser } from "./contexts/User/User";

function App() {
  // Contexte DarkMode
  const { mode } = useContext(DarkModeContext);
  const { setUser } = useUser();
  const sports = useLoaderData();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  const api = import.meta.env.VITE_API_URL;

  const handleRefresh = async () => {
    try {
      const response = await fetch(`${api}/api/users/refresh/page`, {
        credentials: "include",
      });
      if (response.ok) {
        const auth = await response.json();
        const token = response.headers.get("Authorization");
        auth.token = token;
        setUser(auth);
        setIsLoading(false);
      } else {
        navigate("/login");
        setIsLoading(false);
      }
    } catch (error) {
      toast.error('Token not valid');
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleRefresh();
  }, []);

  return (
    <main className={`container ${mode}`}>
      <DarkMode />
      <Outlet context={{ sports, isLoading }} />
    </main>
  );
}

export default App;
