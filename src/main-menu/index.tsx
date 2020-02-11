import React from 'react'
import {SafeAreaView, StyleSheet, ScrollView, View, Text} from 'react-native'
import ShopItem from '../shop-item/ShopItem'
import {useItems, Item} from '../model'
import {useShopOrdersContext} from '../shop-order'
import Button from '../components/Button'

const MainMenu = ({navigation}) => {
  const [items, itemsActions] = useItems()
  const [orders, ordersActions] = useShopOrdersContext()

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
        {/* title="Commandes" */}
        <Button
          disabled={orders.length === 0}
          onPress={() => navigation.navigate('Settings')}>
          <Text style={styles.button}>Commandes</Text>
        </Button>
        <Text style={styles.price} onLongPress={() => itemsActions.clear()}>
          Total: {items.total.toFixed(2)}€
        </Text>
        {/* title="Valider" */}
        <Button disabled={items.total <= 0} onPress={() => validateOrder()}>
          <Text style={styles.button}>Valider</Text>
        </Button>
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
    backgroundColor: 'black',
  },
  footer: {
    backgroundColor: 'orange',
    flexDirection: 'row',
    fontSize: 22,
  },
  button: {
    color: 'white',
    fontSize: 22,
  },
  price: {
    fontWeight: 'bold',
    margin: 8,
    flex: 1,
    textAlign: 'center',
    textTransform: 'uppercase',
    fontSize: 22,
  },
  container: {
    flex: 1,
    margin: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'black',
    flexWrap: 'wrap',
  },
})

export default MainMenu
