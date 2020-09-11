/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';
import React from 'react';
import DetailScreen from './DetailScreen';
import HomeScreen from './HomeScreen';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';


const AppNavigator = createStackNavigator(
  {
    Home: {
      screen: HomeScreen, navigationOptions: {
        headerShown: null,
      },
    },
    Details: {
      screen: DetailScreen, navigationOptions: {
        headerShown: null,
      },
    },
  },
  {
    initialRouteName: "Home"
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}  
