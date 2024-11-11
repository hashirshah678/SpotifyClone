import { Image, StyleSheet, View } from 'react-native';
import React, { FC, useEffect } from 'react';
import { Colors } from '../../utils/Constants';
import { screenHeight, screenWidth } from '../../utils/Scaling';
import { resetAndNavigate } from '../../utils/NavigationUtils';

const SplashScreen:FC = () => {

    useEffect(() => {
      const setTime = setTimeout(()=>{
        resetAndNavigate('SharedTranstition');
      },1000);
      return () => {
        clearTimeout(setTime);
      };
    }, []);

  return (
    <View style={styles.container}>
        <Image source={require('../../assets/images/logo.png')} style={styles.logoImage} />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
    container:{
        backgroundColor:Colors.background,
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    },
    logoImage:{
        height:screenHeight * 0.4,
        width:screenWidth * 0.4,
        resizeMode:'contain',
    },
});
