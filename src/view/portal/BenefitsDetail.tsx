import { WIDTH } from '@utils';
import Button from 'components/Button';
import TextView from 'components/TextView';
import React from 'react';
import { StyleSheet, View } from 'react-native';

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

const BenefitsDetail: React.FC<any> = () => {
  return (
    <View style={styles.columnGap}>
      <TextView color="#DEDEDE" fontSize={20} fontWeight={'700'}>
        Benefits:
      </TextView>
      {data.map((item: any, index: number) => (
        <BulletList {...item} key={index} />
      ))}
      <View style={{ marginTop: 15 }}>
        <Button title="APPLY NOW " titleWeight={'500'} onPress={() => {}} />
      </View>
    </View>
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
export default BenefitsDetail;

const styles = StyleSheet.create({
  columnGap: { flexDirection: 'column', gap: 5 },
  row: { flexDirection: 'row', gap: 8, flex: 1 },
  column: { flexDirection: 'column', width: WIDTH - 50 },
});
