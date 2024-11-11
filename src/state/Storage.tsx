import {MMKV} from 'react-native-mmkv';

export const storage = new MMKV({
  id: 'my-spotify-app-storage',
  encryptionKey: 'somesecretkey',
});

export const mmkvStorgae = {
  setItem: (key: string, value: string) => {
    storage.set(key, value);
  },
  getItem: (key: string) => {
    const value = storage.getString(key);
    return value ?? null;
  },
  removeItem: (key: string) => {
    storage.delete(key);
  },
};

    // "react-native": "0.76.1",
