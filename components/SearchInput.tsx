import { useTranslation } from "next-i18next";
import { BiSearch } from "react-icons/bi";

const SearchInput = () => {
  const { t } = useTranslation("search");

  return (
    <div className="mt-4 sm:mt-6">
      <form className="w-full sm:max-w-xl lg:max-w-2xl sm:mx-auto h-14 relative flex items-center space-x-1 border-4 border-Blue-Gray rounded-xl bg-DarkBlueGray pr-2">
        <div className="w-full ">
          <input
            className="w-full bg-transparent border-0 text-lg focus:outline-none focus:border-0 focus:ring-0 placeholder:text-BabyBlueEyes"
            type="text"
            name="search"
            placeholder={t("placeholder")}
          />
        </div>
        <button className=" shrink-0" type="submit">
          <BiSearch className=" w-7 h-7 xl:w-8 xl:h-8 mx-auto -rotate-12" />
        </button>
      </form>
    </div>
  );
};

export default SearchInput;
