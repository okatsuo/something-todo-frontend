import React, { createContext, useState } from 'react'

const UserContext = createContext({})

const UserProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const [userData, setUserData] = useState({})
  const [userToken, setUserToken] = useState('')
  return <UserContext.Provider value={{
    userData,
    userToken,
    setUserData,
    setUserToken
  }}>{children}</UserContext.Provider>
}

export { UserProvider, UserContext }
