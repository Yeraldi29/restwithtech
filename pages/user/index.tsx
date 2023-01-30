import {
  collection,
  DocumentData,
  getDocs,
  query,
  QueryDocumentSnapshot,
  where,
} from "firebase/firestore";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import { useRouter } from "next/router";
import { ReactElement, useEffect, useState } from "react";
import Layout from "../../components/Layout";
import Loading from "../../components/Loading";
import UserNews from "../../components/user/UserNews";
import UserProfile from "../../components/user/UserProfile";
import EditProfile from "../../components/user/userProfile/EditProfile";
import { db } from "../../firebase";
import { useAuthValue } from "../../store/AuthContext";
import { useUserProfileContent } from "../../store/UserContext";
import { NextPageWithLayout } from "../_app";

const User: NextPageWithLayout = () => {
  const [userProfile, setUserProfile] =
    useState<QueryDocumentSnapshot<DocumentData> | null>(null);
  const [loading, setLoading] = useState(true);
  const [docUserNoExist, setDocUserNoExist] = useState(false);

  const { currentUser, profile } = useAuthValue();

  const { t } = useTranslation("user");
  const { done, editProfile } = useUserProfileContent();
  const router = useRouter();

  useEffect(() => {
    const handleDocUser = async () => {
      if (currentUser?.uid) {
        setLoading(true);
        const docUser = query(
          collection(db, "users"),
          where("uid", "==", currentUser.uid)
        );
        const getDocUser = await getDocs(docUser);

        if (getDocUser.empty) {
          setDocUserNoExist(true)
        } else {
          setUserProfile(getDocUser.docs[0]);
          setDocUserNoExist(false)
        }
        setLoading(false);
      }
    };

    if (currentUser && profile === "profile") {
      handleDocUser();
    }else if (profile === "account") {
      router.push("/");
    }
  }, [currentUser, done]);

  return (
    <>
      <Head>
        <title>{t("user")}</title>
        <link rel="icon" href="/icon.png" />
      </Head>
      {currentUser && profile === "profile" && (
        <div className="lg:grid md:mt-4 xl:mt-8 lg:gap-x-2 lg:grid-cols-5 ">
          <div className="relative lg:flex lg:space-x-3 lg:col-span-2 ">
            <UserProfile
              descriptionProfile={userProfile?.data()?.descriptionProfile}
              loadingProfile={loading}
              userProfile={userProfile}
            />
          </div>
          {editProfile && !loading ? (
           <>
           {docUserNoExist ? (
             <EditProfile
             descriptionProfile={""}
             skill1Profile={""}
             skill2Profile={""}
             skill3Profile={""}
             professionProfile={""}
             docUserNoExist={docUserNoExist}
           />
           ):(
            <EditProfile
            descriptionProfile={userProfile?.data()?.descriptionProfile}
            skill1Profile={userProfile?.data()?.skill1}
            skill2Profile={userProfile?.data()?.skill2}
            skill3Profile={userProfile?.data()?.skill3}
            professionProfile={userProfile?.data()?.profession}
            docUserNoExist={docUserNoExist}
          />
           )}
           </>
          ) : (
            <UserNews />
          )}
        </div>
      )}
    </>
  );
};

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["header", "user", "common"])),
  },
});

User.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default User;
