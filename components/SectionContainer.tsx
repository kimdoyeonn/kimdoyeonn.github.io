import { ReactNode } from 'react'
import Nav from './Nav'

interface Props {
  children: ReactNode
}

const SectionContainer = ({ children }: Props) => {
  return (
    <section className="max-w-4xl mx-auto">
      <Nav />
      {children}
    </section>
  )
}

export default SectionContainer
