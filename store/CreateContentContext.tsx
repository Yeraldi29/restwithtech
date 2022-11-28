import { createContext, useContext, useState, useEffect } from 'react'

const initialValuesHelpContent = {
  appear: false,
  handleAppear: () => {}
}

const initialValuesSlatePlainText = {
  plainText: "",
  handlePlainText: () => {},
  clickSave: false,
  handleClickSave: () => {}
}

interface helpContentProps {
  appear: boolean
  handleAppear: ( option: boolean) => void
}

interface slatePlainTextProps {
  plainText: string,
  handlePlainText: (value: string) => void
  clickSave: boolean
  handleClickSave: (value: boolean) => void
}

const helpContent = createContext<helpContentProps>(initialValuesHelpContent)
const slatePlainText = createContext<slatePlainTextProps>(initialValuesSlatePlainText)

export const CreateContentContext = ({children}:{children: React.ReactNode}) => {
    const [appear, setAppear] = useState(false)
    const [ plainText, setPlainText] = useState("")
    const [ clickSave, setClickSave ] = useState(false)

    const handleAppear = (option: boolean ) => {
        setAppear(option)
    }

    const handlePlainText = (value: string) => {
      setPlainText(value)
    }

    const handleClickSave = (value: boolean) => {
      setClickSave(value)
    }

  return (
    <helpContent.Provider value={{appear,handleAppear}}>
      <slatePlainText.Provider value={{plainText, handlePlainText, clickSave, handleClickSave}}>
        {children}
      </slatePlainText.Provider>
    </helpContent.Provider>
  )
}

export const useCreateContentContext = () => {
    return useContext(helpContent)
}

export const useSlatePlainText = () => {
  return useContext(slatePlainText)
}