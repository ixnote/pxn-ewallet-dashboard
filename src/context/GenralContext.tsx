"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

export const GeneralContext = createContext({});

interface GeneralProviderProps {
  children: ReactNode;
}

const GeneralProvider = ({ children }: GeneralProviderProps) => {
  // MISC
  const [name, setName] = useState("EDDY");

  //*******/
  //************/
  // FUNCTIONS
  //************/
  //*******/

  useEffect(() => {
    // console.log("__3d1k4N.init");
  }, []);

  return (
    <GeneralContext.Provider
      value={{
        // Misc
        name,
        setName,
      }}
    >
      {children}
    </GeneralContext.Provider>
  );
};

export const useGeneralContext = () => {
  const context = useContext(GeneralContext);
  return context;
};

export default GeneralProvider;
