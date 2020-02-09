import produce from 'immer'
import React from 'react'
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Button,
} from 'react-native'
import ShopItem, {IShopItem} from '../shop-item/ShopItem'

interface IState {
  total: number
  items: IShopItem[]
}

const registryInitialState: IState = {
  total: 0,
  items: [
    {name: 'Complet', quantity: 0, price: 2.5},
    {name: 'Campagne', quantity: 0, price: 2.5},
    {name: 'Intégral', quantity: 0, price: 2.5},
    {name: 'Brioche', quantity: 0, price: 5.4},
    {name: 'Pain au chocolat', quantity: 0, price: 1.2},
    {name: 'Croissant', quantity: 0, price: 1.1},
  ],
}
type Reducer = (state: IState, action: any) => IState
const registryReducer: Reducer = produce((state: IState, action: any) => {
  switch (action.type) {
    case 'Increment': {
      const item = state.items.find(i => i.name === action.name)!
      item.quantity += 1
      break
    }
    case 'Reset': {
      const item = state.items.find(i => i.name === action.name)!
      item.quantity = 0
      break
    }
    case 'Clear': {
      return registryInitialState
    }
  }
  state.total = state.items.reduce((acc, item) => {
    acc += item.quantity * item.price
    return acc
  }, 0)
}, registryInitialState)

const RegistryContext = React.createContext<React.Dispatch<IState>>(() => {})

const MainMenu = () => {
  const [state, dispatch] = React.useReducer(
    registryReducer,
    registryInitialState,
  )
  return (
    <SafeAreaView style={styles.area}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scrollView}>
        <RegistryContext.Provider value={dispatch}>
          <View style={styles.container}>
            {state.items.map((item: IShopItem) => (
              <ShopItem
                key={item.name}
                item={item}
                onLongPress={() => dispatch({type: 'Reset', name: item.name})}
                onPress={() => dispatch({type: 'Increment', name: item.name})}
              />
            ))}
          </View>
        </RegistryContext.Provider>
      </ScrollView>

      <View style={styles.footer}>
        <Text style={styles.price}>Total TTC: {state.total.toFixed(2)}€</Text>
        <Button title="Effacer" onPress={() => dispatch({type: 'Clear'})} />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  area: {
    height: '100%',
  },
  scrollView: {
    flex: 1,
    backgroundColor: 'white',
  },
  footer: {
    backgroundColor: 'orange',
    flexDirection: 'row',
  },
  price: {
    fontWeight: 'bold',
    margin: 8,
    flex: 1,
  },
  container: {
    flex: 1,
    margin: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    flexWrap: 'wrap',
    alignItems: 'stretch',
  },
})

export default MainMenu
