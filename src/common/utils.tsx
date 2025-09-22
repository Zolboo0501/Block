import { apiUrl } from '@constants';
import { ArrowLeft, ExcelIcon, FileIcon, PdfIcon, WordIcon } from '@icons';
import TextView from 'components/TextView';
import dayjs from 'dayjs';
import { Dimensions, TouchableOpacity } from 'react-native';
import ReactNativeBiometrics from 'react-native-biometrics';
import axios from 'axios';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

interface SetNavigationProps {
  navigation: any;
  title?: string;
  isDark?: boolean;
  headerLeft?: any;
}

const setNavigation = ({
  navigation,
  title,
  headerLeft,
}: SetNavigationProps) => {
  navigation.setOptions({
    headerTitle: () =>
      title ? (
        <TextView fontWeight={'500'} color="">
          {title}
        </TextView>
      ) : null,
    headerLeft: () =>
      headerLeft ? (
        headerLeft
      ) : (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeft />
        </TouchableOpacity>
      ),
  });
};

const isEmpty = (value: any) => {
  if (typeof value === 'string') {
    return value.length === 0 ? true : false;
  }
  if (typeof value === 'object') {
    return Object.keys(value).length === 0 ? true : false;
  }
};

export const messageDate = (item: any) => {
  const now = dayjs();
  const messageTime = dayjs(item?.createdAt);

  const diffMinutes = now.diff(messageTime, 'minute');
  const diffHours = now.diff(messageTime, 'hour');
  const diffDays = now.diff(messageTime, 'day');

  if (diffDays === 0) {
    if (diffMinutes < 1) return 'Just now';
    if (diffHours === 0) return `${diffMinutes} minutes ago`;
    if (diffHours < 12 && diffHours > 0) return `${diffHours} hours ago`;
    return messageTime.format('HH:mm'); // same day but older than 12h
  }

  if (diffDays === 1) return `Yesterday, ${messageTime.format('HH:mm')}`;
  if (diffDays === 2)
    return `Day before yesterday, ${messageTime.format('HH:mm')}`;

  return messageTime.format('YYYY.MM.DD HH:mm');
};

export const getAttachmentUrl = (value: string, width?: any) => {
  if (value && !value.includes('https')) {
    const encodedKey = encodeURIComponent(value);
    if (width) {
      return apiUrl + '/read-file?key=' + encodedKey + '&width=' + width;
    }
    return apiUrl + '/read-file?key=' + encodedKey;
  }
  return value;
};

export const renderIcon = (att: any) => {
  if (att?.type?.includes('pdf')) {
    return <PdfIcon />;
  }
  if (att?.type?.includes('word')) {
    return <WordIcon />;
  }
  if (att?.type?.includes('excel')) {
    return <ExcelIcon />;
  }
  return <FileIcon />;
};

export const uploadHandler = ({ file, onStart, onError, onEnd }: any) => {
  onStart && onStart(file);
  const formData = new FormData();
  formData.append('file', file);

  const fullUrl = encodeURI(
    `${apiUrl}/upload-file?kind=main&maxHeight=800&maxWidth=800`,
  );

  axios
    .post(fullUrl, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      timeout: 100000,
      withCredentials: true,
    })
    .then(res => {
      if (res.status !== 200) {
        return onError && onError(res.status);
      }

      onEnd && onEnd(res, file);
    })
    .catch(e => {
      if (e?.message?.includes('413')) {
        return onError && onError('File size is too big!');
      }
      if (e?.message?.includes('500')) {
        return onError && onError('Server error!');
      }
      console.log(e);
      onError && onError('uploadHandler: ' + e);
    });
};

export const uploadRemoveFile = ({
  fileName,
  onStart,
  onError,
  onEnd,
}: any) => {
  onStart();
  console.log(fileName, 'hh');
  axios
    .post(
      `${apiUrl}/pl:core/delete-file`,
      `fileName=${encodeURIComponent(fileName)}`,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        },
        timeout: 100000,
        withCredentials: true,
      },
    )
    .then(res => {
      if (res.status !== 200) {
        return onError && onError(res.status);
      }
      onEnd && onEnd(res, fileName);
    })
    .catch(err => {
      console.log(err);
      onError && onError('remove file: ' + err);
    });
};

export const biometrics = new ReactNativeBiometrics({
  allowDeviceCredentials: true,
});

export { WIDTH, HEIGHT, setNavigation, isEmpty };
