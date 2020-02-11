import React from 'react'
import {StyleSheet, Text, TouchableNativeFeedback, View} from 'react-native'
import {Item} from '../model'
import Button from '../components/Button'

const styles = StyleSheet.create({
  button: {
    marginBottom: 10,
    padding: 8,
    width: '32%',
    minHeight: 90,
    flexDirection: 'column',
  },
  activeButton: {
    backgroundColor: 'orange',
  },
  name: {
    flex: 1,
    textAlign: 'center',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    color: 'white',
    fontSize: 20,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  price: {
    textAlign: 'center',
    color: 'white',
    fontSize: 20,
  },
  quantity: {
    backgroundColor: 'white',
    fontSize: 20,
    paddingLeft: 8,
    paddingRight: 8,
    fontWeight: 'bold',
    borderRadius: 50,
  },
})

interface Props {
  onPress: () => void
  onLongPress: () => void
  item: Item
}

const Component: React.FC<Props> = ({item, onPress, onLongPress}) => {
  const buttonStyle =
    item.quantity > 0 ? [styles.button, styles.activeButton] : styles.button

  const colorStyle = item.quantity > 0 ? {color: 'black'} : {color: 'white'}
  return (
    <Button style={buttonStyle} onPress={onPress} onLongPress={onLongPress}>
      <Text style={[styles.name, colorStyle]}>{item.name}</Text>
      <View style={styles.priceContainer}>
        <Text style={[styles.price, colorStyle]}>{item.price.toFixed(2)}€</Text>
        {item.quantity > 0 ? (
          <Text style={[styles.quantity, colorStyle]}>{item.quantity}</Text>
        ) : null}
      </View>
      {/* {item.quantity > 0 ? (
        <Text style={styles.quantity}>{item.quantity}</Text>
      ) : null} */}
    </Button>
  )
}

export default Component
