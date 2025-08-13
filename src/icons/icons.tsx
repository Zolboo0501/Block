import Svg, { Path } from 'react-native-svg';

export const ArrowLeft: React.FC<any> = () => {
  return (
    <Svg width={55} height={24} viewBox="0 0 55 24" fill="none">
      <Path
        d="M30.938 4.5L48.124 12m0 0l-17.188 7.5M48.126 12H6.875"
        stroke="#DEDEDE"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export const Menu: React.FC<any> = () => {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Path
        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
        stroke="#fff"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export const Logout: React.FC<any> = () => {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Path
        d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
        stroke="#DEDEDE"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
