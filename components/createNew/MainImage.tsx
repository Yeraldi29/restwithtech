import { doc, updateDoc } from 'firebase/firestore'
import { getDownloadURL, ref, uploadString } from 'firebase/storage'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { BiEdit, BiImage } from 'react-icons/bi'
import { db, storage } from '../../firebase'
import { useAuthValue } from '../../store/AuthContext'
import { useCreateNew } from '../../store/CreateContentContext'
import { createNewProps } from '../../types'
import Loading from '../Loading'

const MainImage = ({ getDocumentName, getDocValues, previewContent }:createNewProps) => {
    const [ mainValueImage, setMainValueImage ] = useState("")
    const [ loading, setLoading ] = useState(false)
    const inputFileRef = useRef<HTMLInputElement | null>(null)
    
    const { t } = useTranslation("createNew")
    const { currentUser } = useAuthValue()
    const { handleNoErrors } = useCreateNew() 

    useEffect(()=>{
      if(getDocValues){
        if(getDocValues.data().mainImage){
        setMainValueImage(getDocValues.data().mainImage) 
        }
      }
    },[getDocValues])

    const handleClickFile = () => {
      inputFileRef.current?.click()
    }

    const addMainImage = (e:React.ChangeEvent<HTMLInputElement>) => {
      const input = e.target
      const reader = new FileReader()
      
      if(!input.files?.length){
        return
      }

      if(input.files[0]){
        reader.readAsDataURL(input.files[0])
      }

      reader.onload = (e) =>{
        if(currentUser?.uid){
          const uploadMainImage = uploadString(ref(storage,`users/${currentUser?.uid}/userCreateNew/${getDocumentName}/mainImage`),e.target?.result as string,"data_url")
          
          setLoading(true)
          uploadMainImage.then(snap => {
            getDownloadURL(snap.ref).then(async url => {
              if(currentUser?.uid){
                if(mainValueImage !== getDocValues?.mainImage){
                const docUserCreateNew = doc(db, "users", currentUser.uid, "userCreateNew",`${getDocumentName}`)
                await updateDoc(docUserCreateNew,{
                  mainImage: url
                }).then(()=>{
                  setMainValueImage(url)
                  handleNoErrors()
                })
              setLoading(false)
              }
              }
            })
          })
        }
      }
    }
    
  return (
    <>
    {(mainValueImage !== "" ) ? (
     <>
     <div className=" relative bg-DarkBlueGray mb-4 w-full h-[22rem] sm:h-[27rem] md:h-[30rem] lg:h-[28rem] xl:h-[32rem] rounded-xl rotate-1  border-4 border-DarkBlueGray">
        <Image className="rounded-lg" src={mainValueImage} alt="main image" fill priority />
     </div> 
     <div className=" w-full flex justify-end items-center space-x-1">
      {loading && (
        <Loading />
      )}
      {!previewContent && (<>
        <div className="  mb-4 w-fit p-1 bg-DarkBlueGray rounded-xl flex items-center space-x-1 text-white border-4 border-Blue-Gray edit " 
        onClick={handleClickFile} >
          <BiEdit className="w-12 h-12 -rotate-12" />
          <h3 className="text-xl rotate-12">{t("edit")}</h3>
        </div> 
        <input onChange={addMainImage} ref={inputFileRef} type="file" name="file" hidden/>
      </>)}
     </div>
     </>
    ):(
      <div className="relative bg-DarkBlueGray w-full h-[22rem] sm:h-[27rem] md:h-[30rem] lg:h-[28rem] xl:h-[32rem] rounded-xl rotate-1  border-4 border-DarkBlueGray cursor-pointer" onClick={handleClickFile}>
        <div className="flex flex-col justify-center text-white h-full">
            <h2 className="text-2xl text-center">{t("mainImage")}</h2>
            <div className='w-full flex space-x-1 justify-center'>
            {loading && (
              <Loading />
            )}
              <BiImage className="w-12 h-12 mx-auto rotate-12"/>
            </div>
        </div>
        <input onChange={addMainImage} ref={inputFileRef} type="file" name="file" hidden/>
      </div>
    )}
    </>
  )
}

export default MainImage