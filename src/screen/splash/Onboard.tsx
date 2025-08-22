/* eslint-disable react-native/no-inline-styles */
import FastImage from '@d11/react-native-fast-image';

import images from '@images';
import { WIDTH } from '@utils';
import Button from 'components/Button';
import TextView from 'components/TextView';
import React, { useRef } from 'react';
import {
  Animated,
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';

const screens: any = [
  {
    image: images.splash,
    title: 'Lorem ipsum',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi non fermentum libero. Morbi tellus erat, consequat at justo nec, laoreet rutrum eros. Cras tortor eros, finibus ut luctus non, placerat a tellus. Proin vitae finibus elit. Phasellus posuere elit dictum augue pharetra, vel rhoncus enim congue. Praesent consectetur tortor turpis, ac pellentesque ligula dignissim in.',
  },
  {
    image: images.splash2,
    title: 'Lorem ipsum',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi non fermentum libero. Morbi tellus erat, consequat at justo nec, laoreet rutrum eros. Cras tortor eros, finibus ut luctus non, placerat a tellus. Proin vitae finibus elit. Phasellus posuere elit dictum augue pharetra, vel rhoncus enim congue. Praesent consectetur tortor turpis, ac pellentesque ligula dignissim in.',
  },
  {
    image: images.splash3,
    title: 'Lorem ipsum',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi non fermentum libero. Morbi tellus erat, consequat at justo nec, laoreet rutrum eros. Cras tortor eros, finibus ut luctus non, placerat a tellus. Proin vitae finibus elit. Phasellus posuere elit dictum augue pharetra, vel rhoncus enim congue. Praesent consectetur tortor turpis, ac pellentesque ligula dignissim in.',
  },
];

const Onboard: React.FC<any> = ({ navigation }) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef<FlatList>(null);
  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const viewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: any }) => {
      setCurrentIndex(viewableItems[0].index);
    },
  ).current;

  const onPressRight = () => {
    const isLastSlide = currentIndex === screens.length - 1;

    if (isLastSlide) {
      return navigation.navigate('Login');
    } else {
      slidesRef?.current?.scrollToIndex({ index: currentIndex + 1 });
    }
  };

  const renderScreen = (index: number) => {
    switch (index) {
      case 0:
        return <Screen />;
      case 1:
        return <Screen2 />;
      case 2:
        return <Screen3 />;
    }
  };

  const renderItem = ({ item, index }: { item: any; index: number }) => {
    const isLast = currentIndex === screens.length - 1;
    return (
      <View style={styles.topSection}>
        <View style={styles.center}>
          <View style={styles.imageContainer}>
            <FastImage
              source={item.image}
              resizeMode="contain"
              style={styles.image}
            />
          </View>
        </View>
        <View style={styles.bottom}>
          <View style={styles.dotsContainer}>
            {screens.map((_: any, index: number) => (
              <View
                style={[
                  styles.dot,
                  {
                    backgroundColor:
                      currentIndex === index ? '#A5A5A5' : '#272727',
                  },
                ]}
                key={index}
              />
            ))}
          </View>
          {renderScreen(index)}
          <View style={styles.buttonContainer}>
            <Button
              title="CONTINUE"
              titleWeight={'500'}
              titleSize={14}
              onPress={() => onPressRight()}
            />

            <Button
              disabled={!isLast ? false : true}
              title={!isLast ? 'Skip' : ''}
              titleWeight={'500'}
              titleSize={14}
              border={!isLast ? true : false}
              color="#111111"
              onPress={() => {}}
            />
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.container, { paddingVertical: 10 }]}>
        <FlatList
          data={screens}
          renderItem={renderItem}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          bounces={false}
          viewabilityConfig={viewConfig}
          scrollEventThrottle={32}
          ref={slidesRef}
          onViewableItemsChanged={viewableItemsChanged}
          contentContainerStyle={{ flexGrow: 1 }}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {
                    x: scrollX,
                  },
                },
              },
            ],
            { useNativeDriver: false },
          )}
        />
      </View>
    </SafeAreaView>
  );
};

const Screen: React.FC<any> = () => {
  const data = [
    {
      image: images.member,
      name: 'PLATINUM',
      price: '‍4 years/$2,000',
      key: 'PLATINUM',
    },
    {
      image: images.member2,
      name: 'LIFETIME',
      price: '‍∞ / $5,000',
      key: 'LIFETIME',
    },
    {
      image: images.member3,
      name: 'ANNUAL',
      price: '‍1 year/ $1,000',
      key: 'ANNUAL',
    },
  ];

  return (
    <View style={styles.column}>
      <TextView
        fontWeight={'600'}
        fontSize={20}
        fontFamily="General Sans"
        center
      >
        Vault Memberships
      </TextView>
      <View style={styles.typeContainer}>
        {data.map((item: any, index: number) => (
          <View style={styles.columnGap} key={index}>
            <FastImage source={item.image} style={styles.imageType} />
            <TextView
              fontFamily="General Sans"
              fontWeight={'500'}
              fontSize={14}
            >
              {item.name}
            </TextView>
            <TextView
              fontFamily="General Sans"
              fontWeight={'500'}
              fontSize={14}
              color="#FFFFFF66"
            >
              {item.price}
            </TextView>
          </View>
        ))}
      </View>
      <TextView
        center
        fontFamily="General Sans"
        fontWeight={'500'}
        fontSize={14}
        color="#FFFFFF66"
      >
        Your membership, your advantages.
      </TextView>
    </View>
  );
};

