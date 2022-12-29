import { createContext, useContext, useState } from 'react'

const initialValuesHelpContent = {
  appear: false,
  handleAppear: () => {}
}

const initialValuesSlateSaveContent = {
  save: "no",
  handleSave: () => {},
  loadContentBody: false,
  handleLoadContentBody: () => {}
}

interface helpContentProps {
  appear: boolean
  handleAppear: ( option: boolean) => void
}

interface slateSaveContentProps {
  save: string
  handleSave: (value : string) => void
  loadContentBody: boolean
  handleLoadContentBody: (value : boolean) => void
}

const helpContent = createContext<helpContentProps>(initialValuesHelpContent)
const slateSaveContent = createContext<slateSaveContentProps>(initialValuesSlateSaveContent)

export const CreateContentContext = ({children}:{children: React.ReactNode}) => {
    const [appear, setAppear] = useState(false)
    const [save, setSave] = useState("no")
    const [ loadContentBody, setLoadContentBody] = useState(false)
    
    const handleAppear = (option: boolean ) => {
      setAppear(option)
    }

    const handleSave = (value: string ) => {
      setSave(value)
    }

    const handleLoadContentBody = (value: boolean ) => {
      setLoadContentBody(value)
    }
    
  return (
    <helpContent.Provider value={{appear,handleAppear}}>
      <slateSaveContent.Provider value={{save, handleSave, loadContentBody, handleLoadContentBody}}>
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