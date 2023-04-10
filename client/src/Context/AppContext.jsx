import React, { createContext, useState } from 'react'
import App from './../App';

export const appContext = createContext();
export const AppContext = () => {
    const [loggedIn, setLoggedIn] = useState();
  return (
    <appContext.Provider value={{loggedIn, setLoggedIn}}>
        <App/>
    </appContext.Provider>
  )
}
