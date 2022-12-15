import { useTranslation } from "next-i18next"

interface professionProps {
  handleProfileValues: (name: string, value: string) => void
  professionError: boolean
  professionValue: string
}

const Profession = ({handleProfileValues, professionError, professionValue}:professionProps) => {

  const { t } = useTranslation("user")

  const handleChangeProfession = (e:React.ChangeEvent<HTMLInputElement>) => {
    const {value, name} = e.target
    handleProfileValues(name,value)
  }

  return (
    <div>
      <div className="w-fit mx-auto my-3 p-2 bg-DarkBlueGray border-4 border-Blue-Gray rounded-xl -rotate-1 text-xl text-white">
            <h2>{t("profession")}</h2>
      </div>
      <h3 className="text-center text-lg mb-2">{t("professionMessage")}</h3>
      <input className="input rotate-0 mb-1" type="text" name="profession" value={professionValue} onChange={handleChangeProfession} />
      {
        professionError && (
          <div className="profileError">
          <p>{t("professionError")}</p>
          </div>
        )
      }
    </div>
  )
}

export default Profession