import { createContext, useState, useContext, ReactNode } from "react"
import { Descendant } from "slate"
import { startSerialize } from "../components/createContent/plugins/serialize"

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
    imageProfile: string|null
    handleClickImage: (image: string|null) => void
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
    const [imageProfile, setImageProfile] = useState<string | null>("")
    const [NewExpand, setNewExpand] = useState(false)
   
    const handleClick = (clicked: boolean) => {
        setClickMenu(clicked)
    }
    const handleClickImage = (image:string | null) => {
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