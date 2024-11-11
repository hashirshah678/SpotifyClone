/* eslint-disable react-native/no-inline-styles */
import {Platform, StyleSheet,  View} from 'react-native';
import React, {FC, useEffect, useState} from 'react';
import {usePlayerStore} from '../../state/usePlayerState';
import TrackPlayer, {
  usePlaybackState,
  useProgress,
} from 'react-native-track-player';
import {Colors, Fonts} from '../../utils/Constants';
import {fontR, screenWidth} from '../../utils/Scaling';
import SlidingText from '../ui/SlidingText';
import CustomText from '../ui/CustomText';
import ScalePress from '../ui/ScalePress';
import Slider from '@react-native-community/slider';
import Icon from '../ui/Icon';
import PackageIcon from 'react-native-vector-icons/MaterialIcons';
import {Image} from 'react-native';

const ControlAndDetails: FC = () => {
  const progress = useProgress();
  const [icon, setIcon] = useState();
  const state = usePlaybackState();
  const isPlaying = state.state === 'playing';
  const {
    play,
    pause,
    currentPlayingTrack,
    toggleRepeat,
    toggleShuffle,
    next,
    previous,
    isRepeating,
  } = usePlayerStore();

  const formatTime = (seconds: any) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const togglePlay = async () => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  };

  const handleSeek = async (value: any) => {
    await TrackPlayer.seekTo(value * progress?.duration);
  };
  const handlePrevious = async () => {
    await previous();
  };
  const handleNext = async () => {
    await next();
  };

  const handleLooping = async () => {
    if (isRepeating) {
      toggleShuffle();
    } else {
      toggleRepeat();
    }
  };

  useEffect(() => {
    PackageIcon.getImageSource('circle', 15, 'white').then(setIcon);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.flexRowBetween}>
        <View style={{width: '85%'}}>
          <SlidingText
            fontFamily={Fonts.Bold}
            fontSize={fontR(14)}
            text={currentPlayingTrack?.title}
          />
          <CustomText
            fontFamily={Fonts.Medium}
            fontSize={fontR(9)}
            style={styles.artist}>
            {currentPlayingTrack?.artist?.name}
          </CustomText>
        </View>
        <ScalePress>
          <Icon
            name="add-circle-outline"
            iconFamily="MaterialIcons"
            size={fontR(28)}
          />
        </ScalePress>
      </View>

      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={1}
        value={progress?.position / progress?.duration || 0}
        tapToSeek
        onSlidingComplete={handleSeek}
        thumbImage={icon}
        minimumTrackTintColor="#fff"
        maximumTrackTintColor="rgba(255,255,255,0.2)"
      />

      <View style={styles.timeZone}>
        <CustomText fontSize={fontR(7)}>
          {formatTime(progress?.position)}
        </CustomText>
        <CustomText fontSize={fontR(7)}>
          {formatTime(progress?.duration - progress?.position)}
        </CustomText>
      </View>

      <View style={styles.flexRowBetween}>
        <ScalePress onPress={handleLooping}>
          <Icon
            name={isRepeating ? 'repeat' : 'shuffle'}
            iconFamily="Iconicons"
            color={Colors.primary}
            size={fontR(22)}
          />
        </ScalePress>
        <ScalePress onPress={handlePrevious}>
          <Icon
            name={'play-skip-back-sharp'}
            iconFamily="Iconicons"
            size={fontR(26)}
          />
        </ScalePress>
        <ScalePress onPress={togglePlay}>
          <Icon
            name={isPlaying ? 'pause-circle-sharp' : 'play-circle-sharp'}
            iconFamily="Iconicons"
            size={fontR(50)}
          />
        </ScalePress>
        <ScalePress onPress={handleNext}>
          <Icon
            name={'play-skip-forward-sharp'}
            iconFamily="Iconicons"
            size={fontR(26)}
          />
        </ScalePress>
        <ScalePress>
          <Icon
            name={'alarm'}
            iconFamily="MaterialCommunityIcons"
            size={fontR(22)}
          />
        </ScalePress>
      </View>

      <View style={styles.artistContainer}>
        <Image
          source={currentPlayingTrack?.artist?.cover_uri}
          style={styles.artistCover}
        />
        <View style={{paddingHorizontal: 20, paddingVertical: 15}}>
          <CustomText fontFamily={Fonts.Bold} fontSize={fontR(11)}>
            {currentPlayingTrack?.artist?.name}
          </CustomText>
          <CustomText
            fontFamily={Fonts.Medium}
            fontSize={fontR(8)}
            style={{opacity: 0.7}}>
            1.77 Millions fans
          </CustomText>
          <CustomText
            fontFamily={Fonts.Medium}
            numberOfLines={3}
            fontSize={fontR(8)}
            style={{marginTop: 10, opacity: 0.8}}>
            {currentPlayingTrack?.artist?.bio}
          </CustomText>
        </View>
      </View>

      <View style={styles.infoContainer}>
        <CustomText
          fontFamily={Fonts.Bold}
          numberOfLines={3}
          fontSize={fontR(11)}>
          Credits
        </CustomText>
        <CustomText
          fontFamily={Fonts.Medium}
          fontSize={fontR(9)}
          style={styles.titleText}>
          {currentPlayingTrack?.artist?.name}
        </CustomText>
        <CustomText fontSize={fontR(8)} style={styles.subText}>
          Main Artitsh, Composer, Producer
        </CustomText>
        <CustomText
          fontFamily={Fonts.Medium}
          fontSize={fontR(9)}
          style={styles.titleText}>
          {currentPlayingTrack?.lyricist}
        </CustomText>
        <CustomText fontSize={fontR(8)} style={styles.subText}>
            lyricist
        </CustomText>
      </View>

      <View style={styles.infoContainer}>
      <CustomText
          fontFamily={Fonts.Bold}
          fontSize={fontR(9)}
          style={styles.titleText}>
          If you enjoy this then follow me at instagram evil_boy_never
        </CustomText>
      <CustomText
          fontFamily={Fonts.Medium}
          fontSize={fontR(8)}
          style={styles.subText}>
          Programmer: evil_boy_never
        </CustomText>
      </View>

      <View style={styles.modelContainer}>
      <CustomText
          fontFamily={Fonts.Bold}
          fontSize={fontR(16)}
          style={styles.titleText}>
          Spotify_Clone created by evil_boy_never
        </CustomText>
      <CustomText
          fontFamily={Fonts.Medium}
          fontSize={fontR(14)}
          style={styles.subText}>
            evil_boy_never Contact No 0317-6712477
        </CustomText>
      <CustomText fontFamily={Fonts.Regular}
          fontSize={fontR(12)}
          style={styles.subText}>
          made with love Devil
        </CustomText>
      </View>
    </View>
  );
};

export default ControlAndDetails;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    zIndex: 88,
  },
  subText: {
    marginTop: 2,
    opacity: 0.8,
  },
  titleText: {
    marginTop: 10,
  },
  modelContainer: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 100,
    marginBottom: 40,
    opacity: 0.6,
  },
  artistContainer: {
    backgroundColor: Colors.backgroundLight,
    borderRadius: 12,
    overflow: 'hidden',
    marginTop: 40,
  },
  infoContainer: {
    backgroundColor: Colors.backgroundLight,
    borderRadius: 12,
    overflow: 'hidden',
    marginTop: 20,
    padding: 10,
  },
  artistCover: {
    height: 250,
    width: '100%',
    resizeMode: 'cover',
  },
  slider: {
    width: Platform.OS === 'android' ? screenWidth : screenWidth - 30,
    height: 40,
    alignSelf: 'center',
    marginTop: 10,
  },
  timeZone: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    bottom: 10,
  },
  flexRowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  artist: {
    opacity: 0.8,
    marginTop: 5,
  },
});
