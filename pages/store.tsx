import { createContext, useState } from "react"

const initialState = {
    clickMenu: false,
    handleClick: () => {}
}

const menuClick = createContext<Click>(initialState)

interface Click{
     clickMenu: boolean
     handleClick: (clicked: boolean) => void
}

const StateClick = ({children}:{children: React.ReactNode}) => {
    const [clickMenu, setClickMenu] = useState(false)
   
    const handleClick = (clicked: boolean) => {
        setClickMenu(clicked)
    }

    return <menuClick.Provider value={{clickMenu,handleClick}}>{children}</menuClick.Provider>
}

export {menuClick, StateClick }

