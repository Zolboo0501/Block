/* eslint-disable react-native/no-inline-styles */
import Button from 'components/Button';
import Input from 'components/Input';
import TextView from 'components/TextView';
import dayjs from 'dayjs';
import useRegister from 'hooks/useRegister';
import { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import DatePicker from 'react-native-date-picker';
import Communications from './Communications';

const Form: React.FC<any> = ({ onSave }) => {
  const {
    title,
    forename,
    surname,
    nationality,
    dateOfBirth,
    phone,
    email,
    onChange,
  } = useRegister();

  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [open, setOpen] = useState(false);

  return (
    <View style={styles.form}>
      <Input
        labelColor={'#DEDEDE'}
        labelFontFamily="Optician Sans"
        label="YOUR TITLE"
        value={title}
        placeholder="Mr/Ms"
        onChangeText={(text: string) => onChange('title', text)}
      />
      <Input
        labelColor={'#DEDEDE'}
        labelFontFamily="Optician Sans"
        label="FORENAME"
        value={forename}
        onChangeText={(text: string) => onChange('forename', text)}
      />
      <Input
        labelColor={'#DEDEDE'}
        labelFontFamily="Optician Sans"
        label="SURNAME"
        value={surname}
        onChangeText={(text: string) => onChange('surname', text)}
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
          <TouchableOpacity style={styles.input} onPress={() => setOpen(true)}>
            <TextView>{dayjs(dateOfBirth).format('MMM DD, YYYY')}</TextView>
          </TouchableOpacity>
        </View>

        <TextView fontSize={13} color="#93939366">
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
      />
      <Input
        labelColor={'#DEDEDE'}
        labelFontFamily="Optician Sans"
        label="EMAIL"
        value={email}
        onChangeText={(text: string) => onChange('email', text)}
        keyboardType="email-address"
      />
      <Communications />
      <View style={styles.rules}>
        <TextView fontFamily="Optician Sans" fontSize={14} color="#DEDEDE">
          Do you Accept
        </TextView>
        <TouchableOpacity onPress={() => {}}>
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
      <BouncyCheckbox
        size={22}
        fillColor={'#000'}
        text="By continuing, you agree to our Vault Rules"
        innerIconStyle={{
          borderRadius: 8,
          borderColor: '#fff',
        }}
        iconStyle={{ borderRadius: 8 }}
        textStyle={{
          textDecorationLine: 'none',
          color: '#fff',
          fontSize: 14,
          fontFamily: 'General Sans',
        }}
        isChecked={toggleCheckBox}
        onPress={(isChecked: boolean) => {
          setToggleCheckBox(isChecked);
        }}
      />
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
        <TouchableOpacity onPress={() => {}}>
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
  input: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: '#DEDEDE',
  },
});

export default Form;
