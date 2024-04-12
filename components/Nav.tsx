import headerNavLinks from '@/data/headerNavLinks'
import NavItem from './NavItem'
import { ModeToggle } from './mode-toggle'
import Link from 'next/link'

const Nav = () => {
  return (
    <nav className="py-2 px-4 flex justify-between border-b-[1px] border-gray-800 shadow-sm">
      <Link href="/" className="text-3xl cursor-pointer">
        ✨
      </Link>
      <div className="flex items-center gap-4">
        {headerNavLinks.map((nav) => (
          <NavItem href={nav.href} className="text-sm font-bold">
            {nav.title}
          </NavItem>
        ))}
        <ModeToggle />
      </div>
    </nav>
  )
}

export default Nav
