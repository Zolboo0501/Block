/* eslint-disable react-native/no-inline-styles */
import FastImage from '@d11/react-native-fast-image';
import { Plus } from '@icons';
import images from '@images';
import MaskedView from '@react-native-masked-view/masked-view';
import { setNavigation } from '@utils';
import TextView from 'components/TextView';
import React, { useLayoutEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, { FadeInRight } from 'react-native-reanimated';

const Rules: React.FC<any> = ({ navigation }) => {
  const [more, setMore] = useState(false);

  useLayoutEffect(() => {
    setNavigation({ navigation, title: 'Vault Rules' });
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.space}>
          <View style={styles.rowSpaceBetween}>
            <View>
              <TextView fontFamily="NewYork" fontSize={40}>
                RULES IN
              </TextView>
              <TextView fontFamily="NewYork" fontSize={40}>
                SHORT
              </TextView>
            </View>
            <FastImage
              source={images.vaultLogo}
              style={styles.image}
              resizeMode="cover"
            />
          </View>
          <View style={styles.textBox}>
            <MaskedView
              maskElement={
                <LinearGradient
                  colors={['#000', '#000', '#0000']}
                  locations={more ? [1, 1, 1] : [0, 0.01, 1]}
                  style={{ flex: 1 }}
                />
              }
            >
              <TextView
                center
                fontWeight={'500'}
                numberOfLines={more ? undefined : 5}
                fontSize={14}
              >
                Respect Vault as if it were your home. No fights, brawls, or any
                other indecent activities are allowed on the premises, this will
                result in immediate termination of Membership. Vault is both a
                place of relaxation and business, so please always be
                considerate of Members indulging in either pursuit. A privacy
                sticker will be applied on all phones during the entire stay at
                VAULT. Members are welcome to bring three guests to Vault
                without a reservation.
              </TextView>
            </MaskedView>
            <TouchableOpacity
              style={styles.more}
              onPress={() => setMore(prev => !prev)}
            >
              <TextView
                center
                fontFamily="Optician Sans"
                fontSize={14}
                color="#DEDEDE"
              >
                {more ? 'Read less' : 'Read more'}
              </TextView>
            </TouchableOpacity>
          </View>

          <CollapseView />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Rules;

const CollapseView: React.FC<any> = () => {
  const data = [
    {
      label: 'OBJECTS AND ADMINISTRATION',
      desc: 'Here is test',
    },
    {
      label: 'MEMBERSHIP',
      desc: 'Here is test',
    },
    {
      label: 'TERMINATION OF MEMBERSHIP',
      desc: 'Here is test',
    },
    {
      label: 'CLUB PREMISES, ADMISSION, CONDUCT AND BEHAVIOR',
      desc: 'Here is test',
    },
    {
      label: 'AMENDMENT AND INTERPRETATION OF THE RULES',
      desc: 'Here is test',
    },
  ];

  return data.map((item, index) => (
    <Collapse key={index} item={item} index={index} />
  ));
};

const Collapse: React.FC<any> = ({ item }) => {
  const [toggle, setToggle] = useState(false);

  const onPress = () => {
    setToggle(prev => !prev);
  };

  return (
    <TouchableOpacity style={styles.collapse} onPress={() => onPress()}>
      <View style={{ gap: 10 }}>
        <View style={styles.row}>
          <View style={{ flex: 1, maxWidth: '90%' }}>
            <TextView fontSize={14} fontWeight={'500'}>
              {item.label}
            </TextView>
          </View>
          <Plus />
        </View>
        {toggle && (
          <Animated.View entering={FadeInRight}>
            <TextView fontSize={14} color="#DEDEDE">
              {item.desc}
            </TextView>
          </Animated.View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  space: { flex: 1, paddingVertical: 10 },
  rowSpaceBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    marginBottom: 32,
  },
  row: {
    flexDirection: 'row',
  },
  collapse: {
    paddingHorizontal: 25,
    paddingVertical: 20,
    borderTopWidth: 1,
    borderColor: '#DEDEDE',
  },
  absolute: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
  },
  image: {
    width: 100,
    height: 100,
  },
  more: {
    alignSelf: 'center',
    gap: 10,
    marginTop: 15,
    borderBottomWidth: 1,
    borderColor: '#DEDEDE',
    paddingBottom: 10,
  },
  textBox: { position: 'relative', paddingHorizontal: 15, marginBottom: 32 },
});
