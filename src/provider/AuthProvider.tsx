import { useMutation, useQuery } from '@apollo/client/react';
import userQL from 'graph/userQL';
import React, { createContext, useEffect, useState } from 'react';

interface IAuth {
  loggedUser: any;
  signedOut: () => void;
  updateUser: () => void;
}

export const AuthContext = createContext({} as IAuth);

const AuthProvider: React.FC<any> = ({ children, value }) => {
  const [logoutMutation] = useMutation(userQL.clientPortalLogout);

  const [loggedUser, setLoggedUser] = useState<any>();
  const { data, refetch } = useQuery<any>(userQL.clientPortalCurrentUser, {
    fetchPolicy: 'network-only',
  });

  useEffect(() => {
    if (data && data?.clientPortalCurrentUser?._id) {
      const userData = data?.clientPortalCurrentUser;
      setLoggedUser(userData);
    }
  }, [data]);

  const logout = () => {
    logoutMutation().then(() => {
      value?.dispatch({ type: 'LOGOUT' });
      setLoggedUser(null);
    });
  };

  const mContext: IAuth = {
    loggedUser: loggedUser,
    updateUser: () => refetch(),
    signedOut: () => logout(),
  };

  return (
    <AuthContext.Provider value={mContext}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
