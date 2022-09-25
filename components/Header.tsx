import Logo from "./header/Logo"
import Input from "./header/Input"
import { useTranslation } from "next-i18next"
import Account from "./header/Account"
import Navbar from "./header/Navbar"
import Language from "./header/Language"
import { useAuthValue } from "../pages/AuthContext"

const Header= () => {
  const { t } = useTranslation('header')
  const { currentUser } = useAuthValue()
  console.log("🚀 ~ file: Header.tsx ~ line 12 ~ Header ~ currentUser", currentUser)

return (
    <header className="sticky top-0 z-40 flex items-center justify-between h-[4.5rem] bg-Blue-Gray/70 m-2 lg:m-4  rounded-xl -rotate-1 backdrop-blur-sm shadow-inner drop-shadow-md px-3 sm:px-4 md:px-5 shadow-Blue-Gray/50">
        <Logo />
        <Navbar />
        <div className="flex items-center space-x-3">
        <Input placeholder={t("placeholder")}/>
        <Language />        
        <Account />
        </div>
    </header>
  )
}


export default Header