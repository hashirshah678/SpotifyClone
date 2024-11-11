import {
  Image,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useSharedState} from '../../features/tabs/SharedContext';
import {usePlayerStore} from '../../state/usePlayerState';
import ImageColors from 'react-native-image-colors';
import {Colors, darkenColor, Fonts} from '../../utils/Constants';
import LinearGradient from 'react-native-linear-gradient';
import {fontR, screenHeight, screenWidth} from '../../utils/Scaling';
import Icon from '../ui/Icon';
import CustomText from '../ui/CustomText';
import VideoPlayer from './VideoPlayer';
import ControlAndDetails from './ControlAndDetails';

const FullScreenPlayer = () => {
  const [colors, setColors] = useState(['#666', '#666']);
  const {collapsePlayer} = useSharedState();
  const {currentPlayingTrack} = usePlayerStore();

  useEffect(() => {
    console.log('hashir');
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

  return (
    <View style={styles.container}>
      {currentPlayingTrack?.video_uri ? (
        <VideoPlayer video_uri={currentPlayingTrack?.video_uri} />
      ) : (
        <View style={styles.imageContainer}>
          <Image source={currentPlayingTrack?.artwork_uri} style={styles.img} />
        </View>
      )}
      <LinearGradient
        colors={[...colors, 'rgba(0,0,0,0.9)']}
        style={styles.gradient}
      />
      <View style={styles.flexRowDirection}>
        <TouchableOpacity onPress={collapsePlayer}>
          <Icon
            name="chevron-down-sharp"
            iconFamily="Iconicons"
            size={fontR(20)}
          />
        </TouchableOpacity>
        <CustomText fontFamily={Fonts.Black} variant="h6">
          {currentPlayingTrack?.artist?.name}
        </CustomText>
        <TouchableOpacity>
          <Icon
            name="ellipsis-horizontal-sharp"
            iconFamily="Iconicons"
            size={fontR(20)}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.ablumContainer} />
      <ControlAndDetails />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 'auto',
    width: screenWidth,
    backgroundColor: Colors.background,
  },
  gradient: {
    height: screenHeight,
    width: screenWidth,
    zIndex: -3,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  flexRowDirection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    marginTop: Platform.OS === 'android' ? 30 : 50,
  },
  ablumContainer: {
    width: '100%',
    height: screenHeight * 0.52,
  },
  imageContainer: {
    position: 'absolute',
    width: screenWidth * 0.9,
    height: screenHeight * 0.42,
    overflow: 'hidden',
    borderRadius: 10,
    alignSelf: 'center',
    top: screenHeight * 0.17,
  },
  img: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});

export default FullScreenPlayer;
