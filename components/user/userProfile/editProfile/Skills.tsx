import { useTranslation } from "next-i18next"

interface SkillProps {
  handleProfileValues: (name: string, value: string) => void
  skill1Error: boolean
  skill2Error: boolean
  skill3Error: boolean
  skill1Value: string
  skill2Value: string
  skill3Value: string
}

const Skills = ({handleProfileValues, skill1Error, skill2Error, skill3Error, skill1Value, skill2Value, skill3Value}:SkillProps) => {

  const { t } = useTranslation("user")

  const handleChangeSkills = (e:React.ChangeEvent<HTMLInputElement>) => {
    const {value, name} = e.target
    handleProfileValues(name,value)
  }

  return (
    <div>
      <div className="w-fit mx-auto my-3 p-2 bg-DarkBlueGray border-4 border-Blue-Gray rounded-xl rotate-1 text-xl text-white">
            <h2>{t("skills")}</h2>
      </div>
       <h3 className="text-center text-lg mb-4">{t("skillsMessage")}</h3>

       <h4 className="mt-2">{t("skill")} <span>1</span></h4>
       <input className="input rotate-0 mt-0 mb-1" type="text" name="skill1" value={skill1Value} onChange={handleChangeSkills}/>
       {
         skill1Error && (
            <div className="profileError">
             <p>{t("skillsError")}</p>
            </div>
          )
        }
       <h4 className="mt-2">{t("skill")} <span>2</span></h4>
       <input className="input rotate-0 mt-0 mb-1" type="text" name="skill2" value={skill2Value} onChange={handleChangeSkills}/>
       {
         skill2Error && (
            <div className="profileError">
             <p>{t("skillsError")}</p>
            </div>
          )
        }
       <h4 className="mt-2">{t("skill")} <span>3</span></h4>
       <input className="input rotate-0 mt-0 mb-1" type="text" name="skill3" value={skill3Value} onChange={handleChangeSkills}/>
       {
         skill3Error && (
            <div className="profileError">
             <p>{t("skillsError")}</p>
            </div>
          )
        }
    </div>
  )
}

export default Skills