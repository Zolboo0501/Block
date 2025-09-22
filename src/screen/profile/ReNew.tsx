/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import { useMutation, useQuery } from '@apollo/client/react';
import {
  BY_ID,
  MEMBERSHIP_DATA,
  MEMBERSHIP_ID,
  SINCE_ID,
  STATUS_ID,
} from '@constants';
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
import useAuth from 'hooks/useAuth';
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import {
  Alert,
  Linking,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

const ReNew: React.FC<any> = ({ navigation }) => {
  const [membership, setMembership] = useState<any>();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const alert = useAlert();
  const { loggedUser } = useAuth();
  const [cancelInterval, setCancelInterval] = useState(false);
  const [loading, setLoading] = useState(false);
  const [invoice, setInvoice] = useState('');
  const [urls, setUrls] = useState([]);

  const { data: paymentsData, loading: queryLoading } = useQuery<any>(
    paymentQL.payments,
  );

  const { data, stopPolling } = useQuery<any>(paymentQL.invoiceDetail, {
    variables: { id: invoice },
    fetchPolicy: 'network-only',
    pollInterval: cancelInterval ? 0 : 2000, // check every 2 seconds
    skip: !membership?.key,
  });

  const [customerEdit] = useMutation(userQL.customerEdit, {
    async onCompleted() {
      setCancelInterval(true);
      alert.onSuccess('Your membership has been renewed successfully.');
      navigation.goBack();
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
      console.log(invoiceId, 'hh');
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

  useLayoutEffect(() => {
    setNavigation({ navigation, title: 'Vault Membership Form' });
  }, [navigation]);

  useEffect(() => {
    if (paymentsData?.payments?.length > 0) {
      setLoading(true);
      invoiceCreateMutation({
        variables: {
          amount: 100,
          customerId: loggedUser?.erxesCustomerId,
          customerType: 'core:customer',
        },
      });
    }
  }, [loggedUser, paymentsData]);

  const handleSheetChanges = useCallback((index: number) => {
    if (index === -1) {
      bottomSheetRef.current?.close();
    }
  }, []);

  useEffect(() => {
    if (!data) return;

    const invoiceDetail = data?.invoiceDetail || {};
    const paidAmount = invoiceDetail?.amount;

    if (invoiceDetail?.status === 'paid' && paidAmount >= 100) {
      // ✅ stop polling once payment confirmed
      stopPolling();

      const byDate = loggedUser?.customer?.customFieldsData?.find(
        (item: any) => item?.field === BY_ID,
      )?.value;

      const sinceDate = loggedUser?.customer?.customFieldsData?.find(
        (item: any) => item?.field === SINCE_ID,
      )?.value;

      let variable: any = {
        _id: loggedUser?.erxesCustomerId,
        firstName: loggedUser?.firstName,
        lastName: loggedUser?.lastName,
        sex: loggedUser?.customer?.sex,
        birthDate: loggedUser?.customer?.birthDate,
        emails: loggedUser?.customer?.emails,
        phones: loggedUser?.customer?.phones,
      };

      if (dayjs(byDate).isValid() && dayjs(byDate).isAfter(dayjs())) {
        const newByDate = dayjs(byDate).add(membership?.duration, 'year');

        variable.customFieldsData = [
          { field: MEMBERSHIP_ID, value: membership?.key },
          { field: STATUS_ID, value: 'ACTIVE' },
          { field: SINCE_ID, value: sinceDate },
          { field: BY_ID, value: newByDate.format('YYYY-MM-DD') },
        ];
      } else {
        const today = dayjs();
        const newByDate = today.add(membership?.duration, 'year');

        variable.customFieldsData = [
          { field: MEMBERSHIP_ID, value: membership?.key },
          { field: STATUS_ID, value: 'ACTIVE' },
          { field: SINCE_ID, value: today.format('YYYY-MM-DD') },
          { field: BY_ID, value: newByDate.format('YYYY-MM-DD') },
        ];
      }

      customerEdit({ variables: variable });
    }
  }, [data]);

  if (queryLoading || loading) {
    return <Loader />;
  }

  const onPayment = (item: any) => {
    if (!membership?.key) {
      return alert.onError('Please select a membership option');
    }
    Linking.openURL(item?.link).catch(() =>
      Alert.alert('Сонгогдсон апп сугаагүй эсвэл алдаа гарсан байна.'),
    );
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={[styles.space, { marginTop: 15 }]}>
            <View style={{ paddingHorizontal: 15 }}>
              <TextView fontFamily="NewYork" fontSize={32}>
                RENEW
              </TextView>
              <TextView fontFamily="NewYork" fontSize={32}>
                MEMBERSHIP
              </TextView>
            </View>
            <View style={styles.column}>
              <TextView
                fontSize={14}
                color="#DEDEDE"
                fontFamily="Optician Sans"
              >
                Your Selected Membership Plan
              </TextView>
              {MEMBERSHIP_DATA.map((item: any, index: number) => (
                <TouchableOpacity
                  style={[styles.rowSpaceBetween, { paddingHorizontal: 10 }]}
                  key={index}
                  onPress={() => {
                    setMembership(item);
                  }}
                >
                  <View style={{ flex: 1 }}>
                    <GroupCheckbox
                      item={item}
                      value={membership}
                      label={{
                        label: item.name,
                        subLabel: `${item.price}/${
                          item.duration === 999 ? '∞' : item.duration
                        } years`,
                      }}
                    />
                  </View>
                  <FastImage
                    source={item.image}
                    style={styles.image}
                    resizeMode="cover"
                  />
                </TouchableOpacity>
              ))}
              <TextView fontSize={14} fontWeight={'500'} color="#444444">
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
            <View style={styles.line} />
            <View style={styles.column}>
              <View style={styles.rowSpaceBetween}>
                <TextView fontSize={14} fontFamily="Optician Sans">
                  Membership type:
                </TextView>
                <TextView fontSize={14}>{membership?.name}</TextView>
              </View>
              <View style={styles.rowSpaceBetween}>
                <TextView fontSize={14} fontFamily="Optician Sans">
                  Price:
                </TextView>
                <TextView fontSize={14}>{membership?.price}</TextView>
              </View>
              <View style={styles.rowSpaceBetween}>
                <TextView fontSize={14} fontFamily="Optician Sans">
                  Duration:
                </TextView>
                <TextView fontSize={14}>
                  {membership?.duration === 999
                    ? '∞ years'
                    : membership?.duration
                    ? `${membership.duration} years`
                    : ''}
                </TextView>
              </View>
              <TextView fontWeight={'500'} fontFamily="14">
                Our lifetime membership is designed to enhance your experience
                at our bar and to provide you with exclusive benefits and
                privileges that are not available to the general public.
              </TextView>
              <View style={styles.method}>
                <TextView fontFamily="Optician Sans" fontSize={14}>
                  Payment Method
                </TextView>

                <View style={styles.paymentContainer}>
                  {urls?.map((item: any, index: number) => (
                    <PaymentItem data={item} key={index} onPress={onPayment} />
                  ))}
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
      <PaymentMethod ref={bottomSheetRef} onChange={handleSheetChanges} />
    </>
  );
};

export default ReNew;

const styles = StyleSheet.create({
  container: { flex: 1 },
  space: { flex: 1, gap: 32 },
  column: { gap: 16, paddingHorizontal: 15 },
  image: {
    width: 60,
    height: 60,
  },
  method: {
    gap: 16,
  },
  line: {
    borderBottomWidth: 1,
    borderColor: '#DEDEDE',
  },
  rowSpace: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rowSpaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',

    alignItems: 'center',
  },
  paymentContainer: {
    flexDirection: 'row',
    gap: 10,
    flexWrap: 'wrap',
  },
  box: {
    padding: 10,
  },
});
