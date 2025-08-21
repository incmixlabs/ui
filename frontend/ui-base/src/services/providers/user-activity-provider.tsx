import React, { createContext, useContext } from "react"
import useUserActivity from "../hooks/user/use-user-activity" // Assuming useUserActivity is defined elsewhere

const UserActivityContext = createContext(null)

export const UserActivityProvider = ({ children }) => {
  const userActivity = useUserActivity() // Your custom user activity hook
  return (
    <UserActivityContext.Provider value={userActivity}>
      {children}
    </UserActivityContext.Provider>
  )
}

export const useUserActivityContext = () => {
  return useContext(UserActivityContext)
}
