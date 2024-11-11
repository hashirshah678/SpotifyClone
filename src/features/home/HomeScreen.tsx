/* eslint-disable react-native/no-inline-styles */
import { FlatList, StyleSheet } from 'react-native';
import React from 'react';
import CustomSafeAreaView from '../../component/ui/CustomSafeAreaView';
import withPlayer from '../../component/player/Player';
import { Track, usePlayerStore } from '../../state/usePlayerState';
import CustomHeader from '../../component/ui/CustomHeader';
import TrackItem from '../../component/track/TrackItem';

const HomeScreen = () => {
  const {allTrack} = usePlayerStore();

  const renderMusicTrack = ({item}:{item:Track})=>{
    return <TrackItem item={item} />;
  };

  return (
    <CustomSafeAreaView style={styles.container}>
      <CustomHeader title="Your Tracks" />
      <FlatList
        data={allTrack}
        renderItem={renderMusicTrack}
        keyExtractor={(item:any)=>item.id}
        showsVerticalScrollIndicator={false}
        style={{paddingTop:20}}
      />
    </CustomSafeAreaView>
  );
};

export default withPlayer(HomeScreen);

const styles = StyleSheet.create({
    container:{
    },
});
