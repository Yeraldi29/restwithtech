import { useContext } from "react";
import { useTranslation } from "next-i18next";
import { BiPlus } from "react-icons/bi";
import { menuClick, postNewExpand } from "../../store/store";
import Link from "next/link";

const PostNew = () => {
  const { t } = useTranslation("header");
  const expand = useContext(postNewExpand);
  const { NewExpand, handleNewExpand } = expand;
  const clickState = useContext(menuClick);
  const { handleClickProfile, handleClickBell } = clickState;

  const handleClickPostNew = () => {
    handleClickBell(false);
    handleClickProfile(false);
  };

  return (
    <Link href={"/createNew"} onClick={handleClickPostNew}>
      <div
        className={`bg-Lavender-Blue rounded-xl text-DarkBlueGray w-24 h-11 xl:h-14  mx-auto mt-3 -mb-5 lg:my-0 flex items-center justify-center border-2 cursor-pointer group ${
          NewExpand ? "lg:w-28 " : "lg:w-11 xl:w-14"
        } duration-300 ease-in-out transform overflow-hidden`}
        onMouseOver={() => handleNewExpand(true)}
        onMouseLeave={() => handleNewExpand(false)}
      >
        <BiPlus className=" w-9 h-9 xl:w-11 xl:h-11 -rotate-12 lg:group-hover:scale-125 duration-200 ease-in" />
        <h2
          className={`pr-1 ${
            NewExpand
              ? " lg:opacity-100"
              : " lg:opacity-0 lg:absolute lg:-right-6 "
          } duration-300 ease-in-out transition`}
        >
          {t("postNew").toUpperCase()}
        </h2>
      </div>
    </Link>
  );
};

export default PostNew;
