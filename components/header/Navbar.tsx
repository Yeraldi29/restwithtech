import ButtonMenu from "./Navbar/ButtonMenu"
import Categories from "./Navbar/Categories"
import Menu from "./Navbar/Menu"

const Navbar = () => {
    
  return (
    <>
    <div className="hidden lg:flex  rounded-xl  ">
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
