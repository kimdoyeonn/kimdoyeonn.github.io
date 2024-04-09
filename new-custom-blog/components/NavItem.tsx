'use client'

import clsx from 'clsx'
import Link, { LinkProps } from 'next/link'
import { MouseEvent, ReactNode, useRef, useState } from 'react'

interface Props extends LinkProps {
  children: ReactNode
  className?: string
}

const NavItem = ({ children, ...props }: Props) => {
  const linkRef = useRef<HTMLAnchorElement>(null)
  const [move, setMove] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  })

  const handleMouseMove = (e: MouseEvent<HTMLAnchorElement>) => {
    if (linkRef.current) {
      const { offsetX: x, offsetY: y } = e.nativeEvent
      const newX = (x / linkRef.current.offsetWidth) * 20 - 10
      const newY = (y / linkRef.current.offsetHeight) * 20 - 10
      setMove({
        x: newX,
        y: newY,
      })
    }
  }

  const handleMouseLeave = () => {
    setMove({ x: 0, y: 0 })
  }
  return (
    <Link
      {...props}
      ref={linkRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={clsx('transition-transform duration-200 p-1', props.className)}
      style={{
        transform: `translate(${move.x}px, ${move.y}px)`,
      }}
    >
      {children}
    </Link>
  )
}

export default NavItem
