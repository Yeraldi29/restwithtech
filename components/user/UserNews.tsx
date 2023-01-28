import {
  collection,
  DocumentData,
  getDocs,
  query,
  QuerySnapshot,
  where,
} from "firebase/firestore";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import { useState, useEffect } from "react";
import { BiPencil, BiSad } from "react-icons/bi";
import { db } from "../../firebase";
import { useAuthValue } from "../../store/AuthContext";
import { useEditOrCreate } from "../../store/CreateContentContext";
import ItemPost from "../feed/ItemPost";
import LoadingItems from "../feed/LoadingItems";

const UserNews = () => {
  const [userNews, setUserNews] = useState<QuerySnapshot<DocumentData> | null>(
    null
  );
  const [loading, setLoading] = useState(false);

  const { currentUser } = useAuthValue();
  const { t } = useTranslation("user");
  const { handleEditNewID } = useEditOrCreate();
  const itemsLoading = new Array(1);

  useEffect(() => {
    const handleUserNews = async () => {
      if (currentUser?.uid) {
        setLoading(true);
        const queryNewsUser = query(
          collection(db, "users", `${currentUser.uid}`, "userCreateNew"),
          where("creating", "==", false)
        );
        const getNewsUser = await getDocs(queryNewsUser);
        setUserNews(getNewsUser);
        setLoading(false);
      }
    };
    handleUserNews();
  }, [currentUser]);

  return (
    <div
      className={`lg:col-span-3 w-full ${
        !userNews?.empty
          ? "border-4 border-DarkBlueGray rounded-xl p-2 sm:p-4 sm:max-w-md sm:mx-auto lg:m-0 lg:h-fit lg:max-w-none lg:w-full"
          : "h-full lg:flex lg:items-center lg:justify-center"
      }`}
    >
      <div className="w-full sm:max-w-md sm:mx-auto lg:m-0 lg:h-fit lg:max-w-none lg:w-96 lg:mx-auto">
        {loading ? (
          <>
            {[...itemsLoading].map((noValues, index) => (
              <LoadingItems index={index} key={index} />
            ))}
          </>
        ) : userNews?.empty ? (
          <div className="h-52 my-6 p-1 text-center sm:max-w-md sm:mx-auto lg:max-w-lg lg:m-0 lg:p-2 flex flex-col items-center space-x-1 justify-center border-4 border-gray-500 bg-Lavender-Blue/40 rounded-xl rotate-1">
            <h1 className="text-gray-500 text-2xl -rotate-1">{t("noNews")}</h1>
            <BiSad className="w-14 h-14 xl:w-16 xl:h-16 mx-auto text-gray-500" />
          </div>
        ) : (
          <>
            <h2 className="my-2 text-center text-2xl text-DarkBlueGray">
              {t("userNews")}
            </h2>
            {userNews?.docs.map((data, index) => (
              <div key={index}>
                <div className=" shrink-0">
                  <ItemPost
                    image={data.data().mainImage}
                    category={data.data().category}
                    time={data.data().create_at}
                    name={data.data().mainTitle}
                    option="data"
                    key={index}
                    index={index}
                    title={data.data().mainTitle}
                  />
                </div>
                <Link
                  href={"/editNew"}
                  className="w-full "
                  onClick={() => {
                    handleEditNewID(data.data().idNewPost);
                  }}
                >
                  <div className="w-fit mx-auto mt-4 p-2 flex items-center space-x-2 bg-Lavender-Blue border-4 border-DarkBlueGray lg:hover:bg-DarkBlueGray lg:hover:text-white lg:hover:border-Blue-Gray rounded-xl -rotate-1 text-3xl xl:text-4xl text-DarkBlueGray cursor-pointer  transform ease-out duration-300 ">
                    <p>{t("editNew")}</p>
                    <BiPencil className="w-12 h-12 mx-auto -rotate-12" />
                  </div>
                </Link>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default UserNews;
