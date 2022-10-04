import { ReactNode } from "react"
import { menuClick } from "../store/store"
import Header from "./Header"
import {useContext} from 'react'

interface Props {
  children?: ReactNode
}

const Layout = ({children}:Props) => {
   const clickState = useContext(menuClick)

  return (
    <>
    <div className={`${clickState.clickMenu ? "bg-black/50  absolute inset-0 backdrop-blur-sm z-30 " : " hidden"}`}></div>
    <div className=" max-w-7xl mx-auto h-screen ">
      <Header />
      <main>
        {children}
      </main>
    </div>
    </>
  )
}

export default Layout