import { useTranslation } from "next-i18next";
import Link from "next/link";
import { useState, useEffect, useContext } from "react";
import { useAuthValue } from "../../store/AuthContext";
import { menuClick, profileImage } from "../../store/store";
import { useUserProfileContent } from "../../store/UserContext";
import Bubbles from "../header/Navbar/Bubbles";
import SignOut from "../header/SignOut";
import ImageProfile from "./ImageProfile";

const Profile = () => {
  const [imageUser, setImageUser] = useState("");

  const { currentUser } = useAuthValue();
  const profileImg = useContext(profileImage);
  const { imageProfile } = profileImg;
  const { changeImage } = useUserProfileContent();
  const clickState = useContext(menuClick);
  const {
    clickProfile,
    handleClickBell,
    handleClickProfile,
    handleClick,
  } = clickState;
  const { t } = useTranslation("header");

  useEffect(() => {
    if (currentUser?.photoURL) {
      setImageUser(currentUser?.photoURL);
    }
  }, [currentUser]);

  useEffect(() => {
    if (changeImage && imageProfile) {
      setImageUser(imageProfile);
    }
  }, [changeImage]);

  const handleClickImageProfile = () => {
    handleClickProfile(!clickProfile);
    handleClickBell(false);
  };

  const handleClickMobileProfile = () => {
    handleClickBell(false);
    handleClick(false)
  };

  return (
    <>
      {currentUser?.photoURL && (
        <>
          <div className="hidden lg:block">
            <div onClick={handleClickImageProfile}>
              <ImageProfile src={imageUser} />
            </div>
            <div
              className={`transition duration-500 ease-in absolute bg-DarkBlueGray border-4 border-Blue-Gray w-32 h-40 flex items-center justify-center flex-col rounded-2xl z-50 right-20 ${
                !clickProfile ? "opacity-0 -top-44 " : " top-28 xl:top-32"
              }`}
            >
              <Link
                href="/user"
                onClick={() => handleClickProfile(!clickProfile)}
              >
                <div className=" border-2 rounded-lg p-3 cursor-pointer hover:opacity-50">
                  <h2 className="text-lg xl:text-xl">{t("profile")}</h2>
                </div>
              </Link>
              <div onClick={() => handleClickProfile(!clickProfile)}>
                <SignOut />
              </div>
              <Bubbles click={clickProfile} />
            </div>
          </div>
          <Link href="/user" onClick={handleClickMobileProfile}>
            <div className=" lg:hidden">
              <ImageProfile src={currentUser.photoURL} />
            </div>
          </Link>
        </>
      )}
    </>
  );
};

export default Profile;
