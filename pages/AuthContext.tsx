import { useContext, createContext } from "react"
import { useState, useEffect } from "react"
import { onAuthStateChanged, User } from 'firebase/auth'
import { auth } from '../firebase'

const initialStateAuth = {
  currentUser: null,
  timeActive: false,
  handleTimeActive: () => {}
}

interface AuthContextProps {
  currentUser: User | null
  timeActive: boolean
  handleTimeActive: (time:boolean) => void
}

const AuthContext = createContext<AuthContextProps>(initialStateAuth)

export const AuthProvider = ({children}: { children:  React.ReactNode}) => {
    const [currentUser, setCurrentUser] = useState<User | null>(null)
    const [timeActive, setTimeActive] = useState(false)
  
    useEffect(()=>{
      onAuthStateChanged(auth, user => {
        setCurrentUser(user)
      })
    },[])

    const handleTimeActive = (time: boolean) => {
      setTimeActive(time)
    }
    
    return (
        <AuthContext.Provider value={{currentUser , timeActive, handleTimeActive}} >
            {children}
        </AuthContext.Provider>
    )
}

export const useAuthValue = ()=>{
    return useContext(AuthContext)
}