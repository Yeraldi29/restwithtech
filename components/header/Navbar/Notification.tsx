import { useContext } from "react";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import { menuClick } from "../../../store/store";
import ImageProfile from "../../profile/ImageProfile";

interface NotificationProps {
  imageProfile: string;
  newTitle: string;
  reason: string;
  username: string;
  category: string;
}

const Notification = ({
  imageProfile,
  newTitle,
  reason,
  username,
  category,
}: NotificationProps) => {
  const { t } = useTranslation("header");
  const clickState = useContext(menuClick);
  const { handleClickBell } = clickState;

  return (
    <Link
      href={`/${category}/${newTitle}`}
      onClick={() => handleClickBell(false)}
    >
      <div className="flex items-center space-x-4 xl:text-lg text-white bg-BabyBlueEyes border-b-4 border-Blue-Gray border-dashed p-4 pl-2 break-all cursor-pointer group lg:hover:bg-white">
        <div className=" shrink-0">
          <ImageProfile src={imageProfile} />
        </div>
        <div>
          <div>
            <h3 className="mt-1 text-lg xl:text-xl text-BlueDarker ">
              {username} <span> </span>
              {reason === "new" ? (
                <span className="text-white group-hover:text-DarkBlueGray">
                  {t("notifications.new")}
                </span>
              ) : reason === "replied" ? (
                <span className="text-white group-hover:text-DarkBlueGray">
                  {t("notifications.replied")}
                </span>
              ) : (
                reason === "like" && (
                  <>
                    <span>{t("notifications.to")}</span>
                    <span> </span>
                    <span className="text-white group-hover:text-DarkBlueGray">
                      {t("notifications.liked")}
                    </span>
                  </>
                )
              )}
            </h3>
          </div>
          <div className="bg-DarkBlueGray border-2 border-Blue-Gray rounded-md p-1">
            <h3>{newTitle}</h3>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Notification;
