import Svg, { Path } from 'react-native-svg';

export const Face = () => {
  return (
    <Svg width={25} height={24} viewBox="0 0 25 24" fill="none">
      <Path
        d="M1.11 16.805a.61.61 0 01.609.61v2.694a2.675 2.675 0 002.672 2.672h2.695a.61.61 0 010 1.219H4.39A3.895 3.895 0 01.5 20.11v-2.696a.61.61 0 01.61-.61zm22.78 0a.61.61 0 01.61.61v2.694A3.895 3.895 0 0120.61 24h-2.696a.61.61 0 110-1.219h2.695a2.675 2.675 0 002.672-2.672v-2.695a.61.61 0 01.61-.61zm-8.043.004a.633.633 0 11.858.93 6.18 6.18 0 01-4.205 1.644 6.18 6.18 0 01-4.205-1.645.633.633 0 11.858-.93 4.918 4.918 0 003.347 1.31 4.919 4.919 0 003.347-1.31zm-2.714-8.395c.35 0 .633.283.633.633v4.5c0 .892-.726 1.617-1.618 1.617h-.515a.633.633 0 010-1.266h.515a.352.352 0 00.352-.351v-4.5c0-.35.283-.633.633-.633zm-5.52 0c.33 0 .598.268.598.598v1.804a.598.598 0 11-1.195 0V9.012c0-.33.267-.598.597-.598zm9.914 0c.33 0 .598.268.598.598v1.804a.598.598 0 01-1.195 0V9.012c0-.33.267-.598.597-.598zM7.086 0a.61.61 0 010 1.219H4.39A2.675 2.675 0 001.719 3.89v2.695a.61.61 0 01-1.219 0V3.89A3.895 3.895 0 014.39 0h2.696zm13.523 0A3.895 3.895 0 0124.5 3.89v2.696a.61.61 0 11-1.219 0V3.89a2.675 2.675 0 00-2.672-2.672h-2.695a.61.61 0 110-1.219h2.695z"
        fill="#DEDEDE"
      />
    </Svg>
  );
};

export const LogoutIcon = () => {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Path
        d="M7.5 3H5.25A2.25 2.25 0 003 5.25v13.5A2.25 2.25 0 005.25 21H7.5m9-13.5L21 12m0 0l-4.5 4.5M21 12H7.5"
        stroke="#DEDEDE"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export const Edit = () => {
  return (
    <Svg width={18} height={18} viewBox="0 0 18 18" fill="none">
      <Path
        d="M8.25 2.25h-4.5a1.5 1.5 0 00-1.5 1.5v10.5a1.5 1.5 0 001.5 1.5h10.5a1.5 1.5 0 001.5-1.5v-4.5m-2.625-7.125l-6 6L6 12l3.375-1.125 6-6a1.591 1.591 0 00-2.25-2.25z"
        stroke="#939393"
        strokeOpacity={0.4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
export const Folder = () => {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Path
        d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379c-.398 0-.78-.159-1.061-.44z"
        stroke="#DEDEDE"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
export const Profile = () => {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Path
        d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
        stroke="#DEDEDE"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
export const Send = ({ size }: { size?: number }) => {
  return (
    <Svg width={size} height={size} fill="none" viewBox="0 0 24 24">
      <Path
        d="M12.815 12.197l-7.532 1.256a.5.5 0 00-.386.318L2.3 20.728c-.248.64.421 1.25 1.035.943l18-9a.75.75 0 000-1.342l-18-9c-.614-.307-1.283.304-1.035.943l2.598 6.957a.5.5 0 00.386.319l7.532 1.255a.2.2 0 010 .394z"
        fill="#212121"
      />
    </Svg>
  );
};
export const Microphone = () => {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Path
        d="M9 6.008v6.023a3.008 3.008 0 106.015 0V6.008a3.008 3.008 0 10-6.015 0zM11 21h2v-2.07a7.062 7.062 0 01-2 0V21zm-1 0v-2.29c-2.891-.86-5-3.539-5-6.71v-.5a.5.5 0 011 0v.5a6 6 0 0012 0v-.5a.5.5 0 011 0v.5a7.003 7.003 0 01-5 6.71V21h2.5a.5.5 0 010 1h-9a.5.5 0 010-1H10zM8 6.008a4.008 4.008 0 118.015 0v6.023a4.008 4.008 0 01-8.015 0V6.008z"
        fill="#DEDEDE"
      />
    </Svg>
  );
};

export const ChevronLeft = () => {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Path
        d="M16 4l-8 8 8 8"
        stroke="#DEDEDE"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
export const Attachment = () => {
  return (
    <Svg width={20} height={20} viewBox="0 0 20 20" fill="none">
      <Path
        d="M15.313 10.616l-6.411 6.41a3.75 3.75 0 11-5.304-5.303l9.117-9.116a2.5 2.5 0 113.535 3.536l-9.123 9.124a1.25 1.25 0 01-1.76-1.776l6.508-6.509m-4.74 8.276l-.01.009"
        stroke="#DEDEDE"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
export const Menu = () => {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Path
        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12"
        stroke="#DEDEDE"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
export const Close = () => {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Path
        d="M6 18L18 6M6 6l12 12"
        stroke="#DEDEDE"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
export const EyeOpen = () => {
  return (
    <Svg width={20} height={20} viewBox="0 0 20 20" fill="none">
      <Path
        d="M1.697 10.268a.843.843 0 010-.532 8.752 8.752 0 0116.605-.004.831.831 0 010 .532 8.754 8.754 0 01-16.606.004z"
        stroke="#DEDEDE"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M12.5 10a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
        stroke="#DEDEDE"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export const Plus = () => {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 4.5v15m7.5-7.5h-15"
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
export const ArrowLeft = () => {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Path
        d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75"
        stroke="#DEDEDE"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
export const EyeClosed = ({
  size = 20,
  color = '#DEDEDE',
}: {
  size?: number;
  color?: string;
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 22 22" fill="none">
      <Path
        d="M2.42 5.417A.826.826 0 113.59 4.25L17.751 18.41a.826.826 0 01-1.17 1.169l-2.236-2.237a10.615 10.615 0 01-3.346.532C6.417 17.875 2.503 15.024.917 11a10.774 10.774 0 012.924-4.162l-1.42-1.42zM11 8.25a2.75 2.75 0 012.595 3.666l-3.511-3.51A2.75 2.75 0 0111 8.25zm0-4.125c4.584 0 8.498 2.85 10.084 6.875a10.807 10.807 0 01-3.06 4.278c-.339.288-.839.246-1.152-.07-.395-.397-.331-1.053.088-1.423A9.04 9.04 0 0019.085 11 9.002 9.002 0 0011 5.958c-.8 0-1.587.106-2.34.298a1.012 1.012 0 01-.967-.248c-.48-.476-.322-1.282.327-1.467A10.86 10.86 0 0111 4.125zM2.915 11A9.003 9.003 0 0011 16.04c.633 0 1.256-.064 1.834-.192l-2.09-2.1a2.808 2.808 0 01-2.494-2.492L5.134 8.13A9.034 9.034 0 002.915 11z"
        fill={color}
      />
    </Svg>
  );
};
