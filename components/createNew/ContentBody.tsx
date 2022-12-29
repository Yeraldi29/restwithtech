import { startSerialize } from "../createContent/plugins/serialize"

interface contentBodyProps {
    dataParagraph: string | null
    dataImage: string | null
    option: string
}

const ContentBody = ({ dataParagraph, dataImage, option }:contentBodyProps) => {
  return (
    <div>
      {(dataParagraph && option === "paragraph") && (
        <div className="border-4 border-DarkBlueGray mt-4 rounded-xl p-4 xl:text-xl">
            <p>{startSerialize(JSON.parse(dataParagraph))}</p>
        </div>
      )} 
      {(dataImage && option === "image") && (
        <div className=" col-span-3 relative mt-4 bg-DarkBlueGray w-full h-[22rem] sm:h-[27rem] md:h-[30rem] lg:h-[28rem] xl:h-[32rem] rounded-xl rotate-1  border-4 border-DarkBlueGray">
            <picture className="w-full h-full">
                <img className="w-full h-full rounded-lg" src={dataImage} alt={"image content"} />
            </picture>
        </div>
      )}
    </div>
  )
}

export default ContentBody