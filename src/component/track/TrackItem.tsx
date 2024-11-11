import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {FC} from 'react';
import {Track, usePlayerStore} from '../../state/usePlayerState';
import {Colors, Fonts} from '../../utils/Constants';
import {resetAndNavigate} from '../../utils/NavigationUtils';
import CustomText from '../ui/CustomText';
import {fontR} from '../../utils/Scaling';
import Icon from '../ui/Icon';

interface TrackItemProps {
  item: Track;
  onNavigate?: boolean;
}

const TrackItem: FC<TrackItemProps> = ({item, onNavigate}) => {
  const {currentPlayingTrack, setCurrentPlayingTrack} = usePlayerStore();
  const togglePlayTrack = async () => {
    await setCurrentPlayingTrack(item);
  };
  const isActive = currentPlayingTrack?.id === item?.id;
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.container}
      onPress={() => {
        togglePlayTrack();
        if (onNavigate) {
          // resetAndNavigate('UserBottomTab');
          resetAndNavigate('SharedTranstition');
        }
      }}>
      <View style={styles.flexRowBetween}>
        <View style={styles.flexRow}>
          <Image source={item?.artwork_uri} style={styles.img} />
          <View style={styles.trackInfo}>
            <CustomText
              numberOfLines={1}
              style={{
                color: isActive ? Colors.primary : Colors.text,
              }}
              fontFamily={Fonts.Medium}
              fontSize={fontR(9)}>
              {item?.title}
            </CustomText>
            <CustomText numberOfLines={1} fontSize={fontR(8)}>
              {item?.artist?.name}
            </CustomText>
          </View>
        </View>
        <Icon
          name="ellipsis-horizontal-sharp"
          iconFamily="Iconicons"
          size={fontR(14)}
        />
      </View>
    </TouchableOpacity>
  );
};

export default TrackItem;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: Colors.backgroundDark,
    marginVertical: 5,
  },
  flexRowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  img: {
    borderRadius: 4,
    width: 45,
    height: 45,
    resizeMode: 'cover',
  },
  trackInfo: {
    width: '65%',
  },
});
