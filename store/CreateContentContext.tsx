import { createContext, useContext, useState } from 'react'

const initialValuesHelpContent = {
    appear: false,
    handleAppear: () => {}
}

interface helpContentProps {
    appear: boolean
    handleAppear: ( option: boolean) => void
}

const helpContent = createContext<helpContentProps>(initialValuesHelpContent)

export const CreateContentContext = ({children}:{children: React.ReactNode}) => {
    const [appear, setAppear] = useState(false)

    const handleAppear = (option: boolean ) => {
        setAppear(option)
    }

  return (
    <helpContent.Provider value={{appear,handleAppear}}>
      {children}
    </helpContent.Provider>
  )
}

export const useCreateContentContext = () => {
    return useContext(helpContent)
}