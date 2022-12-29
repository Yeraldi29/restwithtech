import { useState, useRef } from "react"
import { BiHelpCircle, BiHide, BiImageAdd, BiParagraph, BiPlus, BiShow } from "react-icons/bi"
import { createNewProps } from "../../types"
import Helper from "./createNewOptions/Helper"
import { motion } from "framer-motion"
import { useAuthValue } from "../../store/AuthContext"
import { getDownloadURL, ref, uploadString } from "firebase/storage"
import { db, storage } from "../../firebase"
import { collection, doc, getDocs, setDoc } from "firebase/firestore"
import Loading from "../Loading"
import { useSlateSaveContent } from "../../store/CreateContentContext"

interface createNewOptionsProps extends createNewProps {
  handleClickAddCreateParagraph : (option: boolean) => void
}

const CreateNewOptions = ({getDocumentName, getDocValues, handleClickAddCreateParagraph }: createNewOptionsProps) => {
  const [ clickHelper, setClickHelper ] = useState(true)
  const [ animation, setAnimation ] = useState({
    plus: false,
    show: false,
    help: false
  })
  const [ loading, setLoading ] = useState(false)
  const inputFileRef = useRef<HTMLInputElement | null>(null)

  const { currentUser } = useAuthValue()
  const { handleLoadContentBody } = useSlateSaveContent()
  
  const handleClickAddParagraph = () => {
    handleClickAddCreateParagraph(true)
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
          setLoading(true)
          
          const getDocsContentBodyLength = (await getDocs(collection(db, "users", currentUser.uid, "userCreateNew",`${getDocumentName}`,"contentBody"))).docs.length
          const uploadMainImage = uploadString(ref(storage,`users/${currentUser?.uid}/userCreateNew/${getDocumentName}/${getDocsContentBodyLength + 1}`),e.target?.result as string,"data_url")
          
          handleLoadContentBody(false)

          uploadMainImage.then(snap => {
            getDownloadURL(snap.ref).then(async url => {
              if(currentUser?.uid){
                // if(mainValueImage !== getDocValues?.mainImage){
                const docContentBoby = doc(db, "users", currentUser.uid, "userCreateNew",`${getDocumentName}`,"contentBody",`${getDocsContentBodyLength + 1}`)

                await setDoc(docContentBoby,{
                  image: url,
                  order: getDocsContentBodyLength + 1,
                  option: "image"
                }).then(()=>{
                  handleLoadContentBody(true)
                })
                // setMainValueImage(url)
                setLoading(false)
                // }
              }
            })
          })
        }
      }
  } 

  const handleClickHelper = () =>{
    setClickHelper(!clickHelper)
    setAnimation({...animation,help: true})
  }

  return (
    <>
    <div className="mt-4 flex items-center space-x-4">
      <motion.div className={`flex items-center space-x-1 border-4 border-Blue-Gray rounded-xl overflow-hidden`}
      onClick={()=>setAnimation({...animation,plus: !animation.plus})} 
      animate={animation.plus ? {rotate:0, backgroundColor: "white"} : {rotate:-12}}
      >
        <motion.div
        animate={animation.plus ? {translateX:-40,display:"none"} : {translateX:0.,display:"block"}}
        >
          <BiPlus className="w-12 h-12" />
        </motion.div>
        <motion.div className=" items-center space-x-1 rounded-lg "
        animate={animation.plus ? {translateX:-3, display:"flex"} : {translateX:40, display:"none" }}
        >
          <div className=" border-r-4 border-Blue-Gray" onClick={handleClickAddParagraph}>
            <BiParagraph className="rotate-12 w-12 h-12" />
          </div>
          <div onClick={()=>inputFileRef.current?.click()}>
            <BiImageAdd className="-rotate-12 w-12 h-12" />
            <input onChange={handleClickAddImage} ref={inputFileRef} type="file" name="file" hidden/>
          </div>
        </motion.div>
      </motion.div>
      {loading && (
        <Loading />
      )}
      <div className={`rotate-12 border-4 border-Blue-Gray rounded-xl ${animation.show && " animate-wiggle"}`}
      onClick={()=>setAnimation({...animation,show: true})} 
      onAnimationEnd={()=>setAnimation({...animation,show: false})}>
        <BiShow className="w-12 h-12" />
      </div>
      <div className={`-rotate-12 border-4 border-Blue-Gray bg-red-400 text-white rounded-xl ${animation.help && " animate-wiggle"}`} 
      onClick={handleClickHelper}
      onAnimationEnd={()=>setAnimation({...animation,help: false})} >
        <BiHelpCircle className="w-12 h-12" />
      </div>
    </div>
    {clickHelper && (
      <Helper />
    )}
    </>
  )
}

export default CreateNewOptions