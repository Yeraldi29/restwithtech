import { createContext, useState } from "react"

const initialStateState = {
    clickMenu: false,
    handleClick: () => {},
    clickBell: false,
    handleClickBell: () => {},
    clickProfile: false,
    handleClickProfile: () => {}
}

const initialStateImageProfile = {
    imageProfile: "",
    handleClickImage: () => {},
    option: "",
    handleOption: () => {}
}

const initialStatePostNewExpand = {
    NewExpand : false,
    handleNewExpand: () => {}
}

interface Click{
     clickMenu: boolean
     handleClick: (clicked: boolean) => void
     clickBell: boolean
     handleClickBell: (click: boolean) => void
     clickProfile: boolean
    handleClickProfile: (click: boolean) => void
}

interface ImageProfile{
    imageProfile: string|null
    handleClickImage: (image: string|null) => void
    option: string,
    handleOption: (value: string) => void
}

interface NewExpandPost{
    NewExpand: boolean
    handleNewExpand: (expand: boolean) => void
}

export const menuClick = createContext<Click>(initialStateState)
export const profileImage = createContext<ImageProfile>(initialStateImageProfile)
export const postNewExpand = createContext<NewExpandPost>(initialStatePostNewExpand)

export const State = ({children}:{children: React.ReactNode}) => {
    const [ clickMenu, setClickMenu ] = useState(false)
    const [ imageProfile, setImageProfile ] = useState<string | null>("")
    const [ option, setOption ] = useState("")
    const [ NewExpand, setNewExpand ] = useState(false)
    const [ clickBell, setClickBell ] = useState(false)
    const [ clickProfile, setClickProfile ] = useState(false)
   
    const handleClick = (clicked: boolean) => {
        setClickMenu(clicked)
    }
    const handleClickImage = (image:string | null) => {
        setImageProfile(image)
    }

    const handleNewExpand = (expand: boolean) => {
        setNewExpand(expand)
    } 

    const handleOption = (value: string) => {
        setOption(value)
    }

    const handleClickBell = (click: boolean) => {
        setClickBell(click)
    }

    const handleClickProfile = (click: boolean) => {
        setClickProfile(click)
    }

    return (
        <profileImage.Provider value={{ imageProfile,handleClickImage, option, handleOption }}>
            <menuClick.Provider value={{ clickMenu,handleClick, clickBell, handleClickBell, clickProfile, handleClickProfile }}>
                <postNewExpand.Provider value={{ NewExpand, handleNewExpand }}>
                    {children}
                </postNewExpand.Provider>
            </menuClick.Provider>
        </profileImage.Provider>
    )
}