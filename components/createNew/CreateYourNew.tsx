import { useState,useEffect } from "react"
import { useTranslation } from "next-i18next"
import { BiPencil } from "react-icons/bi"
import CreateNewOptions from "./CreateNewOptions"
import MainTitle from "./MainTitle"
import MainImage from "./MainImage"
import { useAuthValue } from "../../store/AuthContext"
import { collection, doc, DocumentData, getDocs, orderBy, query, QuerySnapshot, setDoc, where } from "firebase/firestore"
import { db } from "../../firebase"
import { nanoid } from "nanoid"
import Loading from "../Loading"
import Image from "next/image"
import { BsFilePost } from "react-icons/bs"
import CreateParagraph from "../createContent/CreateParagraph"
import ContentBody from "./ContentBody"
import { useSlateSaveContent } from "../../store/CreateContentContext"

const CreateYourNew = () => {
  const [ getDocumentName, setDocumentName ] = useState("")
  const [ getDocValues, setGetDocValues ] = useState<DocumentData | null>(null)
  const [ getContentBody, setGetContentBody ] = useState<QuerySnapshot<DocumentData> | null>(null)
  const [ loadingContent, setLoadingContent ] = useState(true)
  const [ stopLoading, setStopLoading ] = useState(false)
  const [ addCreateParagraph, setAddCreateParagraph ] = useState(false)
  
  const { t } = useTranslation("createNew")
  const { currentUser } = useAuthValue()
  const { loadContentBody } = useSlateSaveContent()

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
    const handleContentBody = async () => {
      if(currentUser?.uid){
        const docsContentBody = collection(db, "users", currentUser.uid, "userCreateNew",`${getDocumentName}`,"contentBody")
        const getDocsContentBody = await getDocs(query(docsContentBody,orderBy("order")))

        if(getDocsContentBody.empty){
          setGetContentBody(null)
        }else{
          setGetContentBody(getDocsContentBody)
        }
      }
    }

    if(getDocumentName !== "" || loadContentBody ){
      handleContentBody()
    }
    console.log("hello");
    
  },[getDocumentName, loadContentBody])

  useEffect(()=>{
    if(getDocValues || stopLoading){
      setLoadingContent(false)
    }
  },[getDocValues, stopLoading])

  const handleClickAddCreateParagraph = (option : boolean) => {
    setAddCreateParagraph(option)
  }

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
        {!getContentBody?.empty && (
          <>
          {getContentBody?.docs.map((doc, index)=>(
            <ContentBody key={index} dataParagraph={doc.data().data} dataImage={doc.data().image} option={doc.data().option} />
          ))}
          </>
        )}
        { addCreateParagraph && (
          <div className="mt-4">
          <CreateParagraph option="createNew" idNewPost={getDocumentName} getDocValues={getDocValues} placeholder={t("placeholder")} handleClickAddCreateParagraph={handleClickAddCreateParagraph} />
          <div className=" w-full flex justify-end items-center">
            <div className=" my-4 w-fit p-1 bg-red-500 rounded-xl text-white border-4 border-Blue-Gray " onClick={()=>handleClickAddCreateParagraph(false)}>
              <h3 className="text-xl">{t("cancel")}</h3>
            </div> 
          </div>
          </div>
        )}
        <CreateNewOptions getDocumentName={getDocumentName} getDocValues={getDocValues} handleClickAddCreateParagraph={handleClickAddCreateParagraph} />
        <div className="mt-4 w-full flex justify-end items-center">
          <div className=" mb-4 w-fit p-1 py-2 bg-green-400 rounded-xl flex items-center space-x-1 text-white border-4 border-Blue-Gray " >
            <BsFilePost className="w-12 h-12 -rotate-12" />
            <h3 className="text-xl">{t("public")}</h3>
          </div> 
        </div>
        </>
      )}
      <div className=" max-w-sm h-[22rem] sm:h-96 mx-auto -rotate-1 my-3  sm:my-6 lg:col-span-2 lg:m-0 lg:mb-6 lg:mt-10 xl:max-w-md xl:h-[28rem] sticky top-20">
        <Image className="border-4 border-DarkBlueGray bg-DarkBlueGray rounded-xl mx-auto " src="/giftCreatingNew.gif" alt="a person listen music" fill/>
      </div>
    </div>
  )
}

export default CreateYourNew