import { ReactElement, useState, useEffect } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import { NextPageWithLayout } from "../_app";
import { SO } from "../../arrays/feedImages/SO";
import NewInformation from "../../components/NewInformation";
import { newData } from "../../initialProps";
import { itemProps, newDataProps } from "../../types";
import {
  collection,
  doc,
  DocumentData,
  DocumentSnapshot,
  getDoc,
  getDocs,
  orderBy,
  query,
  QuerySnapshot,
  where,
} from "firebase/firestore";
import { db } from "../../firebase";
import LoadingNew from "../../components/loading/LoadingNew";

const New: NextPageWithLayout = () => {
  const router = useRouter();
  const { newPost } = router.query;
  const [getData, setGetData] = useState<DocumentSnapshot<DocumentData> | null>(
    null
  );
  const [getContentData, setGetContentData] =
    useState<QuerySnapshot<DocumentData> | null>(null);
  const [falseData, setFalseData] = useState<Array<newDataProps> | null>(
    newData
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleGetDoc = async () => {
      const falseData = await SO.filter((data) => data.title === newPost);

      if (falseData.length === 0) {
        const docData = await getDoc(doc(db, `news/${newPost}`));
        const contentData = await getDocs(
          query(
            collection(db, "news", `${newPost}`, "content"),
            orderBy("order")
          )
        );

        setGetData(docData);
        setGetContentData(contentData);
        setLoading(false);
      } else {
        setFalseData(falseData);
        setLoading(false);
      }
    };
    handleGetDoc();
  }, [newPost]);

  return (
    <>
      <Head>
        <title>{newPost}</title>
        <link rel="icon" href="/icon.png" />
      </Head>
      {loading ? (
        <LoadingNew />
      ) : (
        <>
          {getData ? (
            <NewInformation
              image={getData.data()?.mainImage}
              title={getData.data()?.mainTitle}
              category={getData.data()?.category}
              name={getData.data()?.userName}
              option="data"
              time={getData.data()?.create_at}
              idNewPost={getData.data()?.mainTitle}
              profession={getData.data()?.profession}
              descriptionProfile={getData.data()?.descriptionProfile}
              profileImage={getData.data()?.profileImage}
              skill1={getData.data()?.skill1}
              skill2={getData.data()?.skill2}
              skill3={getData.data()?.skill3}
              content={getContentData}
              userId={getData.data()?.userId}
            />
          ) : (
            falseData && (
              <NewInformation
                image={falseData[0].image}
                title={falseData[0].title}
                category={falseData[0].category}
                name={falseData[0].name}
                option="fakeData"
                timeFake={falseData[0].time}
                idNewPost={falseData[0].idNewPost}
              />
            )
          )}
        </>
      )}
    </>
  );
};

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["header", "newPost", "common"])),
  },
});

export const getStaticPaths = async ({locales}: {locales: Array<string>}) => {
  const data = await getDocs(
    query(collection(db, "news"), where("category", "==", "OS"))
  );

  const paths = data.docs.flatMap((item) => {
      return locales.map((locale) => {
        return {
          params: { newPost: `${item.data().mainTitle}` },
          locale: locale,
        };
      });
    }).concat(
      SO.flatMap((item) => {
        return locales.map((locale) => {
          return {
            params: { newPost: item.title },
            locale: locale,
          };
        });
      })
    );
  return { paths, fallback: true };
};

New.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default New;
