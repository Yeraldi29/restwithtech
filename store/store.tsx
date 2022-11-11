import { createContext, useState, useContext } from "react"

const initialStateState = {
    clickMenu: false,
    handleClick: () => {}
}

const initialStateImageProfile = {
    imageProfile: "",
    handleClickImage: () => {}
}

const initialStatePostNewExpand = {
    NewExpand : false,
    handleNewExpand: () => {}
}

interface Click{
     clickMenu: boolean
     handleClick: (clicked: boolean) => void
}

interface ImageProfile{
    imageProfile: string
    handleClickImage: (image: string) => void
}

interface NewExpandPost{
    NewExpand: boolean
    handleNewExpand: (expand: boolean) => void
}

export const menuClick = createContext<Click>(initialStateState)
export const profileImage = createContext<ImageProfile>(initialStateImageProfile)
export const postNewExpand = createContext<NewExpandPost>(initialStatePostNewExpand)

export const State = ({children}:{children: React.ReactNode}) => {
    const [clickMenu, setClickMenu] = useState(false)
    const [imageProfile, setImageProfile] = useState("")
    const [NewExpand, setNewExpand] = useState(false)
   
    const handleClick = (clicked: boolean) => {
        setClickMenu(clicked)
    }
    const handleClickImage = (image:string) => {
        setImageProfile(image)
    }

    const handleNewExpand = (expand: boolean) => {
        setNewExpand(expand)
    } 

    return (
        <profileImage.Provider value={{imageProfile,handleClickImage}}>
            <menuClick.Provider value={{clickMenu,handleClick}}>
                <postNewExpand.Provider value={{NewExpand, handleNewExpand}}>
                    {children}
                </postNewExpand.Provider>
            </menuClick.Provider>
        </profileImage.Provider>
    )
}