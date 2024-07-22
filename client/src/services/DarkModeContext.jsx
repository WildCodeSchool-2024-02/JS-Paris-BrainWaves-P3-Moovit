import { createContext, useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";

const DarkModeContext = createContext();

export default DarkModeContext;

export function DarkModeContextProvider({ children }) {
  const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: light)");

  const [mode, setMode] = useState(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      return storedTheme;
    }
    return prefersDarkScheme.matches ? "light" : "dark";
  });

  useEffect(() => {
    const handleChange = (e) => {
      setMode(e.matches ? "light" : "dark");
    };
    prefersDarkScheme.addEventListener("change", handleChange);
    return () => {
      prefersDarkScheme.removeEventListener("change", handleChange);
    };
  }, [prefersDarkScheme]);

  const memo = useMemo(() => ({ mode, setMode }), [mode, setMode]);

  return (
    <DarkModeContext.Provider value={memo}>{children}</DarkModeContext.Provider>
  );
}

DarkModeContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
