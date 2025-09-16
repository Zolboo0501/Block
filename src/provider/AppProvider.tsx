import React, { createContext } from 'react';

export const AppContext = createContext({} as {});

const WidgetProvider: React.FC<any> = ({ children }) => {
  const mContext = {};
  return <AppContext.Provider value={mContext}>{children}</AppContext.Provider>;
};

export default WidgetProvider;
