/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import { useLazyQuery, useMutation, useQuery } from '@apollo/client/react';
import { MEMBERSHIP_DATA } from '@constants';
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
import useInterval from 'use-interval';

const MEMBERSHIP_ID = 'sB4QZwYtvF3vvzErPSc7y';
const STATUS_ID = 'ZneG0ueA_cyXkTpGMoxSx';
const SINCE_ID = 'qYPIouGEzKDbdmuGq0Lxo';
const BY_ID = '2KFu_MYJtA4recxaJbpiV';

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

  const [getInvoiceDetail] = useLazyQuery(paymentQL.invoiceDetail, {
    fetchPolicy: 'network-only',
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

  useInterval(
    () => {
      invoice &&
        membership?.key &&
        getInvoiceDetail({
          variables: {
            id: invoice,
          },
        })
          .then(({ data }: { data: any }) => {
            const invoice = (data || {})?.invoiceDetail || {};

            const paidAmount = invoice?.amount;
            if (invoice?.status === 'paid' && paidAmount >= 100) {
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
                // still active → extend from current byDate
                const newByDate = dayjs(byDate).add(
                  membership?.duration,
                  'year',
                );

                variable.customFieldsData = [
                  { field: MEMBERSHIP_ID, value: membership?.key },
                  { field: STATUS_ID, value: 'ACTIVE' },
                  { field: SINCE_ID, value: sinceDate }, // keep old since date
                  { field: BY_ID, value: newByDate.format('YYYY-MM-DD') },
                ];
              } else {
                // expired or invalid → start new cycle from today
                const today = dayjs();
                const newByDate = today.add(membership?.duration, 'year');

                variable.customFieldsData = [
                  { field: MEMBERSHIP_ID, value: membership?.key },
                  { field: STATUS_ID, value: 'ACTIVE' },
                  { field: SINCE_ID, value: today.format('YYYY-MM-DD') }, // reset since
                  { field: BY_ID, value: newByDate.format('YYYY-MM-DD') },
                ];
              }
              customerEdit({ variables: variable });
            }
          })
          .catch(error => {
            console.log('getInvoices error', error.message);
            console.log(error.message);
            console.log(JSON.stringify(error, null, 2));
            alert.onError(error.message);
          });
    },
    cancelInterval ? null : 1000,
  );

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
                  {membership?.duration === 999 ? '∞' : membership?.duration}{' '}
                  years
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
