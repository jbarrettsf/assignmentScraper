import * as React from 'react';
import {Button} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {createStackNavigator} from "@react-navigation/stack";

import { AntDesign } from '@expo/vector-icons';
import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import MyDayScreen from '../screens/MyDayScreen';
import SettingsScreen from '../screens/SettingsScreen';

const Stack = createStackNavigator();
const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Home';

export default function BottomTabNavigator({ navigation, route }) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
  navigation.setOptions({ headerTitle: getHeaderTitle(route),
  headerRight:()=>(<Button
    onPress={()=>navigation.navigate("Settings")}
    title="Settings"
  ></Button>) });

  return (
    <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
    <BottomTab.Screen
      name="MyDay"
      component={MyDayScreen}
      options={{
        title: 'My Day',
        tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="calendar" />,

      }}
    />
    <BottomTab.Screen
      name="Home"
      component={HomeScreen}
      options={{
        title: 'Assignments',
        tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="bars" />,
      }}
    />
    </BottomTab.Navigator>

    // <Stack.Navigator>
    // <Stack.Screen
    //   name="Settings"
    //   component={SettingsScreen}
    //   options={{
    //     title: 'Settings',
    //     tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="setting" />,
    //   }}
    // />
    // <BottomTab.Screen
    //   name="Settings"
    //   component={Settings}
    //   options={{
    //     title: 'Settings',
    //     tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="bars" />,
    //   }}
    // />
  );
}

function getHeaderTitle(route) {
  const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    case 'Home':
      return 'Assignment Center';
    case 'MyDay':
      return 'My Day';
    case 'Settings':
      return 'Settings';
  }
}
