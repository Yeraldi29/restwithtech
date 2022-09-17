import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"

const firebaseConfig = {
    apiKey:"AIzaSyBIz4-bRezExscxH5zE3GgRyxaXEQd0Wok",
    authDomain:"restwithtech.firebaseapp.com",
    projectId:"restwithtech",
    storageBucket:"restwithtech.appspot.com",
    messagingSenderId:"67339741805",
    appId:"1:67339741805:web:864b4dc5e8dd0ab6cb2d64"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app)

export {auth}