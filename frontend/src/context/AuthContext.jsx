/* eslint-disable import/no-unresolved */
import PropTypes from "prop-types";

import { createContext } from "react";

const AuthContext = createContext();

function AuthContextProvider({ children }) {
  const currentUserData = { id: 1, firstname: "Anaïs" };

  return (
    <AuthContext.Provider value={{ currentUserData }}>
      {children}
    </AuthContext.Provider>
  );
}

AuthContextProvider.propTypes = {
  children: PropTypes.node,
};

AuthContextProvider.defaultProps = {
  children: <div />,
};

export { AuthContext, AuthContextProvider };
