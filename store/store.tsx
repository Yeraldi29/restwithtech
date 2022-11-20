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

const initialStateComment = {
    contentSlate: "",
    handleContentState: () => {}
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

interface propsCommentContent {
    contentSlate: ReactNode | string
    handleContentState: ((value: Descendant[]) => void)
}

export const menuClick = createContext<Click>(initialStateState)
export const profileImage = createContext<ImageProfile>(initialStateImageProfile)
export const postNewExpand = createContext<NewExpandPost>(initialStatePostNewExpand)
const commentContent = createContext<propsCommentContent>(initialStateComment)

export const State = ({children}:{children: React.ReactNode}) => {
    const [clickMenu, setClickMenu] = useState(false)
    const [imageProfile, setImageProfile] = useState("")
    const [NewExpand, setNewExpand] = useState(false)
    const [ contentSlate, setContentSlate] = useState<ReactNode | string>("")
   
    const handleClick = (clicked: boolean) => {
        setClickMenu(clicked)
    }
    const handleClickImage = (image:string) => {
        setImageProfile(image)
    }

    const handleNewExpand = (expand: boolean) => {
        setNewExpand(expand)
    } 

    const handleContentState = (value: Descendant[]) => {
        setContentSlate(startSerialize(value))
    }

    return (
        <profileImage.Provider value={{imageProfile,handleClickImage}}>
            <menuClick.Provider value={{clickMenu,handleClick}}>
                <postNewExpand.Provider value={{NewExpand, handleNewExpand}}>
                    <commentContent.Provider value={{contentSlate, handleContentState}}>
                    {children}
                    </commentContent.Provider>
                </postNewExpand.Provider>
            </menuClick.Provider>
        </profileImage.Provider>
    )
}

export const useCommentContext = () => {
    return useContext(commentContent)
}