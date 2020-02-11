import React from 'react'
import produce from 'immer'
import UUIDGenerator from 'react-native-uuid-generator'
import AsyncStorage from '@react-native-community/async-storage'
import {Item} from './item'

export interface Order {
  id: string
  total: number
  items: Item[]
  date: string
}

export interface OrderActions {
  load(): Promise<void>
  save(): Promise<void>
  clear(): Promise<void>
  add(order: Pick<Order, 'items' | 'total'>): Promise<void>
}

type Reducer = (state: Order[], action: any) => Order[]
const reducer: Reducer = produce((state: Order[], action: any) => {
  switch (action.type) {
    case 'Add': {
      state.push(action.order)
      break
    }
    case 'Load': {
      return action.orders
    }
  }
}, [] as Order[])

const OrderStorageKey = '@shoppy@order_storage_key'

export function useOrders() {
  const [orders, dispatch] = React.useReducer(reducer, [] as Order[])

  const save = async () => {
    try {
      await AsyncStorage.setItem(OrderStorageKey, JSON.stringify(orders))
    } catch (e) {
      console.log(e)
    }
  }

  const load = async () => {
    try {
      const savedOrders = await AsyncStorage.getItem(OrderStorageKey)
      if (savedOrders != null && typeof savedOrders === 'string') {
        return JSON.parse(savedOrders)
      }
    } catch (e) {
      console.log(e)
    }
    return []
  }

  const clear = async () => {
    try {
      await AsyncStorage.removeItem(OrderStorageKey)
      dispatch({type: 'Load', orders: []})
    } catch (e) {
      console.log(e)
    }
  }

  const add = async (order: Pick<Order, 'items' | 'total'>) => {
    const id = await UUIDGenerator.getRandomUUID()
    const items = order.items.filter(i => i.quantity > 0)
    if (items.length === 0) {
      return
    }
    dispatch({
      type: 'Add',
      order: {
        id,
        items,
        date: new Date().toISOString(),
        total: order.total,
      },
    })
  }

  React.useEffect(() => {
    let willSave = true
    const checkForNewOrders = async () => {
      const loadedOrders = await load()
      if (!willSave) {
        return
      } else if (
        loadedOrders.length !== orders.length ||
        orders.some(o => loadedOrders.every(o2 => o.id !== o2))
      ) {
        await save()
      }
    }
    checkForNewOrders()
    return () => {
      willSave = false
    }
  }, [orders.length])

  const actions = {
    add,
    clear,
    save,
    load: async () => {
      const orders = await load()
      dispatch({type: 'Load', orders})
    },
  }

  return [orders, actions] as [Order[], OrderActions]
}
