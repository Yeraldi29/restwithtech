import { useContext, createContext } from "react"
import { useState, useEffect} from "react"
import { getAuth, onAuthStateChanged, signOut, User } from 'firebase/auth'
import { useRouter } from "next/router"

const initialStateAuth = {
  currentUser: null,
  timeActive: false,
  handleTimeActive: () => {},
  profile: ""
}

interface AuthContextProps {
  currentUser: User | null
  timeActive: boolean
  handleTimeActive: (time:boolean) => void
  profile: string
}

const AuthContext = createContext<AuthContextProps>(initialStateAuth)

export const AuthProvider = ({children}: { children:  React.ReactNode}) => {
    const [currentUser, setCurrentUser] = useState<User | null>(null)
    const [profile, setProfile] = useState("wait")
    const [timeActive, setTimeActive] = useState(false)
    const router = useRouter()
  
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
    },[currentUser,router])
    
    const handleTimeActive = (time: boolean) => {
      setTimeActive(time)
    }
    
    return (
        <AuthContext.Provider value={{currentUser , timeActive, handleTimeActive, profile}} >
            {children}
        </AuthContext.Provider>
    )
}

export const useAuthValue = ()=>{
    return useContext(AuthContext)
}