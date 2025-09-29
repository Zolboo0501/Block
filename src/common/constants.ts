import images from '@images';

export const baseUrl = 'blackwater.app.erxes.io/gateway';

export const apiUrl = `https://${baseUrl}`;
export const ClIENTPORTAL_ID = 'lVXMu28c3FdHCvDUh2uWw';

export const ERXES_APP_TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHAiOnsibmFtZSI6Ik1vYmlsZSB0b2tlbiIsImNyZWF0ZWRBdCI6IjIwMjUtMDktMjVUMDE6MTc6MjcuMzQ2WiIsInVzZXJHcm91cElkIjoiNEVIeWRUREFpczJMZFFuWm4iLCJleHBpcmVEYXRlIjoiMjAyNS0xMC0yOVQwMTo0NDo0Ny4wMjFaIiwibm9FeHBpcmUiOnRydWUsImFsbG93QWxsUGVybWlzc2lvbiI6dHJ1ZSwiX2lkIjoiQ2NCOGNsQllIOHdsZWZaSkdZVWNuIiwiX192IjowfSwiaWF0IjoxNzU5MTEwMjk1fQ.uX8HEzpDNEk3iui3kiArniq8MH5bUG6mu_xl0x9Vl2I';

export const MEMBERSHIP_ID = 'sB4QZwYtvF3vvzErPSc7y';
export const STATUS_ID = 'ZneG0ueA_cyXkTpGMoxSx';
export const SINCE_ID = 'qYPIouGEzKDbdmuGq0Lxo';
export const BY_ID = '2KFu_MYJtA4recxaJbpiV';
export const AUTOMATION_ID = '68c82ced0bb31c5a338ca0b8';
export const CODE_PUSH_ID = 'nwbcnpkjdixemdxjhjom';
export const MEMBERSHIP_DATA = [
  {
    image: images.member3,
    name: 'ANNUAL',
    price: '$1000',
    key: 'ANNUAL',
    duration: 1,
  },
  {
    image: images.member,
    name: 'PLATINUM',
    price: '‍$2,000',
    key: 'PLATINUM',
    duration: 4,
  },
  {
    image: images.member2,
    name: 'LIFETIME',
    price: '‍$5,000',
    key: 'LIFETIME',
    duration: 999,
  },
];

export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const selectData = [
  { label: 'Mr', value: 1 },
  { label: 'Ms', value: 2 },
];

export const initialLoginState = {
  isLoading: false,
  loginToken: null,
};
