import {
  collection,
  doc,
  DocumentData,
  getDocs,
  limit,
  orderBy,
  query,
  QuerySnapshot,
  updateDoc,
  where,
} from "firebase/firestore";
import { useTranslation } from "next-i18next";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { BiBell, BiNoEntry } from "react-icons/bi";
import { db } from "../../../firebase";
import { useAuthValue } from "../../../store/AuthContext";
import { menuClick } from "../../../store/store";
import Notification from "./Notification";

const Notifications = () => {
  const [getNofications, setGetNotifications] =
    useState<QuerySnapshot<DocumentData> | null>(null);
  const [newNotifications, setNewNotifications] = useState(false);
  const [unreadNotifications, setUnreadNotifications] =
    useState<QuerySnapshot<DocumentData> | null>(null);
  const [notificationsLenght, setNotificationsLenght] = useState(0);
  const [limitNumber, setLimitNumber] = useState(6);

  const clickState = useContext(menuClick);
  const { currentUser } = useAuthValue();
  const { clickBell, handleClick, handleClickBell, handleClickProfile } =
    clickState;
  const { t } = useTranslation("header");

  useEffect(() => {
    const handleGetNotifications = async () => {
      const queryNotifications = query(
        collection(db, "users", `${currentUser?.uid}`, "notifications"),
        orderBy("create_at", "desc"),
        limit(limitNumber)
      );
      const queryNewNotifications = query(
        collection(db, "users", `${currentUser?.uid}`, "notifications"),
        where("read", "==", false)
      );
      const docsNotificationsLenght = (
        await getDocs(
          collection(db, "users", `${currentUser?.uid}`, "notifications")
        )
      ).docs.length;

      const docsNotifications = await getDocs(queryNotifications);
      const getNewNotifications = await getDocs(queryNewNotifications);

      if (getNewNotifications.empty) {
        setNewNotifications(false);
        setUnreadNotifications(null);
      } else {
        setNewNotifications(true);
        setUnreadNotifications(getNewNotifications);
      }

      setGetNotifications(docsNotifications);
      setNotificationsLenght(docsNotificationsLenght);
    };

    handleGetNotifications();
  }, [currentUser, limitNumber]);

  const handleClickNotification = async () => {
    handleClick(false);
    handleClickBell(!clickBell);
    handleClickProfile(false);

    await unreadNotifications?.docs.map(async (notification) => {
      const docNotification = doc(
        db,
        `users/${currentUser?.uid}/notifications/${
          notification.data().idNotification
        }`
      );

      await updateDoc(docNotification, {
        read: true,
      });
    });

    setNewNotifications(false);
  };

  return (
    <>
      <div className="relative" onClick={handleClickNotification}>
        <BiBell className=" w-6 h-6 xl:w-7 xl:h-7 mx-auto -rotate-12 lg:hover:rotateItem cursor-pointer " />
        {newNotifications && (
          <div className="absolute bottom-0 left-4 w-2 h-2 xl:w-[10px] xl:h-[10px] rounded-full bg-red-500 animate-pulse"></div>
        )}
        {clickBell && (
          <div>
            <div
              className={`${
                clickBell && " animate-expand "
              }  absolute w-6 h-6 bg-DarkBlueGray rounded-full border border-Blue-Gray -bottom-14 left-0 `}
            ></div>
            <div
              className={`${
                clickBell && " animate-expand"
              }  absolute w-5 h-5 bg-DarkBlueGray rounded-full border border-Blue-Gray -bottom-8 -left-3  `}
            ></div>
            <div
              className={`${
                clickBell && " animate-expand"
              }  absolute w-4 h-4 bg-DarkBlueGray rounded-full border border-Blue-Gray -bottom-4 left-1  `}
            ></div>
          </div>
        )}
      </div>
      <div
        className={`absolute ${
          clickBell
            ? "top-[6.7rem] right-2 xl:top-[7.5rem]"
            : "-top-[30rem] right-0"
        } transform duration-500 ease-out bg-DarkBlueGray border-4 border-Blue-Gray w-[22rem] h-[26.5rem] z-50 rounded-2xl
    overflow-auto scrollbar-thin scrollbar-thumb-rounded-lg scrollbar-track-transparent scrollbar-thumb-BlueDarker`}
      >
        {getNofications?.empty ? (
          <div className="w-full h-full flex flex-col items-center justify-center text-2xl">
            <h2>{t("notifications.empty")}</h2>
            <BiNoEntry className="w-12 h-12 xl:w-14 xl:h-14 -rotate-12" />
          </div>
        ) : (
          <>
            {getNofications?.docs.map((notification, index) => (
              <Notification
                key={index}
                imageProfile={notification.data().imageProfile}
                newTitle={notification.data().new}
                reason={notification.data().reason}
                username={notification.data().username}
                category={notification.data().category}
              />
            ))}
            {notificationsLenght > limitNumber && (
              <div
                className="bg-BabyBlueEyes text-BlueDarker hover:bg-DarkBlueGray hover:text-white w-fit mx-auto mt-2 border-4 border-Blue-Gray rounded-lg rotate-1 p-1  cursor-pointer transform ease-in-out duration-500 md:text-lg xl:text-xl md:p-2"
                onClick={() => setLimitNumber(limitNumber + 10)}
              >
                <h3>{t("notifications.see")}</h3>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Notifications;
