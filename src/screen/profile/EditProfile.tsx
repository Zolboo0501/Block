/* eslint-disable react-native/no-inline-styles */
import { useMutation } from '@apollo/client/react';
import { emailRegex, selectData } from '@constants';
import { isEmpty, setNavigation } from '@utils';
import Button from 'components/Button';
import Input from 'components/Input';
import KeyboardContainer from 'components/KeyboardContainer';
import TextView from 'components/TextView';
import dayjs from 'dayjs';
import userQL from 'graph/userQL';
import useAlert from 'hooks/useAlert';
import useAuth from 'hooks/useAuth';
import React, { useLayoutEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, TouchableOpacity, View } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { Dropdown } from 'react-native-element-dropdown';
import Communications from 'view/validationForm/Communications';

const EditProfile: React.FC<any> = ({ navigation }) => {
  const { loggedUser } = useAuth();

  const alert = useAlert();
  const [value, setValue] = useState(null);
  const [profile, setProfile] = useState({
    title: loggedUser?.customer?.sex === 1 ? selectData[0] : selectData[1],
    forename: loggedUser?.firstName,
    surname: loggedUser?.lastName,
    nationality: '',
    dateOfBirth: new Date(loggedUser?.customer?.birthDate),
    email: loggedUser?.customer?.primaryEmail,
    communication: '',
  });
  const [open, setOpen] = useState(false);

  const [fieldErrors, setFieldErrors] = useState({
    title: {
      isEmpty: false,
      label: 'YOUR TITLE',
    },
    forename: {
      isEmpty: false,
      label: 'FORENAME',
    },
    surname: {
      isEmpty: false,
      label: 'SURNAME',
    },
    email: {
      isEmpty: false,
      label: 'EMAIL',
    },
    dateOfBirth: {
      isEmpty: false,
      label: 'DATE OF BIRTH',
    },
    communication: {
      isEmpty: false,
      label: 'COMMUNICATIONS',
    },
  });

  const [customerEdit] = useMutation(userQL.customerEdit, {
    onCompleted() {
      alert.onSuccess('Your information has been successfully updated');
      navigation.goBack();
    },
    onError(error) {
      console.log(error.message);
      alert.onError(error.message);
    },
  });

  const validationForm = () => {
    const fieldsToCheck = {
      title: profile.title,
      forename: profile.forename,
      surname: profile.surname,
      email: profile.email,
      dateOfBirth: profile.dateOfBirth,
      communication: profile.communication,
    };

    let isError = false;
    let newErrors: {
      [key: string]: {
        isEmpty: boolean;
        label: string;
      };
    } = { ...fieldErrors };

    Object.entries(fieldsToCheck).forEach(([key, value]) => {
      if (key === 'dateOfBirth') {
        const today = new Date();
        const diff = dayjs(today).diff(dayjs(value), 'years');
        if (diff < 21) {
          isError = true;
          return (newErrors[key].isEmpty = true);
        }
        return (newErrors[key].isEmpty = false);
      }

      if (key === 'email') {
        if (!emailRegex.test(value)) {
          isError = true;
          return (newErrors[key].isEmpty = true);
        }
        return (newErrors[key].isEmpty = false);
      }
      if (isEmpty(value)) {
        isError = true;
        return (newErrors[key].isEmpty = true);
      }
      return (newErrors[key].isEmpty = false);
    });

    const emptyLabels = Object.values(newErrors)
      .filter((item: any) => item?.isEmpty)
      .map((item: any) => item?.label);

    if (emptyLabels.length > 0) {
      alert.onError(
        `${emptyLabels.join(', ')} certain fields are incomplete or invalid.`,
      );
    }

    setFieldErrors({ ...fieldErrors, ...newErrors });

    return !isError;
  };

  useLayoutEffect(() => {
    setNavigation({ navigation, title: 'Profile Edit' });
  }, [navigation]);

  const onChange = (
    text: string,
    type:
      | 'title'
      | 'forename'
      | 'surname'
      | 'nationality'
      | 'dateOfBirth'
      | 'email'
      | 'communication',
  ) => {
    setProfile(prev => ({ ...prev, [type]: text }));
  };

  const renderItem = (item: any) => {
    return (
      <View style={styles.item}>
        <TextView fontSize={14} color={value === item.value ? '#000' : '#fff'}>
          {item.label}
        </TextView>
      </View>
    );
  };

  const onSave = () => {
    if (validationForm()) {
      console.log('valid');
      customerEdit({
        variables: {
          _id: loggedUser?.erxesCustomerId,
          firstName: profile.forename,
          lastName: profile.surname,
          sex: profile.title.value,
          birthDate: profile.dateOfBirth,
          emails: [
            {
              type: 'primary',
              email: profile.email,
            },
          ],
          phones: [
            {
              phone: loggedUser?.customer?.primaryPhone,
              type: 'primary',
            },
          ],
          customFieldsData: loggedUser?.customer?.customFieldsData,
        },
      });
      // register({
      //   variables: {
      //     username: phone,
      //     clientPortalId: ClIENTPORTAL_ID,
      //     phone,
      //     email,
      //     firstName: forename,
      //     lastName: surname,
      //     password: password,
      //   },
      // });
    }
  };
  return (
    <>
      <SafeAreaView style={styles.container}>
        <KeyboardContainer>
          <View style={styles.space}>
            <View style={styles.columnGap}>
              <TextView
                fontSize={14}
                color="#DEDEDE"
                fontFamily="Optician Sans"
              >
                Your Title
              </TextView>
              <Dropdown
                labelField={'label'}
                valueField={'value'}
                containerStyle={{ backgroundColor: '#111111' }}
                value={profile.title}
                activeColor={'#fff'}
                placeholderStyle={styles.dropdownPlace}
                selectedTextStyle={styles.dropdownText}
                style={[
                  styles.select,
                  {
                    borderColor: fieldErrors?.title?.isEmpty
                      ? '#FF4648'
                      : '#DEDEDE',
                  },
                ]}
                data={selectData}
                onChange={(item: any) => {
                  setValue(item.value);
                  onChange('title', item);
                }}
                placeholder="Mr/Ms"
                iconStyle={{ tintColor: 'white' }}
                renderItem={renderItem}
              />
              {fieldErrors?.title?.isEmpty && (
                <TextView fontSize={13} color="#FF4648" fontWeight={'500'}>
                  YOUR TITLE must be selected.
                </TextView>
              )}
            </View>
            <Input
              labelColor={'#DEDEDE'}
              labelFontFamily="Optician Sans"
              label="FORENAME"
              value={profile.forename}
              onChangeText={(text: string) => onChange(text, 'forename')}
            />
            <Input
              labelColor={'#DEDEDE'}
              labelFontFamily="Optician Sans"
              label="SURNAME"
              value={profile.surname}
              onChangeText={(text: string) => onChange(text, 'surname')}
            />
            <Input
              labelColor={'#DEDEDE'}
              labelFontFamily="Optician Sans"
              label="NATIONALITY"
              value={profile.nationality}
              onChangeText={(text: string) => onChange(text, 'nationality')}
            />
            <View>
              <View style={{ gap: 15 }}>
                <TextView
                  fontSize={14}
                  color={'#DEDEDE'}
                  fontFamily={'Optician Sans'}
                >
                  Date of Birth
                </TextView>
                <TouchableOpacity
                  style={styles.input}
                  onPress={() => setOpen(true)}
                >
                  <TextView>
                    {dayjs(profile.dateOfBirth).format('MMM DD, YYYY')}
                  </TextView>
                </TouchableOpacity>
              </View>

              <TextView fontSize={13} color="#93939366">
                Candidates for Membership must be over 21 years of age!
              </TextView>
            </View>
            <Input
              labelColor={'#DEDEDE'}
              labelFontFamily="Optician Sans"
              label="EMAIL"
              value={profile.email}
              onChangeText={(text: string) => onChange(text, 'email')}
              keyboardType="email-address"
            />
            <Communications
              value={profile.communication}
              onChange={(value: any) => onChange(value, 'communication')}
            />
            <Button title="SAVE" titleWeight={'500'} onPress={() => onSave()} />
          </View>
        </KeyboardContainer>
      </SafeAreaView>
      <DatePicker
        modal
        open={open}
        date={profile.dateOfBirth}
        mode="date"
        onConfirm={(datee: any) => {
          setOpen(false);
          onChange(datee, 'dateOfBirth');
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  container: { flex: 1 },
  columnGap: { flexDirection: 'column', gap: 12 },
  space: {
    flex: 1,
    paddingHorizontal: 15,
    gap: 24,
    paddingVertical: 20,
  },
  select: {
    borderBottomWidth: 1,
    paddingVertical: 12,
  },
  dropdownPlace: {
    color: '#93939366',
    fontSize: 16,
    fontFamily: 'General Sans',
    fontWeight: '400',
  },
  dropdownText: {
    fontSize: 16,
    fontFamily: 'General Sans',
    fontWeight: '400',
    color: '#fff',
  },
  input: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: '#DEDEDE',
  },
  item: {
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
