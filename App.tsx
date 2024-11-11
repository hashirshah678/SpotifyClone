/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useCallback, useEffect} from 'react';
import {LogBox, Platform, StatusBar} from 'react-native';

import {} from 'react-native/Libraries/NewAppScreen';
import Navigation from './src/navigation/Navigation';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import TrackPlayer from 'react-native-track-player';

LogBox.ignoreAllLogs();
function App(): React.JSX.Element {

  useEffect(() => {
    (async()=>{if (Platform.OS === 'android') {
     await TrackPlayer.setupPlayer();
  }})();
  }, []);

  useCallback(() => {
    StatusBar.setBarStyle('dark-content');
    Platform.OS === 'android' && StatusBar.setBackgroundColor('transparent');
    StatusBar.setTranslucent(true);
  }, []);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <Navigation />
    </GestureHandlerRootView>
  );
}

export default App;
