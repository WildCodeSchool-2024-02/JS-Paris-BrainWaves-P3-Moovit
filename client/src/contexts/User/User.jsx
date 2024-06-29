import { createContext, useContext, useState, useMemo } from "react";
import PropTypes from "prop-types";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  const memo = useMemo(() => ({ user, setUser }), [user, setUser]);

  return <UserContext.Provider value={memo}>{children}</UserContext.Provider>;
}

export const useUser = () => useContext(UserContext);

UserProvider.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  children: PropTypes.object.isRequired,
};
