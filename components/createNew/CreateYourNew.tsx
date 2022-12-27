import { useState,useEffect } from "react"
import { useTranslation } from "next-i18next"
import { BiPencil } from "react-icons/bi"
import CreateOption from "./CreateOption"
import MainTitle from "./MainTitle"
import MainImage from "./MainImage"
import { useAuthValue } from "../../store/AuthContext"
import { collection, doc, DocumentData, getDocs, query, setDoc, where } from "firebase/firestore"
import { db } from "../../firebase"
import { nanoid } from "nanoid"
import Loading from "../Loading"

const CreateYourNew = () => {
  const [ getDocumentName, setDocumentName ] = useState("")
  const [ getDocValues, setGetDocValues ] = useState<DocumentData | null>(null)
  const [ loadingContent, setLoadingContent ] = useState(true)
  const [ stopLoading, setStopLoading ] = useState(false)
  
  const { t } = useTranslation("createNew")
  const { currentUser } = useAuthValue()

  useEffect(()=>{
    const handleGetValuesCreateNew = async () => {
      if(currentUser?.uid){
        const docsUserCreateNew = await getDocs(collection(db, "users", currentUser.uid, "userCreateNew"))
        if(docsUserCreateNew.empty){
          const randomId = nanoid()

          setDocumentName(`${randomId}`)
          const docUserCreateNew = doc(db, "users", currentUser.uid, "userCreateNew",`${randomId}`)

          await setDoc(docUserCreateNew,{
            idNewPost: `${randomId}`,
            editing: true
          })
          setGetDocValues(null)
          setStopLoading(true)
        }else{
          const docCreateNew = await getDocs(query(collection(db, "users", currentUser.uid, "userCreateNew"),where("editing", "==", true)))

          if(docCreateNew.empty){
            const randomId = nanoid()

            setDocumentName(`${randomId}`)
            const docUserCreateNew = doc(db, "users", currentUser.uid, "userCreateNew",`${randomId}`)
  
            await setDoc(docUserCreateNew,{
              idNewPost: `${randomId}`,
              editing: true
            })
            setGetDocValues(null)
            setStopLoading(true)
          }else{
            setGetDocValues(docCreateNew.docs[0])
            setDocumentName(`${docCreateNew.docs[0].data().idNewPost}`)
          }
        }
      }
    }
    handleGetValuesCreateNew()
  },[currentUser])

  useEffect(()=>{
    if(getDocValues || stopLoading){
      setLoadingContent(false)
    }
  },[getDocValues, stopLoading])

  return (
    <div className=" mt-4 text-BlueDarker">
      <div className="flex items-center space-x-1 justify-center">
        <h1 className=" text-4xl text-center mb-4">{t("titlePage")}</h1>
        <BiPencil className="w-12 h-12 mx-auto -rotate-12" />
      </div>
      {loadingContent ? (
        <Loading />
      ):(
        <>
        <MainTitle getDocumentName={getDocumentName} getDocValues={getDocValues} />
        <MainImage getDocumentName={getDocumentName} getDocValues={getDocValues} />
        <CreateOption />
        </>
      )}
    </div>
  )
}

export default CreateYourNew