import { deleteDoc, doc, updateDoc } from "firebase/firestore"
import { deleteObject, getDownloadURL, ref, uploadString } from "firebase/storage"
import { useTranslation } from "next-i18next"
import Image from "next/image"
import { useRef, useState } from "react"
import { BiEdit, BiTrash } from "react-icons/bi"
import { db, storage } from "../../firebase"
import { useAuthValue } from "../../store/AuthContext"
import { useCreateNew, useSlateSaveContent } from "../../store/CreateContentContext"
import CreateParagraph from "../createContent/CreateParagraph"
import { startSerialize } from "../createContent/plugins/serialize"
import Loading from "../Loading"

interface contentBodyProps {
    dataParagraph: string | null
    dataImage: string | null
    option: string
    order: number
    getDocumentName: string
    previewContent: boolean
}

const ContentBody = ({ dataParagraph, dataImage, option, order, getDocumentName, previewContent }:contentBodyProps) => {
  const [ loadingDeletingContent, setLoadingDeletingContent ] = useState(false)
  const [ loadingEditingContent, setLoadingEditingContent ] = useState(false)
  const [ editParagraph, setEditParagraph ] = useState(false)
  const inputFileRef = useRef<HTMLInputElement | null>(null)

  const { t } = useTranslation("createNew")
  const { currentUser } = useAuthValue()
  const { handleLoadContentBody } = useSlateSaveContent()
  const { handleNoErrors } = useCreateNew() 
  
  const handleDeleteParagraph = async () => {
    if(currentUser?.uid){
      const docContentBody = doc(db, "users", currentUser.uid, "userCreateNew",`${getDocumentName}`, "contentBody",`${order}`)

      handleLoadContentBody(false)
      setLoadingDeletingContent(true)

      await deleteDoc(docContentBody).then(()=>{
        handleLoadContentBody(true)
        setLoadingDeletingContent(false)
      }).catch(()=>{
        setLoadingDeletingContent(false)
      })
    }
  }

  const handleDeleteImage = async () => {
    if(currentUser?.uid){
      setLoadingDeletingContent(true)
      
      const userCreateNewRef = ref(storage,`users/${currentUser?.uid}/userCreateNew/${getDocumentName}/${order}`)

      deleteObject(userCreateNewRef).then(async ()=>{
        const docContentBody = doc(db, "users", currentUser.uid, "userCreateNew",`${getDocumentName}`, "contentBody",`${order}`)

        handleLoadContentBody(false)
  
        await deleteDoc(docContentBody).then(()=>{
          handleLoadContentBody(true)
          setLoadingDeletingContent(false)
        }).catch(()=>{
          setLoadingDeletingContent(false)
        })
        
      })
    }
  }

  const handleClickAddImage = (e:React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target
      const reader = new FileReader()
      
      if(!input.files?.length){
        return
      }

      if(input.files[0]){
        reader.readAsDataURL(input.files[0])
      }

      reader.onload = async (e) => {
        if(currentUser?.uid){
          setLoadingEditingContent(true)
          
          const uploadMainImage = uploadString(ref(storage,`users/${currentUser?.uid}/userCreateNew/${getDocumentName}/${order}`),e.target?.result as string,"data_url")
          
          handleLoadContentBody(false)

          uploadMainImage.then(snap => {
            getDownloadURL(snap.ref).then(async url => {
              if(currentUser?.uid){
                const docContentBoby = doc(db, "users", currentUser.uid, "userCreateNew",`${getDocumentName}`,"contentBody",`${order}`)

                await updateDoc(docContentBoby,{
                  image: url
                }).then(()=>{
                  handleLoadContentBody(true)
                })
                setLoadingEditingContent(false)
                }
            })
          })
        }
      }
  } 

  const handleClickEditParagraph = (option : boolean) => {
    setEditParagraph(option)
    handleNoErrors()
  }
  
  return (
    <div>
      {(dataParagraph && option === "paragraph") && (
        <>
        {editParagraph ? (
          <div className="border-4 border-DarkBlueGray rounded-xl p-4  mt-4 sm:mx-16 sm:w-auto md:mx-36 lg:mx-0">
          <CreateParagraph option="editParagraph" idNewPost={getDocumentName} dataEdit={JSON.parse(dataParagraph)} placeholder={t("placeholder")} 
          order={order} handleClickCancelParagraph={handleClickEditParagraph} />
          <div className=" w-full flex justify-end items-center">
            <div className=" mt-4 w-fit p-1 bg-red-500 rounded-xl text-white border-4 border-Blue-Gray cancelOrDelete " onClick={()=>handleClickEditParagraph(false)}>
              <h3 className="text-xl">{t("cancel")}</h3>
            </div> 
          </div>
          </div>
        ):(
          <>
          <div className={`${!previewContent ? "border-2 border-DarkBlueGray mt-4  rounded-xl p-2 break-words xl:text-xl": "mx-4" }`}>
            <p>{startSerialize(JSON.parse(dataParagraph))}</p>
          </div>
          <div className="w-full mt-2 flex justify-end space-x-2 items-center">
            {loadingDeletingContent && (
              <Loading />
            )}
            {!previewContent && (
              <>
              <div className=" w-fit p-1 bg-red-500 rounded-xl flex items-center space-x-1 text-white border-4 border-Blue-Gray cancelOrDelete " onClick={handleDeleteParagraph} >
              <BiTrash className="w-8 h-8 rotate-12" />
              <h3 className="">{t("delete")}</h3>
              </div> 
              <div className=" w-fit p-1 bg-DarkBlueGray rounded-xl flex items-center space-x-1 text-white border-4 border-Blue-Gray edit " onClick={()=>{setEditParagraph(true)}} >
                <BiEdit className="w-8 h-8 -rotate-12" />
                <h3 className="">{t("edit")}</h3>
              </div> 
            </>
            )}
          </div>
          </>
        )}
        </>
      )} 
      {(dataImage && option === "image") && (
        <div className={`${previewContent && "mx-2"}`}>
        <div className={`${!previewContent ? "mt-4" :" my-4 "} col-span-3 relative bg-DarkBlueGray w-full h-[22rem] sm:h-[27rem] md:h-[30rem] lg:h-[28rem] xl:h-[32rem] rounded-xl rotate-1  border-4 border-DarkBlueGray break-words `}>
            <div className="relative w-full h-full">
                <Image className="rounded-lg" src={dataImage} alt={"image content"} fill />
            </div>
        </div>
        <div className="w-full mt-2 flex justify-end space-x-2 items-center">
          {loadingDeletingContent && (
            <Loading />
          )}
          {!previewContent && (
            <>
            <div className=" w-fit p-1 bg-red-500 rounded-xl flex items-center space-x-1 text-white border-4 border-Blue-Gray cancelOrDelete" onClick={handleDeleteImage} >
            <BiTrash className="w-8 h-8 rotate-12" />
            <h3>{t("delete")}</h3>
            </div> 
            <div className=" w-fit p-1 bg-DarkBlueGray rounded-xl flex items-center space-x-1 text-white border-4 border-Blue-Gray edit" 
            onClick={()=>inputFileRef.current?.click()} >
              <BiEdit className="w-8 h-8 -rotate-12" />
              <h3>{t("edit")}</h3>
              <input onChange={handleClickAddImage} ref={inputFileRef} type="file" name="file" hidden/>
            </div> 
            </>
          )}
          {loadingEditingContent && (
            <Loading />
          )}
        </div>
        </div>
      )}
    </div>
  )
}

export default ContentBody