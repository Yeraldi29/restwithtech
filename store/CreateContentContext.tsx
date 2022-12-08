import { createContext, useContext, useState } from 'react'

const initialValuesHelpContent = {
  appear: false,
  handleAppear: () => {}
}

const initialValuesSlateSaveContent = {
  save: "no",
  handleSave: () => {}
}

interface helpContentProps {
  appear: boolean
  handleAppear: ( option: boolean) => void
}

interface slateSaveContentProps {
  save: string
  handleSave: (value : string) => void
}

const helpContent = createContext<helpContentProps>(initialValuesHelpContent)
const slateSaveContent = createContext<slateSaveContentProps>(initialValuesSlateSaveContent)

export const CreateContentContext = ({children}:{children: React.ReactNode}) => {
    const [appear, setAppear] = useState(false)
    const [save, setSave] = useState("no")
    
    const handleAppear = (option: boolean ) => {
      setAppear(option)
    }

    const handleSave = (value: string ) => {
      setSave(value)
    }
  return (
    <helpContent.Provider value={{appear,handleAppear}}>
      <slateSaveContent.Provider value={{save, handleSave}}>
        {children}
      </slateSaveContent.Provider>
    </helpContent.Provider>
  )
}

export const useCreateContentContext = () => {
    return useContext(helpContent)
}

export const useSlateSaveContent = () => {
  return useContext(slateSaveContent)
}