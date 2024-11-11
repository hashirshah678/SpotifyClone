/* eslint-disable react-native/no-inline-styles */
import {
  Image,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {FC, useEffect, useState} from 'react';
import {useSharedState} from '../../features/tabs/SharedContext';
import {darkenColor, Fonts} from '../../utils/Constants';
import {usePlaybackState, useProgress} from 'react-native-track-player';
import {usePlayerStore} from '../../state/usePlayerState';
import ImageColors from 'react-native-image-colors';
import LinearGradient from 'react-native-linear-gradient';
import SlidingText from '../ui/SlidingText';
import {fontR} from '../../utils/Scaling';
import CustomText from '../ui/CustomText';
import Icon from '../ui/Icon';

const AirPlayer: FC = () => {
  const [colors, setColors] = useState(['#666', '#666']);
  const progress = useProgress();
  const {expandPlayer} = useSharedState();
  const state = usePlaybackState();
  const isPlaying = state.state === 'playing';
  const {play, pause, currentPlayingTrack} = usePlayerStore();

  useEffect(() => {
    const url = currentPlayingTrack?.artwork_uri;
    ImageColors.getColors(url, {
      fallback: '#666',
      cache: true,
      key: url,
    }).then((c: any) => {
      const color = Platform.OS === 'android' ? c.vibrant : c.secondary;
      const darkenedSecondary = darkenColor(color);
      setColors([darkenedSecondary, darkenedSecondary]);
    });
  }, [currentPlayingTrack]);

  const calculateProgressWidth: any = () => {
    if (progress.duration > 0) {
      const percentage = (progress?.position / progress?.duration) * 100;
      return `${percentage}%`;
    }
    return '0%';
  };

  const togglePlay = async () => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  };

  return (
    <LinearGradient colors={colors} style={styles.container}>
      <View style={styles.flexRowBetween}>
        <TouchableOpacity onPress={expandPlayer} activeOpacity={1}>
          <View style={styles.flexRow}>
            <Image
              source={currentPlayingTrack?.artwork_uri}
              style={styles.img}
            />
            <View style={{width: '68%'}}>
              <SlidingText
                fontFamily={Fonts.Bold}
                fontSize={fontR(8)}
                text={currentPlayingTrack?.title}
              />
              <CustomText
                fontFamily={Fonts.Medium}
                style={{opacity: 0.8}}
                fontSize={fontR(9)}
                numberOfLines={1}>
                {currentPlayingTrack?.artist?.name}
              </CustomText>
            </View>
          </View>
        </TouchableOpacity>
        <View style={styles.flexRow}>
          <Icon
            name="broadcast-on-home"
            iconFamily="MaterialIcons"
            color="#ccc"
            size={fontR(20)}
          />
          <TouchableOpacity onPress={togglePlay}>
            <Icon
              name={isPlaying ? 'pause' : 'play-arrow'}
              iconFamily="MaterialIcons"
              size={fontR(22)}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.progressContainer}>
        <View style={styles.processBackground}>
          <View style={[styles.processBar,{width:calculateProgressWidth()}]} />
        </View>
      </View>
    </LinearGradient>
  );
};

export default AirPlayer;

const styles = StyleSheet.create({
  container: {
    paddingTop: 4,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 5,
    overflow: 'hidden',
    width: '100%',
  },
  img: {
    borderRadius: 5,
    width: 45,
    height: 45,
    resizeMode: 'cover',
  },
  flexRowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  progressContainer: {
    height: 2,
    width: '100%',
    marginTop: 5,
  },
  processBackground: {
    height: 3,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  processBar: {
    height: 3,
    backgroundColor: '#fff',
  },
});
