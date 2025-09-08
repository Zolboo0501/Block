import { ArrowLeft } from '@icons';
import TextView from 'components/TextView';
import { Dimensions, TouchableOpacity } from 'react-native';

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

export { WIDTH, HEIGHT, setNavigation, isEmpty };
