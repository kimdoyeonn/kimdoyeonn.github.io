import headerNavLinks from '@/data/headerNavLinks'
import NavItem from './NavItem'
import { ModeToggle } from './mode-toggle'

const Nav = () => {
  return (
    <nav className="py-2 px-4 flex justify-between border-b-[1px] border-gray-800">
      <div className="text-3xl cursor-pointer">✨</div>
      <div className="flex gap-4 items-center">
        {headerNavLinks.map((nav) => (
          <NavItem href={nav.href} className="font-bold text-sm">
            {nav.title}
          </NavItem>
        ))}
        <ModeToggle />
      </div>
    </nav>
  )
}

export default Nav
