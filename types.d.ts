import { DocumentData } from "firebase/firestore"

interface itemProps{
    image:string
    name:string
    category:string
    title: string
    time?:string
    index?:number
    idNewPost?:string
}

interface createNewProps {
    getDocumentName: string
    getDocValues : DocumentData | null
}