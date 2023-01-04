import { doc, updateDoc } from "firebase/firestore"
import { useTranslation } from "next-i18next"
import { useState, useEffect } from "react"
import { BiEdit, BiSave } from "react-icons/bi"
import { db } from "../../firebase"
import { useAuthValue } from "../../store/AuthContext"
import { useCreateNew } from "../../store/CreateContentContext"
import { createNewProps } from "../../types"
import Loading from "../Loading"

const MainTitle = ({getDocumentName, getDocValues, previewContent }: createNewProps) => {
    const [ valueTitle, setValueTitle ] = useState("")
    const [ errorTitle, setErrorTitle ] = useState({
    more: false,
    less: false
    })
    const [ loading, setLoading ] = useState(false)
    const [ editMainTitle, setEditMainTitle ] = useState(false)

    const { t } = useTranslation("createNew")
    const { currentUser } = useAuthValue()
    const { handleNoErrors } = useCreateNew() 

    useEffect(()=>{
     if(getDocValues){
      if(getDocValues.data().mainTitle){
        setValueTitle(getDocValues.data().mainTitle)
        setEditMainTitle(false)
      }else{
        setEditMainTitle(true)
      }
     }else{
      setEditMainTitle(true)
     }
    },[getDocValues])
    
    useEffect(()=>{
      if(valueTitle.length > 120){
        setErrorTitle({...errorTitle, more: true})
      }else{
        setErrorTitle({...errorTitle, more: false})
      }
    
      if(valueTitle.length < 20){
          setErrorTitle({...errorTitle, less: true})
      }else{
          setErrorTitle({...errorTitle, less: false})
      }
    },[valueTitle])
    
    const handleTitleChange = (e:React.ChangeEvent<HTMLTextAreaElement>) => {
        const {value} = e.target
        setValueTitle(value)
    }

    const handleClickMainTitle = async () => {
      setLoading(true)
      handleNoErrors()
      
      if(currentUser?.uid){
        
        if(valueTitle !== getDocValues?.mainTitle){
        const docUserCreateNew = doc(db, "users", currentUser.uid, "userCreateNew",`${getDocumentName}`)

        await updateDoc(docUserCreateNew,{
          mainTitle: valueTitle
        })
        }

      setLoading(false)
      setEditMainTitle(false)
      }

    }

  return (
    <div>
      {!editMainTitle ? (
        <>
        <div className={`${!previewContent && "w-full mb-4 p-2 border-4 border-Blue-Gray rounded-xl"} mb-4 `}>
          <h1 className="text-2xl xl:text-3xl font-bold text-DarkBlueGray ">{valueTitle}</h1>
        </div>
        {!previewContent && (
          <div className=" w-full flex justify-end items-center">
            <div className="  mb-4 w-fit p-1 bg-DarkBlueGray rounded-xl flex items-center space-x-1 text-white border-4 border-Blue-Gray edit" 
            onClick={()=>setEditMainTitle(true)}>
              <BiEdit className="w-12 h-12 -rotate-12" />
              <h3 className="text-xl rotate-12">{t("edit")}</h3>
            </div> 
          </div>
        )}
      </>
      ):(
        <>
        <textarea className="input rotate-0 h-auto bg-Lavender-Blue/40 text-2xl placeholder:text-2xl placeholder:text-BlueDarker resize-none" 
        placeholder={t("mainTitle")} value={valueTitle} rows={5} spellCheck={false}
        onChange={handleTitleChange}/>
         {errorTitle.more && (
        <div className="profileError mb-4">
        <p>{t("warningTitleMore")}</p>
        </div>
        )}
        {(errorTitle.less && valueTitle !== "") && (
          <div className="profileError mb-4">
          <p>{t("warningTitleLess")}</p>
         </div>
        )}     
        { valueTitle !== "" && valueTitle && !errorTitle.more && !errorTitle.less && (
          <div className=" w-full flex justify-end space-x-1 items-center">
            {loading && (
              <Loading />
            )}
            <div className=" -mt-4 mb-4 w-fit p-1 bg-green-400 rounded-xl flex items-center space-x-1 text-white border-4 border-Blue-Gray saveOrPublish " onClick={handleClickMainTitle}>
              <BiSave className="w-12 h-12 -rotate-12" />
              <h3 className="text-xl rotate-12">{t("save")}</h3>
            </div> 
          </div>
        )}
        </>
      )}
    </div>
  )
}

export default MainTitle