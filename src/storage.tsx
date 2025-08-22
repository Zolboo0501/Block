import { MMKV } from 'react-native-mmkv';

export const storage = new MMKV();

const keys = {
  loginToken: 'loginToken',
  deviceToken: 'deviceToken',
  latestAccount: 'latestAccount',
  isLogOut: 'isLogOut',
  splashShow: 'splashShow',
  loginFaceId: 'loginFaceId',
  confirmFaceId: 'confirmFaceId',
  isNewNotify: 'isNewNotify',
};

const allKeys = storage.getAllKeys();

function storeLatestAccount(account: any) {
  storage.set(keys.latestAccount, JSON.stringify(account));
}

function getLatestAccount() {
  const latest = storage.getString(keys.latestAccount);

  if (latest) {
    return JSON.parse(latest);
  }
  return null;
}

export { keys, allKeys, storeLatestAccount, getLatestAccount };
