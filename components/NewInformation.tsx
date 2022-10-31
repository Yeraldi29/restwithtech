import { useTranslation } from "next-i18next"
import { useEffect, useState } from "react"

const NewInformation = ({image,title,category, name, time}:itemProps) => {
  const { t } = useTranslation("newPost")
  
  const [categoryItem,setCategoryItem] = useState("")

  useEffect(()=>{
    switch (category) {
        case "technologies":
            setCategoryItem(t("categories.tech"))
        break
        case "mobile":
            setCategoryItem(t("categories.mobile"))
        break
        case "computers&laptops":
            setCategoryItem(t("categories.C&P"))
        break
        case "OS":
            setCategoryItem(t("categories.os"))
        break
        case "code":
            setCategoryItem(t("categories.code"))
        break
    }
},[category])
  
  return (
    <>
        <h2 className="text-Blue-Gray text-lg rotate-1 px-2 mb-3 sm:mt-4 border-b-4 border-white w-fit">{categoryItem}</h2>
        <h1 className="text-xl sm:text-2xl font-bold text-DarkBlueGray mb-2">{title}</h1>
        <div className="flex items-center space-x-1 mb-2">
          <p className=" text-BabyBlueEyes text-sm md:text-base">
            {t("published")} <span className=" text-Blue-Gray font-semibold">{t("hour",{time})}</span> {t("by")} 
            <span className="text-Blue-Gray font-semibold"> Lorem Ipsum</span>
          </p>
          <picture className="imageProfile min-w-[2.75rem]">
            <img className="w-full h-full" src={`https://i.pravatar.cc/150?u=${name}`} alt="profile" />
          </picture>
        </div>
        <div className=" lg:grid lg:grid-cols-4">
          <picture className=" col-span-3">
              <img className="w-full h-[22rem] sm:h-[27rem] md:h-[30rem] lg:h-[32rem] rounded-xl rotate-1" src={image} alt={name} />
          </picture>
        </div>
        <div className=" lg:grid lg:grid-cols-4">
          <div className=" mt-4 text-BlueDarker md:text-lg col-span-3">
            <p>
             Lorem ipsum dolor sit amet consectetur adipiscing elit, fermentum egestas curabitur phasellus molestie. Ornare platea facilisis feugiat mauris sapien id lobortis, facilisi senectus taciti sed aliquet proin justo, volutpat interdum quis sociis conubia scelerisque. Sodales curae praesent sed vitae viverra aptent pulvinar primis quisque, nam lectus mollis diam hac congue fermentum laoreet etiam, porta litora habitasse curabitur malesuada ut potenti justo. Est justo turpis suscipit mattis dictumst aptent ultrices habitant a, potenti aliquam lectus pulvinar sem ut nullam hendrerit, id convallis erat fames lobortis euismod rutrum imperdiet. Vehicula eros nunc cubilia hendrerit potenti vulputate vestibulum curae, nam elementum mus euismod dis sollicitudin taciti nostra class, laoreet ridiculus bibendum dictumst himenaeos mattis maecenas.
             Justo maecenas laoreet lacinia vitae sem nec urna dui libero cum, congue litora sollicitudin tincidunt vehicula taciti netus commodo volutpat nam, ligula pretium potenti cubilia augue aptent lobortis cras iaculis. Inceptos nostra pellentesque egestas nisi curae ridiculus facilisi neque sociis, hac auctor mauris senectus quisque nam aliquet tristique. Scelerisque posuere potenti turpis porttitor sodales ullamcorper vehicula congue pretium ut, placerat cras varius cubilia aliquam nascetur eget fringilla natoque. Nibh sodales risus aptent commodo metus, duis tincidunt varius class tempus facilisis, felis ad suscipit nunc.
             Hendrerit mus bibendum potenti blandit primis luctus dignissim, sociosqu dui congue mollis erat feugiat, sagittis porttitor inceptos faucibus taciti lacus. Congue vestibulum vivamus ultrices malesuada dapibus neque potenti luctus, felis cursus dignissim velit nisl primis aenean rutrum parturient, faucibus donec etiam sollicitudin eros sociis sed. Torquent ut inceptos sociosqu integer diam sociis quisque aliquet ultricies nam velit, est felis magna condimentum sed morbi id parturient imperdiet.
             </p>
            </div>
        </div>
    </>
  )
}

export default NewInformation