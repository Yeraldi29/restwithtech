import type { ReactElement } from "react";
import Head from "next/head";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { NextPageWithLayout } from "../_app";
import Layout from "../../components/Layout";
import SearchInput from "../../components/SearchInput";
import { useTranslation } from "next-i18next";

const Searcher: NextPageWithLayout = () => {
  const { t } = useTranslation("search");
  
  return (
    <>
      <Head>
        <title>{t("title")}</title>
        <link rel="icon" href="/icon.png" />
      </Head>
      <SearchInput />
    </>
  );
};

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["header", "search"])),
  },
});

Searcher.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Searcher;
