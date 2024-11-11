import { StyleSheet } from 'react-native';
import React, { FC } from 'react';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { BOTTOM_TAB_HEIGHT, Colors } from '../../utils/Constants';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ScalePress from '../../component/ui/ScalePress';
import { HomeTabIcon, LibraryTabIcon, SearchTabIcon } from './TabIcon';
import { useSharedState } from './SharedContext';

const CustomTabBar:FC<BottomTabBarProps> = (props) => {
const {state,navigation} = props;

const SafeAreaInsets = useSafeAreaInsets();

const {translationY} = useSharedState();

const animatedStyle  = useAnimatedStyle(()=>{
    // console.log(translationY.value);
    return {
        transform:[{translateY:-translationY.value}],
    };
});

  return (
    <Animated.View style={[styles.tabBarContainer,{paddingBottom:SafeAreaInsets.bottom},animatedStyle]}>
     {
        state.routes.map((route,index)=>{
            const isFocused = state.index === index;
            const onPress = ()=>{
                const event = navigation.emit({
                    type:'tabPress',
                    target:route.key,
                    canPreventDefault:true,
                });
                if (!isFocused && !event?.defaultPrevented) {
                    navigation.navigate(route.name);
                }
            };

            const onLongPress = ()=>{
                navigation.emit({
                    type:'tabLongPress',
                    target:route.key,
                });
            };

            return <ScalePress
            style={styles.tabItem}
            key={index}
            onPress={onPress}
            onLongPress={onLongPress}
            >
               {
                route?.name === 'Home' && <HomeTabIcon focusedIcon={isFocused} />
               }
               {
                route?.name === 'Search' && <SearchTabIcon focusedIcon={isFocused} />
               }
               {
                route?.name === 'Library' && <LibraryTabIcon focusedIcon={isFocused} />
               }
            </ScalePress>;
        })
     }
    </Animated.View>
  );
};

export default CustomTabBar;
const styles = StyleSheet.create({
    tabBarContainer:{
        backgroundColor:Colors.backgroundDark,
        height:BOTTOM_TAB_HEIGHT,
        width:'100%',
        position:'absolute',
        bottom:0,
        paddingTop:10,
        zIndex:5,
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-around',
    },
    tabItem:{
        justifyContent:'center',
        alignItems:'center',
    },
});
