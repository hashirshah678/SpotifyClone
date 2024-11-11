// src/services/PlaybackService.ts
import TrackPlayer, {Event, Capability, AppKilledPlaybackBehavior} from 'react-native-track-player';
import {usePlayerStore} from '../state/usePlayerState';

export const PlaybackService = async function () {
  try {
  // Play the track to the notification
  TrackPlayer.addEventListener(Event.RemotePlay, () => TrackPlayer.play());

  TrackPlayer.addEventListener(Event.RemotePause, () => TrackPlayer.pause());

  TrackPlayer.addEventListener(Event.RemoteNext, async() => {
    await usePlayerStore?.getState()?.next();
});

TrackPlayer.addEventListener(Event.RemotePrevious, async() => {
    await usePlayerStore?.getState()?.previous();
  });

  TrackPlayer.addEventListener(Event.RemoteStop, () => {
    TrackPlayer.stop();
    usePlayerStore.getState().clear();
  });

  TrackPlayer.addEventListener(
    Event.PlaybackActiveTrackChanged,
    async event => {
      const currentTrack = usePlayerStore.getState().currentPlayingTrack;
      if (
        event?.track?.id === undefined ||
        currentTrack?.id === event?.track?.id
      ) {
        return;
      }
      const allTracks = usePlayerStore.getState().allTrack;
      const track = allTracks?.find(item => item.id === event?.track?.id);
      usePlayerStore?.getState()?.setCurrentTrack(track!!);
    },
  );

  await TrackPlayer.setupPlayer();
  await TrackPlayer.updateOptions({
    android:{
        // This is the default behavior
        appKilledPlaybackBehavior: AppKilledPlaybackBehavior.ContinuePlayback,
    },
    capabilities: [
      Capability.Play,
      Capability.Pause,
      Capability.SkipToNext,
      Capability.SkipToPrevious,
      Capability.Stop,
    ],
    compactCapabilities: [Capability.Play, Capability.Pause],
  });
} catch (error) {
 console.log('====================================');
 console.log(error);
 console.log('====================================');
}
};
