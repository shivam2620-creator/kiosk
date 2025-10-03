// ContinueContext.jsx
import { createContext, useContext, useState } from "react";

const ContinueContext = createContext();

export const ContinueProvider = ({ children }) => {
  const [onContinue, setOnContinue] = useState(() => () => {});
  return (
    <ContinueContext.Provider value={{ onContinue, setOnContinue }}>
      {children}
    </ContinueContext.Provider>
  );
};

export const useContinue = () => useContext(ContinueContext);
