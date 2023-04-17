import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AppContextProvider } from './Component/user/AppContext'
import Login from './Screens/BeginScreens/Login'
import MainTab from './Screens/MainTab/MainTabs'
import ItemProduct from './Screens/contants/ItemProduct'
import Register from './Screens/BeginScreens/Register'
import TestScollView from './Screens/Testing/TestScollView'
import Detail from "./Screens/MainTab/Detail"
const Stack = createNativeStackNavigator();
const StackBegin = () => {
  return (
    <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="MainTab" component={MainTab} />
      <Stack.Screen name="Detail" component={Detail} />

    </Stack.Navigator>
  )
}
const App = () => {
  const [isLoggedIn, setisLoggedIn] = useState(false)
  return (
    <AppContextProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="MainTab" screenOptions={{ headerShown: false }}>
          {
            isLoggedIn
              ?
              <Stack.Screen name="MainTab" component={MainTab} setisLoggedIn={setisLoggedIn} />
              :
              <Stack.Screen name="StackBegin" component={StackBegin} setisLoggedIn={setisLoggedIn} />
          }
          
        </Stack.Navigator>
      </NavigationContainer>
    </AppContextProvider>

  )
}

export default App

const styles = StyleSheet.create({})