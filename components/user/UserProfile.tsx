import { useContext, useEffect, useState } from "react";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import { useAuthValue } from "../../store/AuthContext";
import { profileImage } from "../../store/store";
import { useUserProfileContent } from "../../store/UserContext";
import UploadImage from "../forms/UploadImage";
import { updateProfile } from "firebase/auth";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { storage } from "../../firebase";
import Loading from "../Loading";

const UserProfile = ({
  descriptionProfile,
  loadingProfile,
}: {
  descriptionProfile: string;
  loadingProfile: boolean;
}) => {
  const [imageUser, setImageUser] = useState("");
  const [loading, setLoading] = useState(false);
  const [updateImage, setUpdateImage] = useState(false);

  const { currentUser } = useAuthValue();
  const { editProfile, handleEditProfile, handleChangeImage } =
    useUserProfileContent();
  const profileImg = useContext(profileImage);
  const { imageProfile, handleClickImage } = profileImg;
  const { t } = useTranslation("user");

  useEffect(() => {
    if (currentUser?.photoURL) {
      setImageUser(currentUser?.photoURL);
    }
  }, [currentUser]);

  useEffect(() => {
    if (imageProfile && updateImage) {
      const uploadImageProfile = uploadString(
        ref(storage, `users/${currentUser?.uid}`),
        imageProfile,
        "data_url"
      );

      handleClickImage(null);

      handleChangeImage(false);
      uploadImageProfile.then((snap) => {
        getDownloadURL(snap.ref).then((url) => {
          if (currentUser) {
            updateProfile(currentUser, {
              photoURL: url,
            })
              .then(() => {
                if (currentUser?.photoURL) {
                  setImageUser(imageProfile);
                  handleClickImage(imageProfile);
                  setLoading(false);
                  handleChangeImage(true);
                  handleUpdateImage(false);
                }
              })
              .catch((err) => {
                alert(err.message);
                handleClickImage(null);
                setLoading(false);
                handleChangeImage(false);
                handleUpdateImage(false);
              });
          }
        });
      });
      handleChangeImage(false);
    }
  }, [updateImage]);

  const handleUpdateImage = (option: boolean) => {
    setUpdateImage(option);
  };

  return (
    <div className="mb-4 border-4 border-DarkBlueGray text-BlueDarker rounded-xl mt-4 p-2 sm:max-w-md sm:mx-auto lg:sticky top-24 lg:m-0 lg:h-fit lg:max-w-none lg:w-96">
      <div className="lg:sticky">
        <div className="flex items-center justify-center lg:flex-col space-x-4 rounded-xl p-2 py-4 ">
          {currentUser?.photoURL && (
            <div className=" w-28 h-28 sm:w-36 sm:h-36  relative imageProfile bg-DarkBlueGray border-DarkBlueGray ">
              <Image src={imageUser} alt="user's image" fill />
            </div>
          )}
          <div className=" max-w-[12rem] break-words lg:mt-4">
            <h1 className="text-2xl xl:text-3xl">{currentUser?.displayName}</h1>
          </div>
        </div>
        {loading ? (
          <Loading />
        ) : (
          descriptionProfile !== "" &&
          !loadingProfile && (
            <>
              {editProfile && (
                <div
                  className={`w-fit mx-auto -mb-4${
                    loading ? "-mt-2" : " -mt-8"
                  }`}
                >
                  <UploadImage
                    handleUpdateImage={handleUpdateImage}
                    message={t("changeImage")}
                  />
                </div>
              )}
              <div
                className={`text-white xl:text-lg bg-DarkBlueGray mb-2 ${
                  !editProfile && "mt-4"
                } p-2 border-4 border-Blue-Gray rounded-xl`}
              >
                <p>{descriptionProfile}</p>
              </div>
              {!editProfile && (
                <div
                  className="w-fit mx-auto mb-3 p-2 border-4 border-DarkBlueGray bg-Lavender-Blue hover:bg-DarkBlueGray hover:text-white hover:border-Blue-Gray rounded-xl -rotate-1 text-xl xl:text-2xl text-DarkBlueGray cursor-pointer  transform ease-out duration-300"
                  onClick={() => handleEditProfile(true)}
                >
                  <h2>{t("editProfile")}</h2>
                </div>
              )}
            </>
          )
        )}
      </div>
    </div>
  );
};

export default UserProfile;
