import { ReactNode } from "react"
import { menuClick } from "../pages/store"
import Header from "./Header"
import {useContext} from 'react'

interface Props {
  children?: ReactNode
}

const Layout = ({children}:Props) => {
  const clickState = useContext(menuClick)

  return (
    <div className=" max-w-7xl mx-auto h-screen">
      <Header />
      <main>
      <style jsx global>{`
             ${clickState.clickMenu && 'body {background: #000000ad}' }
          `}
      </style>
        {children}</main>
    </div>
  )
}

export default Layout