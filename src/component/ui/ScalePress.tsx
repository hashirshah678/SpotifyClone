/* eslint-disable react-native/no-inline-styles */
import { Animated,  TouchableOpacity, ViewStyle } from 'react-native';
import React, { FC } from 'react';

interface ScalePressProps{
    onPress?:()=>void;
    onLongPress?:()=>void;
    children:React.ReactNode;
    style?:ViewStyle;
}


const ScalePress:FC<ScalePressProps> = ({
    children,
    onLongPress,
    onPress,
    style,
}) => {

    const scaleValue = new Animated.Value(1);

    const onPressIn = ()=>{
        Animated.spring(scaleValue,{
          toValue:0.8,
          useNativeDriver:true,
        }).start();
    };

    const onPressOut = ()=>{
      Animated.timing(scaleValue,{
        toValue:1,
        duration:300,
        useNativeDriver:true,
      }).start();
    };

  return (
    <TouchableOpacity
      onPress={onPress}
      onPressIn={onPressIn}
      onLongPress={onLongPress}
      onPressOut={onPressOut}
      activeOpacity={1}
      style={style}
    >
      <Animated.View style={[{transform:[{scale:scaleValue}],width:'100%'}]}>
        {children}
      </Animated.View>
    </TouchableOpacity>
  );
};

export default ScalePress;

