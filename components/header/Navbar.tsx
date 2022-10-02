import ButtonMenu from "./Navbar/ButtonMenu"
import Categories from "./Navbar/Categories"
import Menu from "./Navbar/Menu"

const Navbar = () => {
    
  return (
    <>
    <div className="hidden lg:flex  border p-2 px-3 rounded-xl bg-Blue-Gray/80 ">
      <Categories />      
    </div>
    <div>
    <ButtonMenu />
      <Menu/>
    </div>
    </>
  )
}

export default Navbar
