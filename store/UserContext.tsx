import { createContext, useContext, useState } from "react"

const initialValuesUserProfile = {
    done: false,
    handleDone: () => {}
}

interface userProfileProps {
    done: boolean
    handleDone: (option: boolean) => void
}

const userProfileContext = createContext<userProfileProps>(initialValuesUserProfile)

export const UserContext = ({children}:{children: React.ReactNode}) => {
    const [ done, setDone ] = useState(false)

    const handleDone = (option: boolean) => {
        setDone(option)
    }
    
    return (
        <userProfileContext.Provider value={{done, handleDone}}>
            {children}
        </userProfileContext.Provider>
    )
}

export const useUserProfileContent = () => {
    return useContext(userProfileContext)
}