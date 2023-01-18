import { useContext, createContext } from "react"
import { useState, useEffect} from "react"
import { getAuth, onAuthStateChanged, signOut, User } from 'firebase/auth'

const initialStateAuth = {
  currentUser: null,
  timeActive: false,
  handleTimeActive: () => {},
  handleUpdateProfile: () => {},
  profile: ""
}

interface AuthContextProps {
  currentUser: User | null
  timeActive: boolean
  handleTimeActive: (time:boolean) => void
  handleUpdateProfile: () => void,
  profile: string
}

const AuthContext = createContext<AuthContextProps>(initialStateAuth)

export const AuthProvider = ({children}: { children:  React.ReactNode}) => {
    const [currentUser, setCurrentUser] = useState<User | null>(null)
    const [profile, setProfile] = useState("wait")
    const [timeActive, setTimeActive] = useState(false)
    const [updateProfile, setUpdateProfile] = useState(false)
  
    useEffect(()=>{
      const auth = getAuth()
      onAuthStateChanged(auth,user => {
        setCurrentUser(user)
        if(user === null){
          setProfile("account")
          signOut(auth).then(()=>{
          }).catch(err => {
            console.log("🚀 ~ file: AuthContext.tsx ~ line 37 ~ signOut ~ err.message", err.message)
          })
        }else if(user?.displayName !== null && user?.photoURL !== null){
          setProfile("profile")
        }else if(user.emailVerified === false){
          setProfile("account")
        }
      })
    },[currentUser, updateProfile])
    
    const handleTimeActive = (time: boolean) => {
      setTimeActive(time)
    }

    const handleUpdateProfile = () => {
      setUpdateProfile(true)
    }
    
    return (
        <AuthContext.Provider value={{currentUser , timeActive, handleTimeActive, profile, handleUpdateProfile}} >
            {children}
        </AuthContext.Provider>
    )
}

export const useAuthValue = ()=>{
    return useContext(AuthContext)
}