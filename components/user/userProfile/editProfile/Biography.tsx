import { useTranslation } from "next-i18next"

interface DescriptionProps {
    handleProfileValues: (name: string, value: string) => void
    descriptionError: boolean
    descriptionValue: string
}

const Biography = ({handleProfileValues, descriptionError, descriptionValue}:DescriptionProps) => {

    const { t } = useTranslation("user")

    const handleChangeBio = (e:React.ChangeEvent<HTMLTextAreaElement>) => {
      const {value, name} = e.target
      handleProfileValues(name,value)
    }
    
  return (
    <div>
        <div className="w-fit mx-auto my-3 p-2 bg-DarkBlueGray border-4 border-Blue-Gray rounded-xl -rotate-1 text-xl text-white">
            <h2>{t("biography")}</h2>
        </div>
        <h3 className="text-center text-lg mb-2">{t("biographyMessage")}</h3>
        <textarea className="h-auto overflow-auto  bg-Lavender-Blue/30 w-full border-4 border-Blue-Gray rounded-xl focus:outline-none focus:ring-0 focus:border-DarkBlueGray resize-none" 
        rows={7} value={descriptionValue} name="description" onChange={handleChangeBio}/>
        {
          descriptionError && (
            <div className="profileError">
             <p>{t("biographyError")}</p>
            </div>
          )
        }
    </div>
  )
}

export default Biography