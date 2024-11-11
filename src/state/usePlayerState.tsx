import {create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';
import {mmkvStorgae} from './Storage';
import {trackData} from '../utils/dummyData';
import TrackPlayer, {RepeatMode} from 'react-native-track-player';
import {convertTrack} from '../utils/Constants';

interface artistProps {
  id: any;
  name: string;
  bio: string;
  cover_uri: any;
}

export interface Track {
  id: any;
  track_uri: any;
  video_uri?: any;
  title: string;
  lyricist: string;
  artist: artistProps;
  artwork_uri: any;
  category: string;
}

interface PlayerStore {
  currentPlayingTrack: Track | null;
  allTrack: Track[];
  isShuffling: boolean;
  isRepeating: boolean;
  clear: () => void;
  setCurrentTrack: (track: Track) => Promise<void>;
  setCurrentPlayingTrack: (track: Track) => Promise<void>;
  play: () => Promise<void>;
  pause: () => Promise<void>;
  next: () => Promise<void>;
  previous: () => Promise<void>;
  toggleShuffle: () => Promise<void>;
  toggleRepeat: () => Promise<void>;
}

export const usePlayerStore = create<PlayerStore>()(
  persist(
    (set, get) => ({
      currentPlayingTrack: null,
      allTrack: trackData,
      isShuffling: false,
      isRepeating: false,
      clear: () => {
        set({currentPlayingTrack: null});
      },
      setCurrentTrack: async (track: Track) => {
        set({currentPlayingTrack: track});
      },
      setCurrentPlayingTrack: async (track: Track) => {
        try {
          const {allTrack} = get();
          await TrackPlayer.reset();

          set({currentPlayingTrack: track});
          const currentTrackConverted = convertTrack(track);
          const otherTracks = allTrack
            .filter(subtrack => subtrack.id !== track?.id)
            .map(filterTrack => convertTrack(filterTrack));

          await TrackPlayer.add([currentTrackConverted, ...otherTracks]);
          await TrackPlayer.play();
        } catch (error) {
          console.log('====================================');
          console.log(error);
          console.log('====================================');
        }
      },
      play: async () => {
        // when your application is turn on and you open app again play song then it again loading tracks
        try {
          const {currentPlayingTrack, allTrack} = get();
          const activeTrack = await TrackPlayer.getActiveTrack();

          if (activeTrack) {
            await TrackPlayer.play();
          } else {
            await TrackPlayer.reset();
            const convertCurrentTrack = convertTrack(currentPlayingTrack);
            const otherTracks = allTrack
              .filter(subtrack => subtrack.id !== currentPlayingTrack?.id)
              .map(filterTrack => convertTrack(filterTrack));

            await TrackPlayer.add([convertCurrentTrack, ...otherTracks]);
            await TrackPlayer.play();
          }
        } catch (error) {
          console.log('====================================');
          console.log(error);
          console.log('====================================');
        }
      },
      pause: async () => {
        await TrackPlayer.pause();
      },
      next: async () => {
        try {
          const {allTrack, currentPlayingTrack, isRepeating} = get();
          await TrackPlayer.reset();
          if (isRepeating) {
            const convertCurrentTrack = convertTrack(currentPlayingTrack);
            await TrackPlayer.add([convertCurrentTrack]);
            await TrackPlayer.play();
            return;
          }
          const currentIndex = allTrack?.findIndex(
            track => track === currentPlayingTrack?.id,
          );
          let nextIndex = (currentIndex + 1) % allTrack?.length;
          if (allTrack?.length === 1) {
            nextIndex = currentIndex;
          }
          const nextTrack = allTrack[nextIndex];
          if (nextTrack) {
            set({currentPlayingTrack: nextTrack});
            const convertnextTrack = convertTrack(nextTrack);
            const otherTracks = allTrack
              .filter(subtrack => subtrack.id !== nextTrack?.id)
              .map(filterTrack => convertTrack(filterTrack));

            await TrackPlayer.add([convertnextTrack, ...otherTracks]);
            await TrackPlayer.play();
          }
        } catch (error) {
          console.log('====================================');
          console.log(error);
          console.log('====================================');
        }
      },
      previous: async () => {
        try {
          const {allTrack, currentPlayingTrack, isRepeating} = get();
          await TrackPlayer.reset();
          if (isRepeating) {
            const convertCurrentTrack = convertTrack(currentPlayingTrack);
            await TrackPlayer.add([convertCurrentTrack]);
            await TrackPlayer.play();
            return;
          }
          const currentIndex = allTrack?.findIndex(
            track => track === currentPlayingTrack?.id,
          );
          let previousIndex =
            (currentIndex - 1 + allTrack?.length) % allTrack?.length;
          const previousTrack = allTrack[previousIndex];
          if (previousTrack) {
            set({currentPlayingTrack: previousTrack});
            const convertpreviousTrack = convertTrack(previousTrack);
            const otherTracks = allTrack
              .filter(subtrack => subtrack.id !== previousTrack?.id)
              .map(filterTrack => convertTrack(filterTrack));

            await TrackPlayer.add([convertpreviousTrack, ...otherTracks]);
            await TrackPlayer.play();
          }
        } catch (error) {
          console.log('====================================');
          console.log(error);
          console.log('====================================');
        }
      },
      toggleRepeat: async () => {
        try {
          const {currentPlayingTrack} = get();
          const currentTrackConvert = convertTrack(currentPlayingTrack);
          await TrackPlayer.reset();
          await TrackPlayer.add([currentTrackConvert]);
          await TrackPlayer.setRepeatMode(RepeatMode.Track);
          await TrackPlayer.play();
          set({isRepeating: true});
          set({isShuffling: false});
        } catch (error) {
          console.log('====================================');
          console.log(error);
          console.log('====================================');
        }
      },
      toggleShuffle: async () => {
        try {
          const {currentPlayingTrack, allTrack} = get();
          const currentTrackConvert = convertTrack(currentPlayingTrack);
          await TrackPlayer.reset();
          const otherTracks = allTrack
            .filter(subtrack => subtrack.id !== currentPlayingTrack?.id)
            .map(filterTrack => convertTrack(filterTrack));

          await TrackPlayer.add([currentTrackConvert, ...otherTracks]);
          // await TrackPlayer.play();
          await TrackPlayer.setRepeatMode(RepeatMode.Off);
          await TrackPlayer.play();
          set({isRepeating: false});
          set({isShuffling: true});
        } catch (error) {
          console.log('====================================');
          console.log(error);
          console.log('====================================');
        }
      },
    }),
    {
      name: 'player-storage',
      storage: createJSONStorage(() => mmkvStorgae),
    },
  ),
);
