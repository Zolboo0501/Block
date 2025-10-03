import images from '@images';

export const baseUrl = 'blockhq.app.erxes.io/gateway';

export const apiUrl = `https://${baseUrl}`;
export const ClIENTPORTAL_ID = 'iop0LHWvOyJFcbXZUPs85';

export const ERXES_APP_TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHAiOnsibmFtZSI6Ik1vYmlsZSB0b2tlbiIsImNyZWF0ZWRBdCI6IjIwMjUtMTAtMDNUMDU6MjY6NDAuNDc3WiIsInVzZXJHcm91cElkIjoiNEVIeWRUREFpczJMZFFuWm4iLCJleHBpcmVEYXRlIjoiMjAyNS0xMS0wMlQxMzoxNzowOC4zNDFaIiwibm9FeHBpcmUiOnRydWUsImFsbG93QWxsUGVybWlzc2lvbiI6dHJ1ZSwiX2lkIjoiN1pQcnZGWjVkMGVRZHpJNnRmMFY2IiwiX192IjowfSwiaWF0IjoxNzU5NDk3NDM1fQ.jGAzyvf_lrKzLNFFF5tB1_qMUoTlVAG-pVyMDAgvz8k';

export const MEMBERSHIP_ID = 'GcDHsxJy3namJO4aW4cGB';

export const STATUS_ID = '_-tAvxT5bb82XBGGi582W';
export const SINCE_ID = '0IX2hOwXtYhRdLpB5Do-g';
export const BY_ID = '5TZ7KLGo1xVRxIhsKfH4V';
export const AUTOMATION_ID = '68c82ced0bb31c5a338ca0b8';
export const MEMBERSHIP_DATA = [
  {
    image: images.vaultLogo,
    name: 'ANNUAL',
    price: '$1000',
    key: 'ANNUAL',
    duration: 1,
  },
  {
    image: images.vaultLogo,
    name: 'PLATINUM',
    price: '‍$2,000',
    key: 'PLATINUM',
    duration: 4,
  },
  {
    image: images.vaultLogo,
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
