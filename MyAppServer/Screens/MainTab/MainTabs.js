import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ICON, COLOR } from '../contants/Themes.js'

import Statitic from './Statitic';
import Form from './New';
import Table from './Table';
import Detail from "./Detail"

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const StackStatistic = () => {
  return (
    <Stack.Navigator initialRouteName="Statitic" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Statitic" component={Statitic} />
      <Stack.Screen name="Form" component={Form} />
      <Stack.Screen name="Table" component={Table} />
      <Stack.Screen name="Detail" component={Detail} />


    </Stack.Navigator>
  )
}
const StackForm = () => {
  return (
    <Stack.Navigator initialRouteName="Form" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Statitic" component={Statitic} />
      <Stack.Screen name="Form" component={Form} />
      <Stack.Screen name="Table" component={Table} />
      <Stack.Screen name="Detail" component={Detail} />

    </Stack.Navigator>
  )
}
const StackTable = () => {
  return (
    <Stack.Navigator initialRouteName="Table" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Statitic" component={Statitic} />
      <Stack.Screen name="Form" component={Form} />
      <Stack.Screen name="Table" component={Table} />
      <Stack.Screen name="Detail" component={Detail} />

    </Stack.Navigator>
  )
}
const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={
        ({ route }) => ({
          tabBarIcon: ({ focused, label }) => {

            let iconName = focused
            if (route.name === 'Statistic') {
              iconName = focused ? ICON.statistic : ICON.statistic
              label = 'Statistic'
            } else if (route.name === 'List') {
              iconName = focused ? ICON.table : ICON.table;
              label = 'List'
            } else if (route.name === 'New') {
              iconName = focused ? ICON.form : ICON.form;
              label = 'New'
            }

            // You can return any component that you like here!
            return <View style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              width: 60
            }}>
              <Image source={iconName}
                style={{
                  width: 30, height: 30, resizeMode: 'stretch',
                  tintColor: focused ? COLOR.primary : COLOR.iconNotFocused
                }} />
              <Text style={{
                color: focused ? COLOR.primary : COLOR.iconNotFocused,

              }}>{label}</Text>
            </View>;
          },
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: {
            height: 70,
          },
        })}
    >
      <Tab.Screen name="Statistic" component={StackStatistic} />
      <Tab.Screen name="New" component={StackForm} />
      <Tab.Screen name="List" component={StackTable} />

    </Tab.Navigator>
  )
}

export default MainTabs

const styles = StyleSheet.create({})