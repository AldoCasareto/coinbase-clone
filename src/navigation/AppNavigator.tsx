import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Home';
import Actions from '../screens/Actions';
import News from '../screens/News';
import Portfolio from '../screens/Portfolio';
import Prices from '../screens/Prices';
import Settings from '../screens/Settings';
import { NavigationContainer } from '@react-navigation/native';
import TabBar from '../components/TabBar';

const TabBarNavigator = createBottomTabNavigator();

const HomeStackNavigator = createNativeStackNavigator();

const HomeNavigator = () => {
  return (
    <HomeStackNavigator.Navigator>
      <HomeStackNavigator.Screen name='News' component={News} />
      <HomeStackNavigator.Screen name='Home' component={Home} />
    </HomeStackNavigator.Navigator>
  );
};

const TabNavigator = () => {
  return (
    <TabBarNavigator.Navigator tabBar={(props) => <TabBar {...props} />}>
      <TabBarNavigator.Screen name='Home' component={Home} />
      <TabBarNavigator.Screen name='Portfolio' component={Portfolio} />
      <TabBarNavigator.Screen name='Actions' component={Actions} />
      <TabBarNavigator.Screen name='Prices' component={Prices} />
      <TabBarNavigator.Screen name='Settings' component={Settings} />
    </TabBarNavigator.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
  );
};

export default AppNavigator;
