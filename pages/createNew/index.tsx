import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import { ReactElement, useEffect } from "react";
import Layout from "../../components/Layout";
import { useAuthValue } from "../../store/AuthContext";
import { NextPageWithLayout } from "../_app";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import CreateYourNew from "../../components/createNew/CreateYourNew";
import { useUserProfileContent } from "../../store/UserContext";

const CreateNew: NextPageWithLayout = () => {
  const { currentUser } = useAuthValue();
  const router = useRouter();
  const { handleEditProfile } = useUserProfileContent();
  const { t } = useTranslation("createNew");

  useEffect(() => {
    const handleurlPost = async () => {
      if (currentUser?.uid) {
        const docUser = query(
          collection(db, "users"),
          where("uid", "==", currentUser.uid)
        );
        const getDocUser = await getDocs(docUser);

        if (getDocUser.empty) {
          router.push("/user");
          handleEditProfile(true);
        } else {
          if (getDocUser.docs[0].data().descriptionProfile === "") {
            router.push("/user");
            handleEditProfile(true);
          }
        }
      }
    };
    handleurlPost();
    if (!currentUser) {
      router.push("/");
    }
  }, [currentUser]);

  return (
    <>
      {currentUser && (
        <>
          <Head>
            <title>{t("titlePageCreate")}</title>
            <link rel="icon" href="/icon.png" />
          </Head>
          <CreateYourNew editOrCreate="create" />
        </>
      )}
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

CreateNew.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default CreateNew;
