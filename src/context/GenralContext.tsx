"use client";

import { createContext, useContext, useEffect, useState } from "react";

export const GeneralContext = createContext({});

const GeneralProvider = (props: unknown) => {
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
      {props.children}
    </GeneralContext.Provider>
  );
};

export const useGeneralContext = () => {
  const context = useContext(GeneralContext);
  return context;
};

export default GeneralProvider;
