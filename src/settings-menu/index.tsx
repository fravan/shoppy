import React from 'react'
import {ScrollView, View, Text, StyleSheet, SafeAreaView} from 'react-native'
import {ShopOrder, useShopOrdersContext} from '../shop-order'
import Button from '../components/Button'

const styles = StyleSheet.create({
  area: {
    height: '100%',
  },
  scrollView: {
    flex: 1,
    backgroundColor: 'black',
  },
  container: {
    flex: 1,
    margin: 8,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  footer: {
    backgroundColor: 'orange',
    flexDirection: 'row',
  },
  button: {
    color: 'white',
    fontSize: 22,
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
        <Button onPress={() => navigation.goBack()}>
          <Text style={styles.button}>Retour</Text>
        </Button>
        <View style={{flex: 1}} />
        <Button onPress={() => actions.clear()}>
          <Text style={styles.button}>Tout effacer</Text>
        </Button>
      </View>
    </SafeAreaView>
  )
}

export default SettingsMenu
