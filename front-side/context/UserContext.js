import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import axios from "axios";

const Context = createContext({
  // Default values
});

function UserContext({ children }) {

  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  
  useEffect(()=> {

    if(token == null) {
      setToken(null);
      return;
    }
    else {
      axios.get("http://localhost:3000/profile",
      {
        headers: {
          Authorization: 'Bearer ' + token
        }
      }).then(response => {
        // console.log(response);
        setUser(response.data)
      })
    }
  },[token])

  const logOut = useCallback ( 
    () => {
    setUser(null);
    setToken(null);
  }, []
  );
  return (
    <Context.Provider
      value={{ 
        user, token, setUser, setToken, logOut
      }}
    >
      {children}
    </Context.Provider>
  );
}

export const useUser = () => useContext(Context);

export default UserContext;
