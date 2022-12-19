import { createContext, useContext, useState } from "react"

const initialValuesUserProfile = {
    done: false,
    handleDone: () => {},
    editProfile: false,
    handleEditProfile: () => {},
    changeImage: false,
    handleChangeImage: () => {}
}

interface userProfileProps {
    done: boolean
    handleDone: (option: boolean) => void
    editProfile: boolean
    handleEditProfile: (option: boolean) => void
    changeImage: boolean
    handleChangeImage: (option: boolean) => void
}

const userProfileContext = createContext<userProfileProps>(initialValuesUserProfile)

export const UserContext = ({children}:{children: React.ReactNode}) => {
    const [ done, setDone ] = useState(false)
    const [ editProfile, setEditProfile ] = useState(false)
    const [ changeImage, setChangeImage ] = useState(false)

    const handleDone = (option: boolean) => {
        setDone(option)
    }

    const handleEditProfile = (option: boolean) => {
        setEditProfile(option)
    }

    const handleChangeImage = (option: boolean) => {
        setChangeImage(option)
    }
    
    return (
        <userProfileContext.Provider value={{done, handleDone, editProfile, handleEditProfile, changeImage, handleChangeImage}}>
            {children}
        </userProfileContext.Provider>
    )
}

export const useUserProfileContent = () => {
    return useContext(userProfileContext)
}