import React from 'react'
import {StatusBar} from 'react-native'
import {NavigationContainer} from '@react-navigation/native'
import {
  createBottomTabNavigator,
  BottomTabNavigationOptions,
} from '@react-navigation/bottom-tabs'
import Icon from 'react-native-vector-icons/FontAwesome5'
import MainScreen from './src/main-menu'
import SettingsScreen from './src/settings-menu'
import {ShopOrderProvider} from './src/shop-order'

const Tab = createBottomTabNavigator()

const App = () => {
  const screenOptions: any = ({route}) => ({
    tabBarIcon: ({color, size}) => {
      let iconName: string = 'home'
      if (route.name === 'Settings') {
        iconName = 'cogs'
      }
      return <Icon name={iconName} size={size} color={color} />
    },
  })
  return (
    <ShopOrderProvider>
      <NavigationContainer>
        <StatusBar barStyle="dark-content" />
        <Tab.Navigator screenOptions={screenOptions}>
          <Tab.Screen name="Home" component={MainScreen} />
          <Tab.Screen name="Settings" component={SettingsScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </ShopOrderProvider>
  )
}

export default App
