import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import Image from "next/image";
import { NextPageWithLayout } from "./_app";

const Custom404: NextPageWithLayout = () => {
  const { t } = useTranslation("404");

  return (
    <>
      <Head>
        <title>404</title>
        <link rel="icon" href="/icon.png" />
      </Head>
      <div className=" w-screen h-screen flex flex-col items-center justify-center space-x-2">
        <h1 className="text-DarkBlueGray text-5xl xl:text-6xl text-center">
          <span className="text-BlueDarker">404</span>
          <span> </span>
          {t("alert")}
        </h1>
        <div className=" w-full max-w-sm h-[22rem] sm:h-96 mx-auto -rotate-1 my-3  sm:my-6 lg:col-span-2 lg:m-0 lg:mb-6 lg:mt-10 xl:max-w-md xl:h-[28rem] sticky top-20">
          <Image
            className="border-4 border-DarkBlueGray bg-DarkBlueGray rounded-xl mx-auto "
            src={"/gift404.gif"}
            alt="404"
            fill
          />
        </div>
      </div>
    </>
  );
};

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["404"])),
  },
});

Custom404.getLayout = (page) => page;

export default Custom404;
