import React from 'react'
import {View, TouchableNativeFeedback, StyleSheet} from 'react-native'

interface Props {
  onPress?: () => void
  onLongPress?: () => void
  style?: any
  disabled?: boolean
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#222',
    padding: 8,
  },
})

const Button: React.FC<Props> = ({
  children,
  onPress,
  onLongPress,
  style,
  disabled,
}) => {
  return (
    <TouchableNativeFeedback
      disabled={disabled}
      onPress={onPress}
      background={TouchableNativeFeedback.SelectableBackground()}
      onLongPress={onLongPress}>
      <View style={[styles.button, style]}>{children}</View>
    </TouchableNativeFeedback>
  )
}

export default Button
