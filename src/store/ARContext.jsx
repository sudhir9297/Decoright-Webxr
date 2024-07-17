import React, { createContext, useState, useContext } from "react";

const ARContext = createContext();

export const useAR = () => {
  return useContext(ARContext);
};

export const ARProvider = ({ children }) => {
  const [isARSessionEnabled, setARSessionEnabled] = useState(false);

  const startARSession = () => setARSessionEnabled(true);
  const endARSession = () => setARSessionEnabled(false);

  return (
    <ARContext.Provider
      value={{ isARSessionEnabled, startARSession, endARSession }}
    >
      {children}
    </ARContext.Provider>
  );
};
