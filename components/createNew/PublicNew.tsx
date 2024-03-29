import { useState, useRef } from "react";
import { useTranslation } from "next-i18next";
import { BsFilePost } from "react-icons/bs";
import { useAuthValue } from "../../store/AuthContext";
import { createNewProps } from "../../types";
import Loading from "../Loading";
import {
  doc,
  DocumentData,
  getDoc,
  QuerySnapshot,
  setDoc,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { serialize } from "../createContent/plugins/serialize";
import { useCreateNew } from "../../store/CreateContentContext";
import { db } from "../../firebase";
import { BiCheckCircle } from "react-icons/bi";
import Link from "next/link";

interface publicNewProps extends createNewProps {
  getContentBody: QuerySnapshot<DocumentData> | null;
  published: boolean;
  handlePublished: () => void;
}

const PublicNew = ({
  getDocValues,
  getDocumentName,
  getContentBody,
  published,
  handlePublished,
}: publicNewProps) => {
  const [loading, setLoading] = useState(false);
  const linkRef = useRef<HTMLAnchorElement | null>(null);

  const { t } = useTranslation("createNew");
  const { currentUser } = useAuthValue();
  const { errors, handleErrors } = useCreateNew();

  const handlePublicNew = async () => {
    if (getDocValues?.data().mainTitle === undefined) {
      handleErrors("mainTitle", true);
    } else if (getDocValues?.data().category === undefined) {
      handleErrors("category", true);
    } else if ((await getDocValues?.data().mainImage) === undefined) {
      handleErrors("mainImage", true);
    } else if (!getContentBody) {
      handleErrors("contentBody1", true);
    } else {
      let textLength = 0;

      await getContentBody?.docs.map((doc) => {
        if (doc.data().option === "paragraph") {
          textLength += serialize(JSON.parse(doc.data().data)).length;
        }
      });

      if (textLength <= 300) {
        handleErrors("contentBody2", true);
      } else {
        if (currentUser?.uid) {
          setLoading(true);

          const docNew = doc(db, "news", getDocValues.data().mainTitle);
          const docUser = await getDoc(doc(db, "users", currentUser.uid));

          await setDoc(docNew, {
            mainTitle: getDocValues.data().mainTitle,
            mainImage: getDocValues.data().mainImage,
            category: getDocValues.data().category,
            create_at: Timestamp.now(),
            userName: docUser.data()?.userName,
            descriptionProfile: docUser.data()?.descriptionProfile,
            profession: docUser.data()?.profession,
            profileImage: currentUser.photoURL,
            skill1: docUser.data()?.skill1,
            skill2: docUser.data()?.skill2,
            skill3: docUser.data()?.skill3,
            userId: currentUser.uid,
          }).then(async () => {
            getContentBody.docs.map(async (docContent, index) => {
              const docNewContent = doc(
                db,
                "news",
                `${getDocValues.data().mainTitle}`,
                "content",
                `${index + 1}`
              );
              if (docContent.data().option === "paragraph") {
                await setDoc(docNewContent, {
                  data: docContent.data().data,
                  order: index + 1,
                  option: "paragraph",
                });
              } else if (docContent.data().option === "image") {
                await setDoc(docNewContent, {
                  data: docContent.data().image,
                  order: index + 1,
                  option: "image",
                });
              }
            });
            const docUserCreateNew = doc(
              db,
              "users",
              currentUser.uid,
              "userCreateNew",
              `${getDocumentName}`
            );

            await updateDoc(docUserCreateNew, {
              creating: false,
            }).then(() => {
              setLoading(false);
              handlePublished();
              setInterval(() => {
                if (linkRef.current) {
                  linkRef?.current?.click();
                }
              }, 1500);
            });
          });
        }
      }
    }
  };

  return (
    <>
      {!published && (
        <>
          <div
            className="mt-4 w-full flex justify-end items-center space-x-1"
            onClick={handlePublicNew}
          >
            {loading && <Loading />}
            <div className=" mb-4 w-fit p-1 py-2 bg-green-400 rounded-xl flex items-center space-x-1 text-white border-4 border-Blue-Gray saveOrPublish">
              <BsFilePost className="w-12 h-12 -rotate-12" />
              <h3 className="text-xl">{t("public")}</h3>
            </div>
          </div>
          {errors.mainTitle ? (
            <div className="profileError mb-4">
              <p>{t("errorPublish.mainTitle")}</p>
            </div>
          ) : errors.category ? (
            <div className="profileError mb-4">
              <p>{t("errorPublish.category")}</p>
            </div>
          ) : errors.mainImage ? (
            <div className="profileError mb-4">
              <p>{t("errorPublish.mainImage")}</p>
            </div>
          ) : errors.contentBody1 ? (
            <div className="profileError mb-4">
              <p>{t("errorPublish.contentBody1")}</p>
            </div>
          ) : (
            errors.contentBody2 && (
              <div className="profileError mb-4">
                <p>{t("errorPublish.contentBody2")}</p>
              </div>
            )
          )}
        </>
      )}
      {published && (
        <div className="mt-8 w-full h-96 flex flex-col items-center justify-center bg-green-400 border-4 border-Blue-Gray rounded-xl rotate-1 text-2xl  sm:mx-16 sm:w-auto md:mx-36 lg:mx-0">
          <h1 className="text-center">{t("published")}</h1>
          <BiCheckCircle className="w-12 h-12 -rotate-12 text-white" />
          <h1>{t("redirected")}</h1>
        </div>
      )}
      <Link href="/" hidden ref={linkRef}></Link>
    </>
  );
};

export default PublicNew;
