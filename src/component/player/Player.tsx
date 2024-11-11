import {Platform, StyleSheet, View} from 'react-native';
import React, {FC, useEffect, useRef} from 'react';
import {BOTTOM_TAB_HEIGHT} from '../../utils/Constants';
import {screenHeight} from '../../utils/Scaling';
import {
  Gesture,
  GestureDetector,
  ScrollView,
} from 'react-native-gesture-handler';
import Animated, {
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {useSharedState} from '../../features/tabs/SharedContext';
import FullScreenPlayer from './FullScreenPlayer';
import AirPlayer from './AirPlayer';
import {usePlayerStore} from '../../state/usePlayerState';

const MIN_PLAYER_HEIGHT = BOTTOM_TAB_HEIGHT + 60;
const MAX_PLAYER_HEIGHT = screenHeight;

const withPlayer = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
): FC<P> => {
  const WithPlayer: FC<P> = props => {
    const {translationY} = useSharedState();
    const isExpanded = useSharedValue(false);
    const isScroll = useSharedValue(false);
    const {currentPlayingTrack} = usePlayerStore();

    const scrollRef = useRef<Animated.ScrollView>(null);

    useEffect(() => {
      translationY.value = withTiming(0, {duration: 0});
    }, [translationY]);

    const onScroll = useAnimatedScrollHandler({
      onBeginDrag({contentOffset}) {
        if (contentOffset.y === 0) {
          isScroll.value = false;
        }
      },
      onEndDrag({contentOffset}) {
        if (contentOffset.y === 0) {
          isScroll.value = false;
        }
      },
      onMomentumBegin({contentOffset}) {
        if (contentOffset.y === 0) {
          isScroll.value = false;
        }
      },
      onMomentumEnd({contentOffset}) {
        if (contentOffset.y === 0) {
          isScroll.value = false;
        }
      },
    });

    const panGesture = Gesture.Pan()
      .onChange(() => {
        console.log(translationY.value, 'condition false');
        if (translationY.value <= -602) {
          console.log('condition true', translationY.value);
          isScroll.value = true;
        }
      })
      .onUpdate(event => {
        translationY.value = Math.max(
          Math.min(
            event.translationY +
              (isExpanded.value ? -MAX_PLAYER_HEIGHT + MIN_PLAYER_HEIGHT : 0),
            0,
          ),
          -MAX_PLAYER_HEIGHT + MIN_PLAYER_HEIGHT,
        );
        console.log('====================================');
        console.log(translationY.value, 'Max Value');
        console.log('====================================');
      })
      .onEnd(event => {
        if (event.translationY < -MIN_PLAYER_HEIGHT / 2) {
          isExpanded.value = true;
          translationY.value = withTiming(
            -MAX_PLAYER_HEIGHT + MIN_PLAYER_HEIGHT,
            {
              duration: 300,
            },
          );
        } else {
          isExpanded.value = false;
          translationY.value = withTiming(0, {
            duration: 300,
          });
        }
      })
      .enabled(!isScroll.value);

    const animatedContainerStyles = useAnimatedStyle(() => {
      const height = interpolate(
        translationY.value,
        [-MAX_PLAYER_HEIGHT + MIN_PLAYER_HEIGHT, 0],
        [MAX_PLAYER_HEIGHT, MIN_PLAYER_HEIGHT],
        'clamp',
      );
      return {
        height,
        borderTopLeftRadius: translationY.value < -2 ? 15 : 0,
        borderTopRightRadius: translationY.value < -2 ? 15 : 0,
      };
    });

    const collapsedOpacityStyle = useAnimatedStyle(() => {
      const opacity = interpolate(translationY.value, [-2, 0], [0, 1], 'clamp');
      return {
        opacity,
        display: translationY.value < -2 ? 'none' : 'flex',
      };
    });

    const expandedOpacityStyle = useAnimatedStyle(() => {
      const opacity = interpolate(translationY.value, [-2, 0], [1, 0], 'clamp');
      return {
        opacity,
        display: translationY.value > -2 ? 'none' : 'flex',
      };
    });

    const combinationGesture = Gesture.Simultaneous(
      Gesture.Native(),
      panGesture,
    );

    return (
      <View style={styles.conatiner}>
        <WrappedComponent {...props} />
        {currentPlayingTrack && (
          <GestureDetector gesture={combinationGesture}>
            <Animated.View
              style={[styles.playerContainer, animatedContainerStyles]}>
              {Platform.OS === 'ios' ? (
                <Animated.ScrollView
                  persistentScrollbar={true}
                  ref={scrollRef}
                  pinchGestureEnabled={true}
                  bounces={false}
                  showsVerticalScrollIndicator={false}
                  scrollEventThrottle={1}
                  onScroll={onScroll}
                  contentContainerStyle={styles.expandedPlayer}
                  style={expandedOpacityStyle}
                  >
                  <FullScreenPlayer />
                </Animated.ScrollView>
              ) : (
                <Animated.View style={expandedOpacityStyle}>
                  <ScrollView
                    nestedScrollEnabled={true}
                    persistentScrollbar={true}
                    contentContainerStyle={styles.expandedPlayer}
                    pinchGestureEnabled={true}
                    bounces={false}
                    scrollEventThrottle={1}
                    showsVerticalScrollIndicator={false}>
                    <FullScreenPlayer />
                  </ScrollView>
                </Animated.View>
              )}

              <Animated.View
                style={[styles.collapsedPlayer, collapsedOpacityStyle]}>
                <AirPlayer />
              </Animated.View>
            </Animated.View>
          </GestureDetector>
        )}
      </View>
    );
  };

  return React.memo(WithPlayer);
};

export default withPlayer;

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
  },
  expandedPlayer: {
    alignItems: 'center',
    backgroundColor: '#444',
  },
  playerContainer: {
    position: 'absolute',
    width: '100%',
    bottom: 0,
    zIndex: 1,
    overflow: 'hidden',
  },
  collapsedPlayer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
