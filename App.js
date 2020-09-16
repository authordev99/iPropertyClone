import React from 'react'
import { Button, Text, View, StyleSheet } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import PropertyListScreen from './Page/PropertyListScreen';
import Icon from 'react-native-vector-icons/FontAwesome';
import HomeScreen from './Page/HomeScreen';
import FilterScreen from './Page/FilterScreen'
import ContactScreen from './Page/ContactScreen';
import DetailsScreen from './Page/DetailScreen';
import SavedPropertyScreen from './Page/SavedPropertyScreen';
import ProfileScreen from './Page/ProfileScreen';
import NewsLifestyleList from './Page/NewsLifestyleList';

const Tab = createBottomTabNavigator()
const Stack = createStackNavigator()

const homeOptions = {
    screenOptions: {
        headerShown: false,
    },
    initialRouteName: "Home"
}

const HomeStack = () => (
    <Stack.Navigator {...homeOptions}>
        <Stack.Screen name="Home" component={HomeScreen}/>
        <Stack.Screen name="NewsLifestyleList" component={NewsLifestyleList} />
        <Stack.Screen name="ListScreen" component={PropertyListScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
        <Stack.Screen name="Contact" component={ContactScreen} />
    </Stack.Navigator>
)

const BottomNavigation = () => (
    <Tab.Navigator>
       <Tab.Screen
        name="Home"
        options={{
          tabBarVisible:({route})=>(getTabBarVisibility(route)),
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" size={size} color={color} />
          ),
        }}
        component={HomeStack} />
      <Tab.Screen
        name="Saved"
        options={{
          tabBarLabel: 'Saved',
          tabBarIcon: ({ color, size }) => (
            <Icon name="star" size={size} color={color} />
          ),
        }}
        component={SavedPropertyScreen} />
      <Tab.Screen
        name="Me"
        options={{
          tabBarLabel: 'Me',
          tabBarIcon: ({ color, size }) => (
            <Icon name="user-circle" size={size} color={color} />
          ),
        }}
        component={ProfileScreen} />
    </Tab.Navigator>
)

const getTabBarVisibility = (route) => {
  console.warn(route)
  const routeName = route.state
    ? route.state.routes[route.state.index].name
    : '';
  if (routeName === 'Filter') {
    return false;
  }

  return true;
}

function MainNavigator() {
  return (
    <Stack.Navigator {...homeOptions}>
      <Stack.Screen name="Home" component={BottomNavigation} />
      <Stack.Screen name="Filter" component={FilterScreen} />
    </Stack.Navigator>
  );
}

export default App => (
    <NavigationContainer>
        <MainNavigator />
    </NavigationContainer>
)