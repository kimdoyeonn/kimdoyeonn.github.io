import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

const SectionContainer = ({ children }: Props) => {
  return <section className="mx-auto max-w-2xl">{children}</section>
}

export default SectionContainer
