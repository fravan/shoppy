import React from 'react'
import {StyleSheet, Text, TouchableNativeFeedback, View} from 'react-native'
import {Item} from '../model'

const styles = StyleSheet.create({
  button: {
    marginBottom: 8,
    padding: 8,
    width: '30%',
    backgroundColor: '#2296F3',
    flexDirection: 'column',
  },
  name: {
    flex: 1,
    textAlign: 'center',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    color: 'white',
  },
  price: {
    textAlign: 'center',
    color: 'white',
  },
  quantity: {
    backgroundColor: 'orange',
    position: 'absolute',
    right: -4,
    top: -4,
    width: 24,
    height: 24,
    borderRadius: 50,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
})

interface Props {
  onPress: () => void
  onLongPress: () => void
  item: Item
}

const Component: React.FC<Props> = ({item, onPress, onLongPress}) => {
  return (
    <TouchableNativeFeedback
      onPress={onPress}
      background={TouchableNativeFeedback.SelectableBackground()}
      onLongPress={onLongPress}>
      <View style={styles.button}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>{(item.price || 0).toFixed(2)}€</Text>
        {item.quantity > 0 ? (
          <Text style={styles.quantity}>{item.quantity}</Text>
        ) : null}
      </View>
    </TouchableNativeFeedback>
  )
}

export default Component
