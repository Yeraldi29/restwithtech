import { useState } from "react"
import BubblesLoading from "../loading/BubblesLoading"

interface ButtonFormsProps {
    validation: boolean
    title: string
    submit: boolean
}

const ButtonForms = ({validation, title, submit}: ButtonFormsProps) => {
  const [animation, setAnimation] = useState(false)
    
  return (
    <button type="submit" className={`${(animation && validation )&& " animate-wiggle "} relative bg-Lavender-Blue border-4 border-Blue-Gray  mx-auto p-3 rounded-xl -rotate-12 my-4 active:bg-white text-red-600  cursor-pointer lg:hover:opacity-50`}
    onSubmit={()=>{
        setAnimation(true)
    }}
     onAnimationEnd={()=>{setAnimation(false)}}>
        <p className=" font-bold text-xl ">{title.toUpperCase()}</p>
    <BubblesLoading  validation={validation} submit={submit}/>
    </button>
  )
}

export default ButtonForms
