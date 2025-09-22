/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import { useMutation, useQuery } from '@apollo/client/react';
import { BY_ID, MEMBERSHIP_ID, SINCE_ID, STATUS_ID } from '@constants';
import FastImage from '@d11/react-native-fast-image';
import BottomSheet from '@gorhom/bottom-sheet';
import { setNavigation } from '@utils';
import GroupCheckbox from 'components/GroupCheckbox';
import Loader from 'components/Loader';
import PaymentItem from 'components/PaymentItem';
import PaymentMethod from 'components/PaymentMethod';
import TextView from 'components/TextView';
import dayjs from 'dayjs';
import paymentQL from 'graph/paymentQL';
import userQL from 'graph/userQL';
import useAlert from 'hooks/useAlert';
import useRegister from 'hooks/useRegister';
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

const Payment: React.FC<any> = ({ navigation, route }) => {
  const type = route.params.type ?? '';
  const {
    membership,
    erxesCustomerId,
    phone,
    email,
    forename,
    surname,
    title,
    dateOfBirth,
  } = useRegister();
  const alert = useAlert();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [cancelInterval, setCancelInterval] = useState(false);
  const [invoice, setInvoice] = useState('');

  const { data: paymentsData, loading: queryLoading } = useQuery<any>(
    paymentQL.payments,
  );

  const [customerEdit] = useMutation(userQL.customerEdit, {
    onCompleted() {
      navigation.navigate('Biometric', { type: 'register' });
    },
    onError(error) {
      console.log(error.message);
      alert.onError(error.message);
    },
  });

  const [paymentTransactionsAddMutation] = useMutation(
    paymentQL.paymentTransactionsAdd,
    {
      onCompleted(data: any) {
        const dataUrls = data?.paymentTransactionsAdd?.response?.urls;
        setUrls(dataUrls);
        setLoading(false);
      },
      onError(error) {
        console.log(error.message);
        alert.onError(error.message);
      },
    },
  );

  const [invoiceCreateMutation] = useMutation(paymentQL.invoiceCreate, {
    onCompleted(data: any) {
      const invoiceId = data?.invoiceCreate?._id;
      setInvoice(invoiceId);
      paymentTransactionsAddMutation({
        variables: {
          paymentId: paymentsData?.payments[0]?._id,
          amount: 100,
          invoiceId,
        },
      });
    },
    onError(err) {
      console.log(err.message);
      alert.onError(err.message);
    },
  });

  const { data, stopPolling } = useQuery<any>(paymentQL.invoiceDetail, {
    variables: { id: invoice },
    fetchPolicy: 'network-only',
    pollInterval: cancelInterval ? 0 : 2000, // check every 1s
    skip: !invoice, // only run if invoice exists
  });

  useLayoutEffect(() => {
    setNavigation({ navigation, title: 'Vault Membership Form' });
  }, [navigation]);

  useEffect(() => {
    if (!data) return;

    const invoiceDetail = data?.invoiceDetail || {};
    const paidAmount = invoiceDetail?.amount;

    console.log(data, 'ddd');
    if (invoiceDetail?.status === 'paid' && paidAmount >= 100) {
      if (type && type === 'register') {
        const today = dayjs();
        const byDate = today.add(membership.duration, 'year');

        customerEdit({
          variables: {
            _id: erxesCustomerId,
            firstName: forename,
            lastName: surname,
            sex: title.value,
            birthDate: dateOfBirth,
            emails: [
              {
                type: 'primary',
                email,
              },
            ],
            phones: [
              {
                phone,
                type: 'primary',
              },
            ],
            customFieldsData: [
              {
                field: MEMBERSHIP_ID,
                value: membership?.key,
              },
              {
                field: STATUS_ID,
                value: 'ACTIVE',
              },
              {
                field: SINCE_ID,
                value: today.format('YYYY-MM-DD'),
              },
              {
                field: BY_ID,
                value: byDate.format('YYYY-MM-DD'),
              },
            ],
          },
        });
      }

      // ✅ stop polling once invoice is paid
      stopPolling();
      setCancelInterval(true);
    }
  }, [data]);

  useEffect(() => {
    if (paymentsData?.payments?.length > 0) {
      setLoading(true);
      invoiceCreateMutation({
        variables: {
          amount: 100,
          customerId: erxesCustomerId,
          customerType: 'core:customer',
          phone,
          email,
        },
      });
    }
  }, [paymentsData]);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    if (index === -1) {
      bottomSheetRef.current?.close();
    }
  }, []);

  if (loading || queryLoading) {
    return <Loader />;
  }

  return (
    <>
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={styles.space}>
            <View style={styles.payment}>
              <TextView fontSize={40} fontFamily="NewYork">
                PAYMENT
              </TextView>
              <View style={styles.member}>
                <TextView
                  fontFamily="Optician Sans"
                  fontSize={14}
                  color="#DEDEDE"
                >
                  Your Selected Membership Plan
                </TextView>
                <View style={styles.rowSpaceBetween}>
                  <View style={{ flex: 1 }}>
                    <GroupCheckbox
                      item={membership}
                      value={membership}
                      label={{
                        label: membership.name,
                        subLabel: `${membership.price}/${
                          membership.duration === 999
                            ? '∞'
                            : membership.duration
                        } years`,
                      }}
                    />
                  </View>
                  <FastImage
                    source={membership.image}
                    style={styles.image}
                    resizeMode="cover"
                  />
                </View>
                <TextView
                  fontSize={14}
                  fontWeight={'500'}
                  color="#444444"
                  style={{ paddingHorizontal: 15 }}
                >
                  For more information on Membership types please{' '}
                  <TouchableOpacity
                    onPress={() => navigation.navigate('MembershipDetail')}
                  >
                    <TextView
                      fontSize={14}
                      fontWeight={'500'}
                      color="#fff"
                      style={{ textDecorationLine: 'underline' }}
                    >
                      click here.
                    </TextView>
                  </TouchableOpacity>
                </TextView>
              </View>
            </View>
            <View style={styles.line} />
            <View style={styles.memberDetail}>
              <Info label="Membership type:" value={membership.name} />
              <Info label="Price:" value={membership.price} />
              <Info
                label="Duration:"
                value={membership.duration === 999 ? '∞' : membership.duration}
              />
              <TextView fontSize={14} fontWeight={'500'} justify>
                Elevate your VAULT experience with the exclusive VAULT Platinum
                VISA Card by TransBank, designed for the elite member who values
                privacy, luxury, and unparalleled access.
              </TextView>
            </View>
            <View style={styles.method}>
              <TextView fontFamily="Optician Sans" fontSize={14}>
                Payment Method
              </TextView>
              <View style={styles.paymentContainer}>
                {urls?.map((item: any, index: number) => (
                  <PaymentItem data={item} key={index} />
                ))}
              </View>
            </View>
          </View>
        </ScrollView>

        <PaymentMethod ref={bottomSheetRef} onChange={handleSheetChanges} />
      </SafeAreaView>
    </>
  );
};

const Info: React.FC<any> = ({ label, value }) => {
  return (
    <View style={styles.rowSpace}>
      <TextView fontFamily="Optician Sans" fontSize={14}>
        {label}
      </TextView>
      <TextView fontSize={14}>{value}</TextView>
    </View>
  );
};

export default Payment;

const styles = StyleSheet.create({
  container: { flex: 1 },
  member: { gap: 16 },
  space: { flex: 1, paddingVertical: 10, gap: 32 },
  payment: { paddingHorizontal: 15, gap: 32 },
  method: {
    paddingHorizontal: 15,
    gap: 16,
  },
  box: {
    padding: 10,
  },
  rowSpaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  image: {
    width: 60,
    height: 60,
  },
  memberDetail: {
    gap: 16,
    paddingHorizontal: 15,
  },
  paymentContainer: {
    flexDirection: 'row',
    gap: 10,
    flexWrap: 'wrap',
  },
  rowSpace: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  line: {
    borderBottomWidth: 1,
    borderColor: '#DEDEDE',
    width: '100%',
  },
});
