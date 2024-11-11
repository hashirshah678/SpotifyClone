import {StyleSheet, View} from 'react-native';
import React from 'react';
import CustomSafeAreaView from '../../component/ui/CustomSafeAreaView';
import CustomHeader from '../../component/ui/CustomHeader';
import Icon from '../../component/ui/Icon';
import { fontR, screenHeight } from '../../utils/Scaling';
import CustomText from '../../component/ui/CustomText';
import withPlayer from '../../component/player/Player';

const LibraryScreen = () => {
  return (
    <CustomSafeAreaView>
    <CustomHeader title="" />
    <View style={styles.container}>
      <Icon name="musical-note" size={fontR(40)}  iconFamily="Iconicons" />
      <CustomText variant="h4">
        Coming Soon...
      </CustomText>
    </View>
  </CustomSafeAreaView>
  );
};

export default withPlayer(LibraryScreen);

const styles = StyleSheet.create({
  container: {
    height: screenHeight * 0.7,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
