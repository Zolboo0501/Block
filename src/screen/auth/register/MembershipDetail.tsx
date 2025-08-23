/* eslint-disable react-native/no-inline-styles */
import FastImage from '@d11/react-native-fast-image';
import images from '@images';
import { setNavigation, WIDTH } from '@utils';
import TextView from 'components/TextView';
import React, { useLayoutEffect } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';

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

const MembershipDetail: React.FC<any> = ({ navigation }) => {
  useLayoutEffect(() => {
    setNavigation({ navigation, title: 'Membership Information' });
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.space}>
          <View style={styles.rowSpaceBetween}>
            <View>
              <TextView fontFamily="NewYork" fontSize={32}>
                PLATINUM
              </TextView>
              <TextView fontFamily="NewYork" fontSize={32}>
                MEMBERSHIP
              </TextView>
            </View>
            <FastImage
              source={images.member}
              style={styles.image}
              resizeMode="cover"
            />
          </View>
          <TextView fontWeight={'500'} fontSize={14} color="#DEDEDE">
            Elevate your VAULT experience with the exclusive VAULT Platinum VISA
            Card by TransBank, designed for the elite member who values privacy,
            luxury, and unparalleled access.
          </TextView>
          <View style={{ gap: 5 }}>
            <TextView
              fontFamily="Optician Sans"
              fontSize={20}
              fontWeight={'500'}
              color="#DEDEDE"
            >
              Price :{' '}
            </TextView>
            <TextView fontSize={14} color="#DEDEDE" fontWeight={'500'}>
              The VAULT Platinum VISA Card is available for $2,000, granting 4
              years of full membership benefits and exclusive privileges. This
              one-time fee unlocks access to luxury perks, priority services,
              and unique experiences designed to elevate every visit to VAULT
              and our partner establishments.
            </TextView>
          </View>
          <View style={{ gap: 5 }}>
            <TextView
              fontFamily="Optician Sans"
              color="#DEDEDE"
              fontSize={20}
              fontWeight={'700'}
            >
              Benefits:
            </TextView>
            {data.map((item: any, index: number) => (
              <BulletList {...item} key={index} />
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const BulletList: React.FC<any> = ({ definition, description }) => {
  return (
    <View style={styles.row}>
      <TextView fontSize={14} fontWeight={'600'} fontFamily="General Sans">
        {`\u2022`}
      </TextView>
      <View style={styles.column}>
        <TextView
          fontWeight={'400'}
          fontFamily="General Sans"
          color="#DEDEDE"
          fontSize={14}
          justify
        >
          <TextView
            fontWeight={'600'}
            fontFamily="General Sans"
            color="#DEDEDE"
            fontSize={14}
          >
            {definition}{' '}
          </TextView>
          {description}
        </TextView>
      </View>
    </View>
  );
};

export default MembershipDetail;

const styles = StyleSheet.create({
  container: { flex: 1 },
  space: { paddingHorizontal: 15, paddingVertical: 10, gap: 24 },
  rowSpaceBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    marginBottom: 32,
  },
  image: {
    width: 100,
    height: 100,
  },
  row: { flexDirection: 'row', gap: 8, flex: 1 },
  column: { flexDirection: 'column', width: WIDTH - 50 },
});
