import { createContext, useContext, useState, useMemo } from "react";
import PropTypes from "prop-types";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState({
    id: 2,
    email: "king-julian@gmail.com",
    password: "julian",
    name: "Julian",
    level: 1,
  });

  const memo = useMemo(() => ({ user, setUser }), [user, setUser])

  return (
    <UserContext.Provider value={memo}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);

UserProvider.propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    children: PropTypes.object.isRequired
}
