import Code from "./feed/Recomendations/Code"
import Computers_Portables from "./feed/Recomendations/Computers_Portables"
import Mobiles from "./feed/Recomendations/Mobiles"
import OS from "./feed/Recomendations/OS"
import Recomendations from "./feed/Recomendations"
import Tech from "./feed/Recomendations/Tech"

const Feed = () => {
  return (
    <>
      <Recomendations/>
      <Tech />
      <Mobiles />
      <Computers_Portables />
      <OS />
      <Code />
    </>
  )
}

export default Feed