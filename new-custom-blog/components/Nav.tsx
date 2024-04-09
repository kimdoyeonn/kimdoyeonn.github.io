import NavItem from './NavItem'

const Nav = () => {
  return (
    <nav className="py-2 px-4 flex justify-between border-b-[1px] border-gray-800">
      <div className="text-3xl cursor-pointer">✨</div>
      <div className="flex gap-4 items-center">
        <NavItem href="/" className="font-bold text-sm">
          HOME
        </NavItem>
      </div>
    </nav>
  )
}

export default Nav
