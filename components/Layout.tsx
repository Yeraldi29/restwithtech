import { ReactNode } from "react"
import Header from "./Header"

interface Props {
  children?: ReactNode
}

const Layout = ({children}:Props) => {
  return (
    <div className=" max-w-7xl mx-auto h-screen">
      <Header />
      <main>{children}</main>
    </div>
  )
}

export default Layout