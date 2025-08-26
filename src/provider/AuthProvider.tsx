import React, { createContext } from 'react';

interface IAuth {
  signedOut: () => void;
}

export const AuthContext = createContext({} as IAuth);

const AuthProvider: React.FC<any> = ({ children, value }) => {
  const mContext: IAuth = {
    signedOut: () => value?.dispatch({ type: 'LOGOUT', token: null }),
  };

  return (
    <AuthContext.Provider value={mContext}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
