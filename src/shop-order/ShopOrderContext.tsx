import React from 'react'
import {useOrders, Order, OrderActions} from '../model'

const ShopOrderContext = React.createContext<[Order[], OrderActions]>(
  null as any,
)

const ShopOrderProvider: React.FC = ({children}) => {
  const value = useOrders()

  return (
    <ShopOrderContext.Provider value={value}>
      {children}
    </ShopOrderContext.Provider>
  )
}

export function useShopOrdersContext() {
  return React.useContext(ShopOrderContext)
}

export default ShopOrderProvider
