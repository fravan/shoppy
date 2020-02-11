import React from 'react'
import {StatusBar} from 'react-native'
import {NavigationContainer} from '@react-navigation/native'
import {createDrawerNavigator} from '@react-navigation/drawer'
import Icon from 'react-native-vector-icons/FontAwesome5'
import MainScreen from './src/main-menu'
import SettingsScreen from './src/settings-menu'
import {ShopOrderProvider} from './src/shop-order'

const Drawer = createDrawerNavigator()

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
      <StatusBar barStyle="dark-content" />
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="Home">
          <Drawer.Screen name="Home" component={MainScreen} />
          <Drawer.Screen name="Settings" component={SettingsScreen} />
        </Drawer.Navigator>
      </NavigationContainer>
    </ShopOrderProvider>
  )
}

export default App
