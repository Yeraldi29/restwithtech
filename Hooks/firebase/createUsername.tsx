import { useState } from "react"
import { User } from "firebase/auth"
import { collection, doc, getDocs, query, setDoc, where } from "firebase/firestore"
import { db } from "../../firebase"

const CreateUsername = async (user: User) => {
    const queryDisplayName = query(collection(db, "users"), where("displayName","==", user.displayName)) 
    const {docs} = await getDocs(queryDisplayName)
    const {uid, displayName} = user

    if(docs.length === 0){
        const docRef = doc(db, `users/${uid}`)
        await setDoc(docRef,{
            displayName,
            uid
        })
    }else{
    }

}

export default CreateUsername