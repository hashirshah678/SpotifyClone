import {Dimensions, LayoutChangeEvent, StyleSheet, View} from 'react-native';
import React, {FC, useEffect, useState} from 'react';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import CustomText from './CustomText';
import {fontR} from '../../utils/Scaling';

interface SlidingTextProps {
  text: string | undefined;
  fontSize: any;
  fontFamily: any;
}

const SlidingText: FC<SlidingTextProps> = ({fontFamily, fontSize, text}) => {
  const [textWidth, setTextWidth] = useState<number>(0);
  const containerWidth = Dimensions.get('window').width - 130;
  const translateX = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: translateX.value}],
    };
  });
  const handleTextLayout = (event: LayoutChangeEvent) => {
    const {width} = event.nativeEvent.layout;
    setTextWidth(width);
  };
  useEffect(() => {
    if (textWidth > containerWidth) {
      translateX.value = withRepeat(
        withTiming(-textWidth + 200, {
          duration: 8000,
          easing: Easing.linear,
        }),
        -1,
        true,
      );
    }else{
        translateX.value = 0;
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [textWidth, containerWidth, text]);
  return (
    <View style={styles.container}>
      <Animated.View style={[styles.textContainer, animatedStyle]}>
        <CustomText
          fontFamily={fontFamily}
          numberOfLines={1}
          fontSize={fontR(fontSize)}
          onLayout={handleTextLayout}>
          {text}
        </CustomText>
      </Animated.View>
    </View>
  );
};

export default SlidingText;

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    width: '100%',
  },
  textContainer: {
    flexDirection: 'row',
    width: 600,
  },
});
