/* eslint-disable @typescript-eslint/no-shadow */
import React, { createContext, useState } from 'react';

interface IRegister {
  phone: string;
  email: string;
  otp: any;
  password: string;
  membership: any;
  title: any;
  forename: string;
  surname: string;
  nationality: string;
  dateOfBirth: any;
  communication: string;
  userId: string;
  erxesCustomerId: string;
}

interface IRegisterState {
  phone: string;
  email: string;
  otp: any;
  password: string;
  membership: any;
  title: any;
  forename: string;
  surname: string;
  nationality: string;
  dateOfBirth: any;
  communication: string;
  userId: string;
  erxesCustomerId: string;
  onChange: (
    key:
      | 'phone'
      | 'email'
      | 'password'
      | 'otp'
      | 'membership'
      | 'title'
      | 'forename'
      | 'surname'
      | 'nationality'
      | 'dateOfBirth'
      | 'communication'
      | 'userId'
      | 'erxesCustomerId',
    value: any,
  ) => void;

  signedIn: () => void;
}

export const RegisterContext = createContext({} as IRegisterState);

const RegisterProvider: React.FC<any> = ({ children, value }) => {
  const [state, setState] = useState<IRegister>({
    phone: '',
    email: '',
    otp: [''],
    password: '',
    membership: {},
    title: {},
    forename: '',
    surname: '',
    nationality: '',
    dateOfBirth: new Date('1985-06-22'),
    communication: '',
    userId: '',
    erxesCustomerId: '',
  });

  const onChange = (
    key:
      | 'phone'
      | 'email'
      | 'password'
      | 'otp'
      | 'membership'
      | 'title'
      | 'forename'
      | 'surname'
      | 'nationality'
      | 'dateOfBirth'
      | 'communication'
      | 'userId'
      | 'erxesCustomerId',
    value: string,
  ) => {
    if (key === 'otp' && (value === '' || value === undefined)) return;
    setState(prev => ({ ...prev, [key]: value }));
  };

  const mContext: IRegisterState = {
    phone: state.phone,
    email: state.email,
    password: state.password,
    otp: state.otp,
    membership: state.membership,
    title: state.title,
    forename: state.forename,
    surname: state.surname,
    nationality: state.nationality,
    dateOfBirth: state.dateOfBirth,
    communication: state.communication,
    userId: state.userId,
    erxesCustomerId: state.erxesCustomerId,
    signedIn: () => value?.dispatch({ type: 'LOGIN', token: 'loggedIn' }),

    onChange: (
      key:
        | 'phone'
        | 'email'
        | 'password'
        | 'otp'
        | 'membership'
        | 'title'
        | 'forename'
        | 'surname'
        | 'nationality'
        | 'dateOfBirth'
        | 'communication'
        | 'userId'
        | 'erxesCustomerId',
      value: string,
    ) => onChange(key, value),
  };

  return (
    <RegisterContext.Provider value={mContext}>
      {children}
    </RegisterContext.Provider>
  );
};

export default RegisterProvider;
