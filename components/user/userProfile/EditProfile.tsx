import { doc, updateDoc } from "firebase/firestore"
import { useTranslation } from "next-i18next"
import { useState, useEffect } from "react"
import { db } from "../../../firebase"
import { useAuthValue } from "../../../store/AuthContext"
import { useUserProfileContent } from "../../../store/UserContext"
import Loading from "../../Loading"
import Biography from "./editProfile/Biography"
import Profession from "./editProfile/Profession"
import Skills from "./editProfile/Skills"

interface EditProfileProps{
  descriptionProfile:string
  skill1Profile:string
  skill2Profile:string
  skill3Profile:string
  professionProfile:string
}

const EditProfile = ({descriptionProfile,skill1Profile,skill2Profile,skill3Profile,professionProfile}:EditProfileProps) => {

    const initialValues = {
      description: descriptionProfile,
      skill1: skill1Profile,
      skill2: skill2Profile,
      skill3: skill3Profile,
      profession: professionProfile
    }

    const [ profileValues, setProfileValues ] = useState(initialValues)
    const [ descriptionError, setDescriptionError ] = useState(false)
    const [ skill1Error, setSkill1Error ] = useState(false)
    const [ skill2Error, setSkill2Error ] = useState(false)
    const [ skill3Error, setSkill3Error ] = useState(false)
    const [ professionError, setProfessionError ] = useState(false)
    const [ saveError, setSaveError ] = useState(false)
    const [ loading, setLoading ] = useState(false)
    const [ animation, setAnimation ] = useState(false)

    const { t } = useTranslation("user")
    const { currentUser } = useAuthValue()
    const { handleDone, handleEditProfile, editProfile } = useUserProfileContent()

    const handleProfileValues = (name: string, value: string) => {
        setSaveError(false)
        setProfileValues({...profileValues, [name]:value})
    }

    useEffect(()=>{
      const { description, skill1, skill2, skill3, profession } = profileValues
      
      if(description.length < 50 || description.length > 250){
        setDescriptionError(true)
      }else{
        setDescriptionError(false)
      }

      if(skill1.length < 10 || skill1.length > 40){
        setSkill1Error(true)
      }else{
        setSkill1Error(false)
      }

      if(skill2.length < 10  || skill2.length > 40){
        setSkill2Error(true)
      }else{
        setSkill2Error(false)
      }

      if(skill3.length < 10  || skill3.length > 40){
        setSkill3Error(true)
      }else{
        setSkill3Error(false)
      }

      if(profession.length < 10 || profession.length > 40){
        setProfessionError(true)
      }else{
        setProfessionError(false)
      }
      
    },[profileValues])

    const handleSaveChanges = async () => {
      setAnimation(true)
      if(descriptionError || skill1Error || skill2Error || skill3Error || professionError) {
        setSaveError(true)
        handleDone(false)
      }else{
        setSaveError(false)
        setLoading(true)
        if(currentUser?.uid){
          const userDoc = doc(db,"users",currentUser.uid)
          await updateDoc(userDoc,{
            descriptionProfile: profileValues.description,
            skill1: profileValues.skill1,
            skill2: profileValues.skill2,
            skill3: profileValues.skill3,
            profession: profileValues.profession
          }).then(()=>{
            handleDone(true)
            handleEditProfile(false)
          }).catch(()=>{
            handleDone(false)
            handleEditProfile(true)
          })
        }
        setLoading(false)
      }
    }

  return (
    <div className="lg:w-[38rem] xl:w-[52rem] lg:flex lg:justify-center ">
      <div className="border-4 border-DarkBlueGray text-BlueDarker rounded-xl mt-4 p-2 sm:max-w-md sm:mx-auto lg:m-0 ">
        {descriptionProfile  === "" && (
            <h3 className="text-red-500 text-lg text-center">{t("warningEdit")}</h3>
        )}
        <Biography handleProfileValues={handleProfileValues} descriptionError={descriptionError} descriptionValue={profileValues.description} /> 
        <Skills handleProfileValues={handleProfileValues} skill1Error={skill1Error} skill2Error={skill2Error} skill3Error={skill3Error} 
        skill1Value={profileValues.skill1} skill2Value={profileValues.skill2} skill3Value={profileValues.skill3}/>
        <Profession handleProfileValues={handleProfileValues} professionError={professionError} professionValue={profileValues.profession}/>
        <div>
          <div className={`w-fit mx-auto my-6 p-2  border-4 ${saveError ? "border-red-500 bg-red-200 hover:bg-red-500 hover:border-DarkBlueGray" : " border-DarkBlueGray bg-Lavender-Blue hover:bg-DarkBlueGray hover:text-white hover:border-Blue-Gray"} ${animation && "animate-wiggle"} rounded-xl cursor-pointer transform ease-out duration-300`}
          onClick={handleSaveChanges} onAnimationEnd={()=>setAnimation(false)}>
            <h3 className="text-xl xl:text-2xl">{t("saveChanges")}</h3>
          </div>
          {
            loading && (
              <Loading />
            )
          }
          {
          saveError && (
            <h3 className="text-red-500 text-lg text-center -mt-4">{t("warningSave")}</h3>
          )
          }
          {
            (editProfile && !loading) && (
              <div className="w-fit mx-auto my-6 p-2  border-4 border-red-500 bg-red-200 hover:bg-red-500 hover:border-DarkBlueGray rounded-xl cursor-pointer transform ease-out duration-300"
              onClick={()=>handleEditProfile(false)}>
                <h3 className="text-xl xl:text-2xl">{t("cancel")}</h3>
              </div>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default EditProfile