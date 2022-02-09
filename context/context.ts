import React from 'react'

interface contextProps {
  prefix: string
}

const PortfolioContext = React.createContext({ prefix: '' } as contextProps)

export const PortfolioProvider = PortfolioContext.Provider
export const PortfolioConsumer = PortfolioContext.Consumer

export default PortfolioContext
