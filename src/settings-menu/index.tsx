import React from 'react'
import {
  ScrollView,
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  Button,
} from 'react-native'
import {ShopOrder, useShopOrdersContext} from '../shop-order'

const styles = StyleSheet.create({
  area: {
    height: '100%',
  },
  scrollView: {
    flex: 1,
  },
  container: {
    flex: 1,
    margin: 8,
    flexDirection: 'column',
  },
  footer: {
    backgroundColor: 'orange',
    flexDirection: 'row',
  },
})

const SettingsMenu = ({navigation}) => {
  const [orders, actions] = useShopOrdersContext()

  return (
    <SafeAreaView style={styles.area}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scrollView}>
        <View style={styles.container}>
          {orders.map(order => (
            <ShopOrder key={order.id} order={order} />
          ))}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Button title="Retour" onPress={() => navigation.goBack()} />
        <View style={{flex: 1}} />
        <Button title="Tout effacer" onPress={() => actions.clear()} />
      </View>
    </SafeAreaView>
  )
}

export default SettingsMenu
