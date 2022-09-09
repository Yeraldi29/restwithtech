import { useRouter } from "next/router"

const useChangeLng = () => {
  const router = useRouter()

  const changeTo = router.locale === 'en' ? 'es' : 'en'
  let flag = "";  

  router.locale === 'en' ? flag = "/spain.jpg" : flag = "/usa.jpg"

  return [changeTo, flag]
}

export default useChangeLng
