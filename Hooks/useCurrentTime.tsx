import { useState, useEffect } from "react"
import { Timestamp } from "firebase/firestore";
import { useTranslation } from "next-i18next";

export const useCurrentTime = (create_at:Timestamp | undefined) => {
    const [ timeString, setTimeString ] = useState("")

    const { t } = useTranslation("common")
    
    useEffect(()=>{
        const time = new Date().getTime()

        if(create_at){
          const currentSeconds = Math.floor((time - create_at.toMillis() )/1000)
          const currentMinutes = Math.floor((time - create_at.toMillis() )/60000)
          const currentHours = Math.floor((time - create_at.toMillis() )/3600000)
          
          if(currentSeconds < 60){
              setTimeString(t("time.seconds", {currentSeconds}))
          }else if(currentMinutes < 60){
              if(currentMinutes === 1){
                  setTimeString(t("time.minute",{currentMinutes}))
              }else{
                setTimeString(t("time.minutes",{currentMinutes}))
              }
          }else if(currentHours < 72){
              if(currentHours === 1){
                  setTimeString(t("time.hour", {currentHours}))
                }else if(currentHours < 24){
                  setTimeString(t("time.hours", {currentHours}))
                }else if(currentHours < 48){
                  setTimeString(t("time.yesterday"))
                }else if(currentHours < 72){
                  setTimeString(t("time.beforeYesterday"))
                }
          }else{
              setTimeString((new Date(create_at.toDate()).toLocaleDateString()))
          }
        }

    },[create_at])
    
    return { timeString }
}