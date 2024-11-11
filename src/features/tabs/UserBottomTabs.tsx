/* eslint-disable react/no-unstable-nested-components */
import React, { FC } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../home/HomeScreen';
import SearchScreen from '../search/SearchScreen';
import LibraryScreen from '../library/LibraryScreen';
import CustomTabBar from './CustomTabBar';

const Tab = createBottomTabNavigator();

const UserBottomTabs:FC = () => {
  return (
   <Tab.Navigator
    tabBar={(props)=> <CustomTabBar {...props} />}
    screenOptions={()=>({
        headerShown:false,
        tabBarHideOnKeyboard:true,
    })}
   >
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="Search" component={SearchScreen} />
    <Tab.Screen name="Library" component={LibraryScreen} />
   </Tab.Navigator>
  );
};

export default UserBottomTabs;
