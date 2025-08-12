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
