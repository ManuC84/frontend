import React, { useState, useContext, useEffect } from "react";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  //expand comment section
  const [expanded, setExpanded] = useState(false);
  const [authError, setAuthError] = useState(false);

  return (
    <AppContext.Provider
      value={{ expanded, setExpanded, authError, setAuthError }}
    >
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };

//pass state to other components
//const { cocktails, loading } = useGlobalContext();
