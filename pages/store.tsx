import { createContext, useState } from "react"

const initialStateState = {
    clickMenu: false,
    handleClick: () => {}
}

const initialStateImageProfile = {
    imageProfile: "",
    handleClickImage: () => {}
}

interface Click{
     clickMenu: boolean
     handleClick: (clicked: boolean) => void
}

interface ImageProfile{
    imageProfile: string
    handleClickImage: (image: string) => void
}

export const menuClick = createContext<Click>(initialStateState)
export const profileImage = createContext<ImageProfile>(initialStateImageProfile)

export const State = ({children}:{children: React.ReactNode}) => {
    const [clickMenu, setClickMenu] = useState(false)
    const [imageProfile, setImageProfile] = useState("")
   
    const handleClick = (clicked: boolean) => {
        setClickMenu(clicked)
    }
    const handleClickImage = (image:string) => {
        setImageProfile(image)
    }
    
    return (
        <profileImage.Provider value={{imageProfile,handleClickImage}}>
            <menuClick.Provider value={{clickMenu,handleClick}}>{children}</menuClick.Provider>
        </profileImage.Provider>
    )
}