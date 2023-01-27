import Link from "next/link";
import { useState } from "react";
import { BiSearch } from "react-icons/bi";

const Input = () => {
  const [click, setClick] = useState(false);

  return (
    <Link href={"/searcher"} className="relative cursor-pointer">
      <div
        className={`${
          click && "animate-wiggle text-DarkBlueGray"
        } flex items-center  lg:hover:rotateItem`}
        onClick={() => setClick(true)}
        onAnimationEnd={() => setClick(false)}
      >
        <BiSearch className=" w-6 h-6 xl:w-7 xl:h-7 mx-auto -rotate-12" />
      </div>
    </Link>
  );
};

export default Input;
