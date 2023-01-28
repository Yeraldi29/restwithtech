import { collection, getDocs, query, where } from "firebase/firestore";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import { useRouter } from "next/router";
import { ReactElement, useEffect } from "react";
import CreateYourNew from "../../components/createNew/CreateYourNew";
import Layout from "../../components/Layout";
import { db } from "../../firebase";
import { useAuthValue } from "../../store/AuthContext";

const EditNew = () => {
  const { currentUser } = useAuthValue();
  const router = useRouter();
  const { t } = useTranslation("createNew");

  useEffect(() => {
    const handleurlPost = async () => {
      if (currentUser?.uid) {
        const docUser = query(
          collection(db, "users"),
          where("uid", "==", currentUser.uid)
        );
        const getDocUser = await getDocs(docUser);

        if (!getDocUser.empty) {
          if (getDocUser.docs[0].data().descriptionProfile === "") {
            router.push("/user");
          }
        }
        if (!currentUser) {
          router.push("/");
        }
      }
    };
    handleurlPost();
  }, [currentUser]);

  return (
    <>
      <Head>
        <title>{t("titlePageEdit")}</title>
        <link rel="icon" href="/icon.png" />
      </Head>
      <CreateYourNew editOrCreate="edit" />
    </>
  );
};

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, [
      "header",
      "createNew",
      "newPost",
    ])),
  },
});

EditNew.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default EditNew;
