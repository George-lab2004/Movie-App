import { createContext, useEffect, useState } from "react";

export let TokenContext = createContext();

export default function TokenContextProvider(props) {
  const [token, settoken] = useState(null);
  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      settoken(localStorage.getItem("userToken"));
    }
  });
  return (
    <TokenContext.Provider value={{ token, settoken }}>
      {props.children}
    </TokenContext.Provider>
  );
}
