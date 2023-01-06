import { getApp, getApps, initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"
import firebaseConfig from "./firebaseConfig";

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const auth = getAuth(app)
const db = getFirestore(app)
const storage = getStorage(app)

export {auth, db, storage}