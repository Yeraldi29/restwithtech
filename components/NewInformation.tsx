import {
  collection,
  DocumentData,
  getDocs,
  orderBy,
  query,
  QuerySnapshot,
} from "firebase/firestore";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import { useEffect, useState } from "react";
import { mostRecents } from "../arrays/feedImages/allCategories";
import { db } from "../firebase";
import { useCurrentTime } from "../Hooks/useCurrentTime";
import { itemProps } from "../types";
import { startSerialize } from "./createContent/plugins/serialize";
import ItemPost from "./feed/ItemPost";
import LoadingItems from "./feed/LoadingItems";
import Comments from "./newInformation/Comments";
import PreviousInformationProfile from "./newInformation/PreviousInformationProfile";
import ImageProfile from "./profile/ImageProfile";

interface newInformationProps extends itemProps {
  profession?: string;
  profileImage?: string;
  descriptionProfile?: string;
  skill1?: string;
  skill2?: string;
  skill3?: string;
  content?: QuerySnapshot<DocumentData> | null;
  userId?: string;
}

const NewInformation = ({
  image,
  title,
  category,
  name,
  time,
  timeFake,
  idNewPost,
  option,
  content,
  profession,
  profileImage,
  descriptionProfile,
  skill1,
  skill2,
  skill3,
  userId,
}: newInformationProps) => {
  const [news, setNews] = useState<QuerySnapshot<DocumentData> | null>(null);
  const [categoryItem, setCategoryItem] = useState("");
  const [loading, setLoading] = useState(true);
  const itemsLoading = new Array(6);

  const { t } = useTranslation("newPost");
  const { timeString } = useCurrentTime(time);

  useEffect(() => {
    const handleData = async () => {
      const getNews = await getDocs(
        await query(collection(db, "news"), orderBy("create_at", "desc"))
      );

      setNews(getNews);
      setLoading(false);
    };
    switch (category) {
      case "tech":
        setCategoryItem(t("categories.tech"));
        break;
      case "mobile":
        setCategoryItem(t("categories.mobile"));
        break;
      case "computers&laptops":
        setCategoryItem(t("categories.C&P"));
        break;
      case "OS":
        setCategoryItem(t("categories.os"));
        break;
      case "code":
        setCategoryItem(t("categories.code"));
        break;
    }

    handleData();
  }, []);

  return (
    <>
      <div className=" lg:grid lg:grid-cols-5 gap-x-8">
        <div className=" text-BlueDarker md:text-lg col-span-3">
          <h2 className="text-Blue-Gray text-xl  xl:text-2xl rotate-1 px-2 mb-3 sm:mt-4 border-b-4 border-DarkBlueGray w-fit">
            {categoryItem}
          </h2>
          <h1 className="text-2xl xl:text-3xl font-bold text-DarkBlueGray mb-2">
            {title}
          </h1>
          <div className="flex items-center space-x-1 mb-2">
            <p className=" text-BabyBlueEyes text-sm md:text-base xl:text-lg">
              {t("published")}
              {option === "fakeData" ? (
                <span className=" text-Blue-Gray font-semibold">
                  {" "}
                  {t("hour", { timeFake })}
                </span>
              ) : (
                option === "data" && (
                  <span className=" text-Blue-Gray font-semibold">
                    {" "}
                    {timeString}
                  </span>
                )
              )}
              <span> {t("by")} </span>
              {option === "fakeData" ? (
                <span className="text-Blue-Gray font-semibold">
                  {" "}
                  Lorem Ipsum{" "}
                </span>
              ) : (
                option === "data" && (
                  <span className="text-Blue-Gray font-semibold">{name}</span>
                )
              )}
            </p>
            {option === "fakeData" ? (
              <ImageProfile src={`https://i.pravatar.cc/150?u=${name}`} />
            ) : (
              option === "data" &&
              profileImage && <ImageProfile src={profileImage} />
            )}
          </div>
          <div className=" col-span-3 relative bg-DarkBlueGray w-full h-[22rem] sm:h-[27rem] md:h-[30rem] lg:h-[28rem] xl:h-[32rem] rounded-xl  border-4 border-DarkBlueGray">
            <picture className="w-full h-full">
              <img
                className="w-full h-full rounded-lg"
                src={image}
                alt={name}
              />
            </picture>
          </div>
          <div className="border-4 border-DarkBlueGray mt-4 rounded-xl p-4 xl:text-xl">
            {option === "fakeData" ? (
              <p>
                Lorem ipsum dolor sit amet consectetur adipiscing elit,
                fermentum egestas curabitur phasellus molestie. Ornare platea
                facilisis feugiat mauris sapien id lobortis, facilisi senectus
                taciti sed aliquet proin justo, volutpat interdum quis sociis
                conubia scelerisque. Sodales curae praesent sed vitae viverra
                aptent pulvinar primis quisque, nam lectus mollis diam hac
                congue fermentum laoreet etiam, porta litora habitasse curabitur
                malesuada ut potenti justo. Est justo turpis suscipit mattis
                dictumst aptent ultrices habitant a, potenti aliquam lectus
                pulvinar sem ut nullam hendrerit, id convallis erat fames
                lobortis euismod rutrum imperdiet. Vehicula eros nunc cubilia
                hendrerit potenti vulputate vestibulum curae, nam elementum mus
                euismod dis sollicitudin taciti nostra class, laoreet ridiculus
                bibendum dictumst himenaeos mattis maecenas. Justo maecenas
                laoreet lacinia vitae sem nec urna dui libero cum, congue litora
                sollicitudin tincidunt vehicula taciti netus commodo volutpat
                nam, ligula pretium potenti cubilia augue aptent lobortis cras
                iaculis. Inceptos nostra pellentesque egestas nisi curae
                ridiculus facilisi neque sociis, hac auctor mauris senectus
                quisque nam aliquet tristique. Scelerisque posuere potenti
                turpis porttitor sodales ullamcorper vehicula congue pretium ut,
                placerat cras varius cubilia aliquam nascetur eget fringilla
                natoque. Nibh sodales risus aptent commodo metus, duis tincidunt
                varius class tempus facilisis, felis ad suscipit nunc. Hendrerit
                mus bibendum potenti blandit primis luctus dignissim, sociosqu
                dui congue mollis erat feugiat, sagittis porttitor inceptos
                faucibus taciti lacus. Congue vestibulum vivamus ultrices
                malesuada dapibus neque potenti luctus, felis cursus dignissim
                velit nisl primis aenean rutrum parturient, faucibus donec etiam
                sollicitudin eros sociis sed. Torquent ut inceptos sociosqu
                integer diam sociis quisque aliquet ultricies nam velit, est
                felis magna condimentum sed morbi id parturient imperdiet.
              </p>
            ) : (
              option === "data" && (
                <>
                  {content?.docs.map((data) => (
                    <>
                      {data.data().option === "paragraph" ? (
                        <p>{startSerialize(JSON.parse(data.data().data))}</p>
                      ) : (
                        <div className="my-4 col-span-3 relative bg-DarkBlueGray w-full h-[22rem] sm:h-[27rem] md:h-[30rem] lg:h-[28rem] xl:h-[32rem] rounded-xl rotate-1  border-4 border-DarkBlueGray break-words">
                          <div className="relative w-full h-full">
                            <Image
                              className="rounded-lg"
                              src={data.data().data}
                              alt={"image content"}
                              fill
                            />
                          </div>
                        </div>
                      )}
                    </>
                  ))}
                </>
              )
            )}
          </div>
        </div>
        <PreviousInformationProfile
          name={name}
          option={option}
          profession={profession}
          profileImage={profileImage}
          descriptionProfile={descriptionProfile}
          skill1={skill1}
          skill2={skill2}
          skill3={skill3}
        />
      </div>
      <Comments idNewPost={idNewPost} name={name} userId={userId} category={category} />
      <div className="grid gap-6 mt-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        {loading ? (
          <>
            {[...itemsLoading].map((noValues, index) => (
              <LoadingItems
                index={index}
                key={index}
                first={title === t("recent")}
              />
            ))}
          </>
        ) : (
          <>
            {news?.docs
              .map((data, index) => {
                if (data.data().mainTitle !== title) {
                  return (
                    <ItemPost
                      image={data.data().mainImage}
                      category={data.data().category}
                      time={data.data().create_at}
                      name={data.data().mainTitle}
                      option="data"
                      key={index}
                      index={index}
                      title={data.data().mainTitle}
                    />
                  );
                }
              })
              .concat(
                mostRecents.map((post, index) => {
                  if (post.title !== title) {
                    return (
                      <ItemPost
                        image={post.image}
                        category={post.category}
                        timeFake={post.time}
                        name={post.name}
                        option="fakeData"
                        key={post.name}
                        index={index}
                        title={post.title}
                      />
                    );
                  }
                })
              )}
          </>
        )}
      </div>
    </>
  );
};

export default NewInformation;
