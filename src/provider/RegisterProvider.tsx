/* eslint-disable @typescript-eslint/no-shadow */
import React, { createContext, useState } from 'react';

interface IRegister {
  phone: string;
  email: string;
  otp: any;
  password: string;
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
  // const [latestAccount, _] = useMMKVObject<any>(keys.latestAccount);
  // const [deviceToken] = useMMKVString(keys.deviceToken);

  // const [login, { loading }] = useMutation(userQL.clientPortalLogin, {
  //   onCompleted() {
  //     value?.dispatch({ type: 'LOGIN', token: 'loggedIn' });
  //   },
  //   onError(err) {
  //     alert.onError(err.message);
  //   },
  // });

  // useEffect(() => {
  //   if (latestAccount?.phone && latestAccount?.password) {
  //     console.log(latestAccount, 'h');
  //     login({
  //       variables: {
  //         login: latestAccount.phone,
  //         password: latestAccount.password,
  //         clientPortalId: ClIENTPORTAL_ID,
  //         deviceToken,
  //       },
  //     });
  //   }
  // }, [deviceToken, latestAccount]);

  const [state, setState] = useState<IRegister>({
    phone: '',
    email: '',
    otp: [''],
    password: '',
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
