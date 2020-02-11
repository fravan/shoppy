import React from 'react'
import {Text, View, StyleSheet} from 'react-native'
import {Order} from 'src/model'

interface Props {
  order: Order
}

const styles = StyleSheet.create({
  container: {
    margin: 4,
    paddingBottom: 4,
  },
  order: {
    fontWeight: 'bold',
  },
  date: {
    fontStyle: 'italic',
    fontSize: 10,
  },
  itemContainer: {
    flexDirection: 'row',
  },
  item: {
    paddingRight: 4,
  },
  total: {
    borderTopColor: 'orange',
    borderTopWidth: 1,
    textAlign: 'right',
    color: 'orange',
    fontSize: 16,
  },
})

const ShopOrder: React.FC<Props> = ({order}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.order}>Commande: {order.id}</Text>
      <Text style={styles.date}>passée le {order.date}</Text>
      {order.items.map(item => (
        <View style={styles.itemContainer} key={item.name}>
          <Text style={[styles.item, {flex: 1}]}>{item.name} : </Text>
          <Text style={styles.item}>{item.quantity}</Text>
          <Text style={styles.item}>
            ({(item.quantity * item.price).toFixed(2)}€)
          </Text>
        </View>
      ))}
      <Text style={styles.total}>Total: {order.total.toFixed(2)}€</Text>
    </View>
  )
}

export default ShopOrder
