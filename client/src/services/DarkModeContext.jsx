import { createContext, useMemo, useState } from "react";
import PropTypes from "prop-types";

const DarkModeContext = createContext();

export default DarkModeContext;

export function DarkModeContextProvider({ children }) {
  const [mode, setMode] = useState("dark");
  const memo = useMemo(() => ({ mode, setMode }), [mode, setMode]);

  return (
    <DarkModeContext.Provider value={memo}>{children}</DarkModeContext.Provider>
  );
}

DarkModeContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
