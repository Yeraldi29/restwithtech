import Logo from "./header/Logo"
import Input from "./header/Input"
import { useTranslation } from "next-i18next"

const Header= () => {
  const { t } = useTranslation('header')

return (
    <header className="h-24 bg-quick-silver px-5 rounded-b-2xl opacity-90 sticky">
      <div className="flex items-center justify-between py-2">
        <Logo />
        <Input placeholder={t("placeholder")}/>
      </div>
    </header>
  )
}


export default Header