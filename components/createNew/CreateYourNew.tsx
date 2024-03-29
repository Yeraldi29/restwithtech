import { useState, useEffect } from "react";
import { useTranslation } from "next-i18next";
import { BiPencil } from "react-icons/bi";
import CreateNewOptions from "./CreateNewOptions";
import MainTitle from "./MainTitle";
import MainImage from "./MainImage";
import { useAuthValue } from "../../store/AuthContext";
import {
  collection,
  doc,
  DocumentData,
  getDoc,
  getDocs,
  orderBy,
  query,
  QuerySnapshot,
  setDoc,
  where,
} from "firebase/firestore";
import { db } from "../../firebase";
import { nanoid } from "nanoid";
import Loading from "../Loading";
import Image from "next/image";
import CreateParagraph from "../createContent/CreateParagraph";
import ContentBody from "./ContentBody";
import {
  useCreateNew,
  useEditOrCreate,
  useSlateSaveContent,
} from "../../store/CreateContentContext";
import ChooseCategory from "./ChooseCategory";
import PublicNew from "./PublicNew";
import { useRouter } from "next/router";

const CreateYourNew = ({ editOrCreate }: { editOrCreate: string }) => {
  const [getDocumentName, setDocumentName] = useState("");
  const [getDocValues, setGetDocValues] = useState<DocumentData | null>(null);
  const [getContentBody, setGetContentBody] =
    useState<QuerySnapshot<DocumentData> | null>(null);
  const [loadingContent, setLoadingContent] = useState(true);
  const [stopLoading, setStopLoading] = useState(false);
  const [addCreateParagraph, setAddCreateParagraph] = useState(false);
  const [previewContent, setPreviewContent] = useState(false);
  const [published, setPublished] = useState(false);

  const { t } = useTranslation("createNew");
  const { currentUser } = useAuthValue();
  const { loadContentBody } = useSlateSaveContent();
  const { errors } = useCreateNew();
  const { editNewID } = useEditOrCreate();
  const router = useRouter();

  useEffect(() => {
    const handleGetValuesCreateNew = async () => {
      if (currentUser?.uid) {
        if (editOrCreate === "create") {
          const docsUserCreateNew = await getDocs(
            collection(db, "users", currentUser.uid, "userCreateNew")
          );

          if (docsUserCreateNew.empty) {
            const randomId = nanoid();

            setDocumentName(`${randomId}`);
            const docUserCreateNew = doc(
              db,
              "users",
              currentUser.uid,
              "userCreateNew",
              `${randomId}`
            );

            await setDoc(docUserCreateNew, {
              idNewPost: `${randomId}`,
              creating: true,
            });
            setGetDocValues(null);
            setStopLoading(true);
          } else {
            const docCreateNew = await getDocs(
              query(
                collection(db, "users", currentUser.uid, "userCreateNew"),
                where("creating", "==", true)
              )
            );

            if (docCreateNew.empty) {
              const randomId = nanoid();

              setDocumentName(`${randomId}`);
              const docUserCreateNew = doc(
                db,
                "users",
                currentUser.uid,
                "userCreateNew",
                `${randomId}`
              );

              await setDoc(docUserCreateNew, {
                idNewPost: `${randomId}`,
                creating: true,
              });
              setGetDocValues(null);
              setStopLoading(true);
            } else {
              setGetDocValues(docCreateNew.docs[0]);
              setDocumentName(`${docCreateNew.docs[0].data().idNewPost}`);
            }
          }
        }
        if (editOrCreate === "edit") {
          if(editNewID !== ""){
            const docEditNew = doc(
              db,
              "users",
              currentUser.uid,
              "userCreateNew",
              editNewID
            );
            const getDocEditNew = await getDoc(docEditNew);
  
            setDocumentName(getDocEditNew.data()?.idNewPost);
            setGetDocValues(getDocEditNew);
          }else{
            router.push("/user");
          }
        }
      }
    };
    handleGetValuesCreateNew();
  }, [currentUser, errors, editOrCreate]);

  useEffect(() => {
    const handleContentBody = async () => {
      if (currentUser?.uid) {
        const docsContentBody = collection(
          db,
          "users",
          currentUser.uid,
          "userCreateNew",
          `${getDocumentName}`,
          "contentBody"
        );
        const getDocsContentBody = await getDocs(
          query(docsContentBody, orderBy("order"))
        );

        if (getDocsContentBody.empty) {
          setGetContentBody(null);
        } else {
          setGetContentBody(getDocsContentBody);
        }
      }
    };

    if (getDocumentName !== "" || loadContentBody) {
      handleContentBody();
    }
  }, [getDocumentName, loadContentBody]);

  useEffect(() => {
    if (getDocValues || stopLoading) {
      setLoadingContent(false);
    }
  }, [getDocValues, stopLoading]);

  const handleClickAddCreateParagraph = (option: boolean) => {
    setAddCreateParagraph(option);
  };

  const handleClickPreviewContent = (option: boolean) => {
    setPreviewContent(option);
  };

  const handlePublished = () => {
    setPublished(true);
  };

  return (
    <div className=" mt-4 text-BlueDarker lg:grid lg:grid-cols-5 gap-x-8">
      <div className="md:text-lg col-span-3">
        {!published && (
          <>
            {!previewContent && (
              <>
                <div className="flex items-center space-x-1 justify-center">
                  {editOrCreate === "create" ? (
                    <h1 className=" text-4xl text-center mb-4">
                      {t("titlePageCreate")}
                    </h1>
                  ) : (
                    <h1 className=" text-4xl text-center mb-4">
                      {t("titlePageEdit")}
                    </h1>
                  )}
                  <BiPencil className="-mt-4 w-12 h-12 mx-auto -rotate-12" />
                </div>
              </>
            )}
            {loadingContent ? (
              <Loading />
            ) : (
              <>
                <MainTitle
                  getDocumentName={getDocumentName}
                  getDocValues={getDocValues}
                  previewContent={previewContent}
                />
                <ChooseCategory
                  getDocumentName={getDocumentName}
                  getDocValues={getDocValues}
                  previewContent={previewContent}
                />
                <MainImage
                  getDocumentName={getDocumentName}
                  getDocValues={getDocValues}
                  previewContent={previewContent}
                />
                {!getContentBody?.empty && (
                  <div
                    className={`${
                      previewContent &&
                      "border-4 border-DarkBlueGray mt-4 rounded-xl py-4 xl:text-xl"
                    }`}
                  >
                    {getContentBody?.docs.map((doc, index) => (
                      <ContentBody
                        key={index}
                        dataParagraph={doc.data().data}
                        dataImage={doc.data().image}
                        option={doc.data().option}
                        order={doc.data().order}
                        getDocumentName={getDocumentName}
                        previewContent={previewContent}
                      />
                    ))}
                  </div>
                )}
                {addCreateParagraph && (
                  <div className="border-4 border-DarkBlueGray rounded-xl p-4  mt-4 sm:mx-16 sm:w-auto md:mx-36 lg:mx-0">
                    <CreateParagraph
                      option="createNew"
                      idNewPost={getDocumentName}
                      placeholder={t("placeholder")}
                      handleClickCancelParagraph={handleClickAddCreateParagraph}
                    />
                    <div className=" w-full flex justify-end items-center">
                      <div
                        className=" mt-4 w-fit p-1 bg-red-500 rounded-xl text-white border-4 border-Blue-Gray cancelOrDelete "
                        onClick={() => handleClickAddCreateParagraph(false)}
                      >
                        <h3 className="text-xl">{t("cancel")}</h3>
                      </div>
                    </div>
                  </div>
                )}
                <CreateNewOptions
                  getDocumentName={getDocumentName}
                  getDocValues={getDocValues}
                  handleClickAddCreateParagraph={handleClickAddCreateParagraph}
                  handleClickPreviewContent={handleClickPreviewContent}
                  previewContent={previewContent}
                />
              </>
            )}
          </>
        )}
        {!previewContent && !loadingContent && (
          <PublicNew
            getDocValues={getDocValues}
            getDocumentName={getDocumentName}
            getContentBody={getContentBody}
            published={published}
            handlePublished={handlePublished}
          />
        )}
      </div>
      <div className=" max-w-sm h-[22rem] sm:h-96 mx-auto -rotate-1 my-3  sm:my-6 lg:col-span-2 lg:m-0 lg:mb-6 lg:mt-10 xl:max-w-md xl:h-[28rem] sticky top-20">
        <Image
          className="border-4 border-DarkBlueGray bg-DarkBlueGray rounded-xl mx-auto "
          src={
            editOrCreate === "create"
              ? "/giftCreatingNew.gif"
              : "/giftEditingNew.gif"
          }
          alt="a person listen music"
          fill
        />
      </div>
    </div>
  );
};

export default CreateYourNew;
