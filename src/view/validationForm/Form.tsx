/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react-native/no-inline-styles */
import { useNavigation } from '@react-navigation/native';
import Button from 'components/Button';
import Input from 'components/Input';
import TextView from 'components/TextView';
import dayjs from 'dayjs';
import useRegister from 'hooks/useRegister';
import { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import DatePicker from 'react-native-date-picker';
import { Dropdown } from 'react-native-element-dropdown';
import Communications from './Communications';

const Form: React.FC<any> = ({
  fieldErrors,
  onSave,
  toggleCheckBox,
  setToggleCheckBox,
}) => {
  const {
    title,
    forename,
    surname,
    nationality,
    dateOfBirth,
    phone,
    email,
    onChange,
    password,
    communication,
  } = useRegister();

  const navigation = useNavigation<any>();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);

  const selectData = [
    { label: 'Male', value: 1 },
    { label: 'Female', value: 2 },
  ];

  const renderItem = (item: any) => {
    return (
      <View style={styles.item}>
        <TextView fontSize={14} color={value === item.value ? '#000' : '#fff'}>
          {item.label}
        </TextView>
      </View>
    );
  };

  return (
    <View style={styles.form}>
      <View style={styles.columnGap}>
        <TextView fontSize={14} color="#DEDEDE" fontFamily="Optician Sans">
          Your Title
        </TextView>
        <Dropdown
          labelField={'label'}
          valueField={'value'}
          containerStyle={{ backgroundColor: '#111111' }}
          value={title}
          activeColor={'#fff'}
          placeholderStyle={styles.dropdownPlace}
          selectedTextStyle={styles.dropdownText}
          style={[
            styles.select,
            { borderColor: fieldErrors?.title ? '#FF4648' : '#DEDEDE' },
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
        {fieldErrors?.title && (
          <TextView fontSize={13} color="#FF4648" fontWeight={'500'}>
            YOUR TITLE must be selected.
          </TextView>
        )}
      </View>
      <Input
        labelColor={'#DEDEDE'}
        labelFontFamily="Optician Sans"
        label="FORENAME"
        value={forename}
        onChangeText={(text: string) => onChange('forename', text)}
        isError={fieldErrors?.forename}
      />
      <Input
        labelColor={'#DEDEDE'}
        labelFontFamily="Optician Sans"
        label="SURNAME"
        value={surname}
        onChangeText={(text: string) => onChange('surname', text)}
        isError={fieldErrors?.surname}
      />
      <Input
        labelColor={'#DEDEDE'}
        labelFontFamily="Optician Sans"
        label="NATIONALITY"
        value={nationality}
        onChangeText={(text: string) => onChange('nationality', text)}
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
            style={[
              styles.input,
              {
                borderColor: fieldErrors?.dateOfBirth ? '#FF4648' : '#DEDEDE',
              },
            ]}
            onPress={() => setOpen(true)}
          >
            <TextView>{dayjs(dateOfBirth).format('MMM DD, YYYY')}</TextView>
          </TouchableOpacity>
        </View>

        <TextView
          fontSize={13}
          color={fieldErrors?.dateOfBirth ? '#FF4648' : '#93939366'}
        >
          Candidates for Membership must be over 21 years of age!
        </TextView>
      </View>
      <Input
        labelColor={'#DEDEDE'}
        labelFontFamily="Optician Sans"
        keyboardType="decimal-pad"
        isPhone={true}
        label="PHONE NUMBER"
        value={phone}
        onChangeText={(text: string) => onChange('phone', text)}
        isError={fieldErrors.phone}
      />
      <Input
        labelColor={'#DEDEDE'}
        labelFontFamily="Optician Sans"
        label="EMAIL"
        value={email}
        onChangeText={(text: string) => onChange('email', text)}
        keyboardType="email-address"
        isError={fieldErrors.email}
      />
      <Input
        labelColor={'#DEDEDE'}
        labelFontFamily="Optician Sans"
        label="Password"
        value={password}
        onChangeText={(text: string) => onChange('password', text)}
        keyboardType="default"
        secureTextEntry
        isError={fieldErrors?.password}
      />
      <Communications
        value={communication}
        onChange={(value: any) => onChange('communication', value)}
        isError={fieldErrors?.communication}
      />
      <View style={styles.rules}>
        <TextView fontFamily="Optician Sans" fontSize={14} color="#DEDEDE">
          Do you Accept
        </TextView>
        <TouchableOpacity onPress={() => navigation.navigate('Rules')}>
          <TextView
            fontFamily="Optician Sans"
            fontSize={14}
            style={{ textDecorationLine: 'underline' }}
            color="#DEDEDE"
          >
            VAULT'S RULES?
          </TextView>
        </TouchableOpacity>
      </View>
      <View style={{ gap: 12 }}>
        <BouncyCheckbox
          size={22}
          fillColor={'#000'}
          text="By continuing, you agree to our Vault Rules"
          innerIconStyle={{
            borderRadius: 8,
            borderColor: fieldErrors?.rules ? '#FF4648' : '#fff',
          }}
          iconStyle={{ borderRadius: 8 }}
          textStyle={{
            textDecorationLine: 'none',
            color: fieldErrors?.rules ? '#FF9797' : '#fff',
            fontSize: 14,
            fontFamily: 'General Sans',
          }}
          isChecked={toggleCheckBox}
          onPress={(isChecked: boolean) => {
            setToggleCheckBox(isChecked);
          }}
        />
        {fieldErrors?.rules && (
          <TextView fontSize={13} color="#FF4648" fontWeight={'500'}>
            You must be accept rules.
          </TextView>
        )}
      </View>
      <Button
        title="CONTINUE TO VERIFICATION"
        titleWeight={'500'}
        titleSize={14}
        onPress={() => onSave()}
      />
      <View style={styles.buttonContainer}>
        <TextView fontSize={14} center>
          Already have an account?
        </TextView>
        <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
          <TextView
            fontSize={14}
            center
            style={{ textDecorationLine: 'underline' }}
          >
            Sign in
          </TextView>
        </TouchableOpacity>
      </View>
      <DatePicker
        modal
        open={open}
        date={dateOfBirth}
        mode="date"
        onConfirm={(datee: any) => {
          setOpen(false);
          onChange('dateOfBirth', datee);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: { paddingVertical: 10, gap: 15 },
  form: {
    gap: 20,
    paddingHorizontal: 15,
  },

  rules: { flexDirection: 'row', gap: 5 },
  select: {
    borderBottomWidth: 1,
    paddingVertical: 12,
  },
  item: {
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  columnGap: { flexDirection: 'column', gap: 12 },
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
  },
});

export default Form;
