import { setNavigation } from '@utils';
import Button from 'components/Button';
import Input from 'components/Input';
import KeyboardContainer from 'components/KeyboardContainer';
import TextView from 'components/TextView';
import dayjs from 'dayjs';
import React, { useLayoutEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, TouchableOpacity, View } from 'react-native';
import DatePicker from 'react-native-date-picker';
import Communications from 'view/validationForm/Communications';

const EditProfile: React.FC<any> = ({ navigation }) => {
  const [profile, setProfile] = useState({
    title: '',
    forename: '',
    surname: '',
    nationality: '',
    dateOfBirth: new Date(),
    phone: '',
    email: '',
    communication: '',
  });
  const [open, setOpen] = useState(false);

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
      | 'phone'
      | 'email'
      | 'communication',
  ) => {
    setProfile(prev => ({ ...prev, [type]: text }));
  };

  const onSave = () => {};
  return (
    <>
      <SafeAreaView style={styles.container}>
        <KeyboardContainer>
          <View style={styles.space}>
            <Input
              labelColor={'#DEDEDE'}
              labelFontFamily="Optician Sans"
              label="YOUR TITLE"
              value={profile.title}
              placeholder="Mr/Ms"
              onChangeText={(text: string) => onChange(text, 'title')}
            />
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
              keyboardType="decimal-pad"
              isPhone={true}
              label="PHONE NUMBER"
              value={profile.phone}
              onChangeText={(text: string) => onChange(text, 'phone')}
            />
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
  space: {
    flex: 1,
    paddingHorizontal: 15,
    gap: 24,
    paddingVertical: 20,
  },
  input: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: '#DEDEDE',
  },
});
