import React from 'react'
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Button,
} from 'react-native'
import ShopItem from '../shop-item/ShopItem'
import {useItems, Item} from '../model'
import {useShopOrdersContext} from '../shop-order'

const MainMenu = ({navigation}) => {
  const [items, itemsActions] = useItems()
  const [_orders, ordersActions] = useShopOrdersContext()

  React.useEffect(() => {
    ordersActions.load()
  }, [])

  const validateOrder = async () => {
    await ordersActions.add(items)
    itemsActions.clear()
  }

  return (
    <SafeAreaView style={styles.area}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scrollView}>
        <View style={styles.container}>
          {items.items.map((item: Item) => (
            <ShopItem
              key={item.name}
              item={item}
              onLongPress={() => itemsActions.reset(item.name)}
              onPress={() => itemsActions.increment(item.name)}
            />
          ))}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Button
          title="Commandes"
          onPress={() => navigation.navigate('Settings')}
        />
        <Text style={styles.price} onLongPress={() => itemsActions.clear()}>
          Total: {items.total.toFixed(2)}€
        </Text>
        <Button title="Valider" onPress={() => validateOrder()} />
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
    textAlign: 'center',
    textTransform: 'uppercase',
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
