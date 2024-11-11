import React, { FC } from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { navigationRef } from '../utils/NavigationUtils';
import SplashScreen from '../features/auth/SplashScreen';
import MoodScanScreen from '../features/moodscan/MoodScanScreen';
import SharedTranstition from '../features/tabs/SharedTranstition';

const Stack = createNativeStackNavigator();

const Navigation:FC = () => {
  return (
    <NavigationContainer ref={navigationRef}>
        <Stack.Navigator
            initialRouteName="SplashScreen"
            screenOptions={{
                headerShown:false,
                animation:'fade',
            }}
        >
            <Stack.Screen name="SplashScreen" component={SplashScreen} />
            <Stack.Screen name="MoodScanScreen" component={MoodScanScreen} />
            <Stack.Screen name="SharedTranstition" component={SharedTranstition} />
        </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
