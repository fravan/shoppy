import React from 'react'
import produce from 'immer'
import {items} from './item-data'

export interface Item {
  name: string
  price: number
  quantity: number
}

interface State {
  total: number
  items: Item[]
}

const initialState: State = {
  total: 0,
  items,
}

type Reducer = (state: State, action: any) => State
const reducer: Reducer = produce((state: State, action: any) => {
  switch (action.type) {
    case 'Increment': {
      const item = state.items.find(i => i.name === action.name)
      if (item != null) {
        item.quantity += 1
      }
      break
    }
    case 'Reset': {
      const item = state.items.find(i => i.name === action.name)
      if (item != null) {
        item.quantity = 0
      }
      break
    }
    case 'Clear': {
      return initialState
    }
  }
  state.total = state.items.reduce((acc, item) => {
    acc += item.quantity * item.price
    return acc
  }, 0)
}, initialState)

export function useItems() {
  const [state, dispatch] = React.useReducer(reducer, initialState)

  const actions = {
    increment: (name: string) => dispatch({type: 'Increment', name}),
    reset: (name: string) => dispatch({type: 'Reset', name}),
    clear: () => dispatch({type: 'Clear'}),
  }

  return [state, actions] as const
}
