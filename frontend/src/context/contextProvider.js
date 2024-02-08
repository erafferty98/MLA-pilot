"use client";

import React, { createContext, useState } from "react";

const initialContext = {
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  currentUser: "",
  setCurrentUser: () => {},
};
export const Context = createContext(initialContext);

const ContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState("");

  return (
    <Context.Provider
      value={{ isLoggedIn, setIsLoggedIn, currentUser, setCurrentUser }}
    >
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;
