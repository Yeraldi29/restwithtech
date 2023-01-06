import { DocumentData, Timestamp } from "firebase/firestore"

interface itemProps{
    image:string
    name:string
    category:string
    title: string
    option: string
    time?: Timestamp
    timeFake?:string
    index?:number
    idNewPost?:string
}

interface createNewProps {
    getDocumentName: string
    getDocValues : DocumentData | null
    previewContent?: boolean
}