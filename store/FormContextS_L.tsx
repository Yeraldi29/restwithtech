import { useState, useContext, createContext } from "react"

const initialValues = {
  email: "",
  password: ""
}

const initialPropsFormContextS_L = {
  formValues: initialValues,
  formErrors: initialValues,
  handleFormValues:() => {},
  handleFormErrors: () => {}
}

interface FormContextS_LProps {
  formValues: {
    email:string
    password: string
  }
  handleFormValues: (name:string, value: string | null) => void
  formErrors: {
    email:string 
    password: string
  }
  handleFormErrors: (errors: { email: string, password: string}) => void
}

const FormContextS_L = createContext<FormContextS_LProps>(initialPropsFormContextS_L)

export const FormS_LProvider = ({children}:{children: React.ReactNode}) => {
  const [formValues, setFormValues] = useState(initialValues)
  const [formErrors, setFormErros] = useState(initialValues)

  const handleFormValues = (name:string , value:string | null) => {
    setFormValues({...formValues, [name] : value})
  }

  const handleFormErrors = (errors: { email: string, password: string}) => {
    setFormErros(errors)
  }
  
  return (
    <FormContextS_L.Provider value={{formValues,handleFormValues, formErrors, handleFormErrors}}>
      {children}
    </FormContextS_L.Provider>
  )
}

export const useFormContextS_L = () => {
  return useContext(FormContextS_L)
}