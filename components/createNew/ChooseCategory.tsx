import { useState, useEffect } from "react"
import { useTranslation } from "next-i18next"
import { BiDownArrow, BiUpArrow } from "react-icons/bi"
import { createNewProps } from "../../types"
import { useAuthValue } from "../../store/AuthContext"
import { db } from "../../firebase"
import { doc, updateDoc } from "firebase/firestore"
import { useCreateNew } from "../../store/CreateContentContext"

const ChooseCategory = ({getDocumentName, getDocValues, previewContent}: createNewProps) => {
  const [ category, setCategory ] = useState("")
  const [ chooseCategory, setChooseCategory] = useState(false)
  const [ loading, setLoading ] = useState(false)

  const { t } = useTranslation("header")
  const { currentUser } = useAuthValue()
  const { handleNoErrors } = useCreateNew() 

  useEffect(()=>{
    if(getDocValues){
      if(getDocValues.data().category){
       setCategory(getDocValues.data().category)
     }else{
      setCategory(t("chooseCategory"))
     }
    }else{
      setCategory(t("chooseCategory"))
    }
   },[getDocValues])

   const handleSaveCategory = async (option : string) => {
    setLoading(true)
    setChooseCategory(false)
    handleNoErrors()
    
    if(currentUser?.uid){
      if(option !== category){
        const docUserCreateNew = doc(db, "users", currentUser.uid, "userCreateNew",`${getDocumentName}`)

        await updateDoc(docUserCreateNew,{
          category: option
        }).then(()=>{
          setCategory(option)
        })
        setLoading(false)
        }
    }
   }
    
  return (
    <>
    {!previewContent && (
      <div className=" font-bold w-fit mb-8">
      <div className={`${chooseCategory && "mb-2"} h-12 p-2 ${loading ? "bg-Blue-Gray" : "bg-BabyBlueEyes"} rounded-xl border-4 border-DarkBlueGray active:bg-Blue-Gray cursor-pointer lg:hover:bg-Blue-Gray lg:hover:text-white ease-in-out duration-300 transform `}
      onClick={()=>setChooseCategory(!chooseCategory)} >
        <div className="flex items-center justify-between space-x-2">
          <h4>{category}</h4>
          {chooseCategory ? (
            <BiUpArrow className="w-6 h-6 rotate-12 " />
          ):(
            <BiDownArrow className="w-6 h-6 -rotate-12 " />
          )}
        </div>
      </div>
      {chooseCategory && (
        <div className="w-64 mx-auto bg-BabyBlueEyes rounded-xl border-4 border-DarkBlueGray ">
          <div className="p-2 text-center border-b-4 border-DarkBlueGray rounded-t-lg active:bg-Blue-Gray cursor-pointer lg:hover:bg-Blue-Gray lg:hover:text-white ease-in-out duration-300 transform " 
          onClick={()=>handleSaveCategory(t("categories.tech"))} >
            <h4>{t("categories.tech")}</h4>
          </div>
          <div className="p-2 text-center border-b-4 border-DarkBlueGray active:bg-Blue-Gray cursor-pointer lg:hover:bg-Blue-Gray lg:hover:text-white ease-in-out duration-300 transform" 
          onClick={()=>handleSaveCategory(t("categories.mobile"))} >
            <h4>{t("categories.mobile")}</h4>
          </div>
          <div className="p-2 text-center border-b-4 border-DarkBlueGray active:bg-Blue-Gray cursor-pointer lg:hover:bg-Blue-Gray lg:hover:text-white ease-in-out duration-300 transform" 
          onClick={()=>handleSaveCategory(t("categories.C&P"))} >
            <h4>{t("categories.C&P")}</h4>
          </div>
          <div className="p-2 text-center border-b-4 border-DarkBlueGray active:bg-Blue-Gray cursor-pointer lg:hover:bg-Blue-Gray lg:hover:text-white ease-in-out duration-300 transform" 
          onClick={()=>handleSaveCategory(t("categories.os"))} >
            <h4>{t("categories.os")}</h4>
          </div>
          <div className="p-2 text-center rounded-b-lg active:bg-Blue-Gray cursor-pointer lg:hover:bg-Blue-Gray lg:hover:text-white ease-in-out duration-300 transform" 
          onClick={()=>handleSaveCategory(t("categories.code"))} >
            <h4>{t("categories.code")}</h4>
          </div>
        </div>
      )}
      </div>
    )}
    </>
  )
}

export default ChooseCategory