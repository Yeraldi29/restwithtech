import { useContext, useEffect } from "react";
import Logo from "./header/Logo";
import Input from "./header/Input";
import Account from "./header/Account";
import Navbar from "./header/Navbar";
import Language from "./header/Language";
import Profile from "./profile/Profile";
import { useAuthValue } from "../store/AuthContext";
import PostNew from "./header/PostNew";
import { postNewExpand } from "../store/store";
import Notifications from "./header/Navbar/Notifications";

const Header = () => {
  const { profile } = useAuthValue();
  const expand = useContext(postNewExpand);
  const { NewExpand } = expand;

  return (
    <header className="sticky top-0 z-40 flex items-center justify-between h-[4.5rem] xl:h-[5.5rem] bg-Blue-Gray my-2 lg:my-4 lg:mb-2  rounded-xl shadow-inner drop-shadow-md px-3 sm:px-4 md:px-5 shadow-Blue-Gray/50">
      <Logo />
      <Navbar />
      <div className="flex items-center space-x-4">
        <Input />
        <div className={`${NewExpand && "lg:hidden"}`}>
          <Language />
        </div>
        {profile === "account" ? (
          <Account />
        ) : (
          profile === "profile" && (
            <>
              <Notifications />
              <div className={`${NewExpand && "lg:hidden"}`}>
                <Profile />
              </div>
              <div className=" hidden lg:flex">
                <PostNew />
              </div>
            </>
          )
        )}
        {profile === "wait" && (
          <div className="flex items-center space-x-1">
            <div className="w-4 h-4 rounded-full bg-Lavender-Blue drop-shadow-xl animate-expand_close"></div>
            <div className="w-5 h-5 rounded-full bg-Lavender-Blue drop-shadow-xl animate-expand_close"></div>
            <div className="w-6 h-6 rounded-full bg-Lavender-Blue drop-shadow-xl animate-expand_close"></div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