const Screen3: React.FC<any> = () => {
  return (
    <View style={styles.column}>
      <TextView
        fontWeight={'600'}
        fontSize={20}
        fontFamily="General Sans"
        center
      >
        Customer Support
      </TextView>
      <View style={[styles.column, { width: WIDTH - 30 }]}>
        <TextView
          center
          fontWeight={'500'}
          color="#FFFFFF66"
          fontFamily="General Sans"
          fontSize={14}
        >
          Our customer chat is available 24/7, so you can connect with our
          support team anytime, anywhere.{' '}
        </TextView>
        <TextView
          center
          fontWeight={'500'}
          color="#FFFFFF66"
          fontFamily="General Sans"
          fontSize={14}
        >
          Whether you have a quick question or need detailed assistance, we’re
          always here to help — day or night.
        </TextView>
      </View>
    </View>
  );
};

const Screen2: React.FC<any> = () => {
  const data = [
    {
      definition: 'Visa Card:',
      description: `VAULT VISA card by TransBank, designed for the elite member who values privacy, luxury, and unparalleled access.`,
    },
    {
      definition: 'Cashback:',
      description: `Enjoy a 10% cashback at VAULT Shangri-La and our select partner establishments, letting you earn while indulging in the best of what we offer.`,
    },
    {
      definition: 'Complimentary entry:',
      description: `You and up to 3 of your guests will  receive 4 year complimentary entry to our bar, without any queues or waiting times.`,
    },
    {
      definition: 'Reservations:',
      description: `You will have access to book reservations at our bar, even during peak hours and special events.`,
    },
    {
      definition: 'Discounts on private events:',
      description: `If you are planning a private event, you will receive exclusive discounts on our event space rental and catering services.`,
    },
    {
      definition: 'Exclusive access to special events:',
      description: `Be the first to know about our special events, and enjoy exclusive access to these events, including tastings, classes, and more.`,
    },
    {
      definition: 'Personalized service:',
      description: `Our staff will provide you with personalized service, ensuring that your experience at VAULT is always exceptional.`,
    },
  ];

  return (
    <View style={styles.column}>
      <TextView
        fontWeight={'600'}
        fontSize={20}
        fontFamily="General Sans"
        center
      >
        Benefits
      </TextView>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.benefits}>
          {data.map((item: any, index: number) => (
            <View style={styles.row} key={index}>
              <TextView
                fontSize={14}
                fontWeight={'600'}
                fontFamily="General Sans"
                color="#FFFFFF95"
              >
                {`\u2022`}
              </TextView>
              <View style={styles.bullet}>
                <TextView
                  fontWeight={'400'}
                  fontFamily="General Sans"
                  color="#FFFFFF66"
                  fontSize={14}
                  justify
                >
                  <TextView
                    fontWeight={'600'}
                    fontFamily="General Sans"
                    color="#FFFFFF95"
                    fontSize={14}
                  >
                    {item.definition}{' '}
                  </TextView>
                  {item.description}
                </TextView>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  topSection: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  row: { flexDirection: 'row', gap: 8, flex: 1 },
  imageContainer: {
    flex: 1,
    width: WIDTH,
    justifyContent: 'center',
    alignItems: 'center',
  },
  typeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: WIDTH - 30,
  },
  bullet: {
    flexDirection: 'column',
    width: WIDTH - 50,
  },
  column: {
    flex: 1,
    flexDirection: 'column',
    gap: 20,
    marginTop: 20,
    marginBottom: 15,
  },
  benefits: { width: WIDTH - 30, flexDirection: 'column', gap: 5 },
  buttonContainer: {
    flexDirection: 'column',
    gap: 20,
    justifyContent: 'flex-end',
  },
  columnGap: {
    flexDirection: 'column',
    gap: 6,
    alignItems: 'center',
  },
  dot: {
    width: 10,
    height: 10,

    borderRadius: 10,
  },
  bottom: {
    flex: 3,
  },
  dotsContainer: {
    flexDirection: 'row',
    gap: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },

  imageType: {
    width: 61,
    height: 61,
  },
  center: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '60%',
    height: 150,
  },
});
export default Onboard;
