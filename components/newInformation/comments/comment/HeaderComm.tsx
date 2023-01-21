import { Timestamp } from "firebase/firestore";
import { useTranslation } from "next-i18next";
import { useCurrentTime } from "../../../../Hooks/useCurrentTime";
import { useAuthValue } from "../../../../store/AuthContext";
import ImageProfile from "../../../profile/ImageProfile";

interface HeaderCommProps {
  username: string | null;
  imageProfile: string;
  create_at: Timestamp;
  author: boolean;
}

const HeaderComm = ({
  username,
  imageProfile,
  create_at,
  author,
}: HeaderCommProps) => {
  const { t } = useTranslation("newPost");
  const { currentUser } = useAuthValue();
  const { timeString } = useCurrentTime(create_at);

  return (
    <div
      className={`flex items-center justify-between w-full border-4 border-b-0  p-2  rounded-xl ${
        username === currentUser?.displayName
          ? "border-DarkBlueGray bg-Blue-Gray"
          : "border-Blue-Gray bg-DarkBlueGray"
      }`}
    >
      <div className="flex items-center space-x-2">
        <ImageProfile src={imageProfile} />
        {author ? (
          <div>
            <h3 className="text-lg md:text-xl xl:text-2xl">{username}</h3>
            <div
              className={`w-fit rounded-lg border-2 p-1 ${
                username === currentUser?.displayName
                  ? "bg-DarkBlueGray"
                  : "bg-BabyBlueEyes"
              }`}
            >
              <h4 className="md:text-lg xl:text-xl">{t("author")}</h4>
            </div>
          </div>
        ) : (
          <h3 className="text-lg md:text-xl xl:text-2xl">{username}</h3>
        )}
      </div>
      <h5
        className={`text-base font-semibold xl:text-lg  ${
          username === currentUser?.displayName
            ? "text-BlueDarker"
            : "text-BabyBlueEyes"
        }`}
      >
        {timeString}
      </h5>
    </div>
  );
};

export default HeaderComm;
