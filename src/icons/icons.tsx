import Svg, { Circle, ClipPath, Defs, G, Path } from 'react-native-svg';

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

export const ArrowUp = () => {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Path
        d="M20.498 5.978L2.476 24 0 21.524 18.022 3.502H2.99V0H24v21.011h-3.502V5.978z"
        fill="#07F"
      />
    </Svg>
  );
};
export const Location = () => {
  return (
    <Svg width={16} height={17} viewBox="0 0 16 17" fill="none">
      <G clipPath="url(#clip0_14_36)" fill="#fff">
        <Path d="M8.917 16.5H7.083l-.189-.165c-.227-.198-5.56-4.915-5.56-9.168a6.667 6.667 0 0113.333 0c0 4.253-5.334 8.97-5.561 9.168l-.189.165zm-1.326-1.333h.818c.91-.844 4.924-4.749 4.924-8a5.333 5.333 0 10-10.666 0c0 3.257 4.014 7.158 4.924 8z" />
        <Path d="M8 10.5a3.333 3.333 0 110-6.667A3.333 3.333 0 018 10.5zm0-5.333a2 2 0 100 4 2 2 0 000-4z" />
      </G>
      <Defs>
        <ClipPath id="clip0_14_36">
          <Path fill="#fff" transform="translate(0 .5)" d="M0 0H16V16H0z" />
        </ClipPath>
      </Defs>
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

export const Gallery = () => {
  return (
    <Svg width={20} height={20} viewBox="0 0 22 22" fill="none">
      <Path
        d="M2.139 17.508C3.498 20.077 6.21 21 11 21c6.618 0 9.271-1.762 9.865-7.194M2.14 17.508C1.329 15.976 1 13.858 1 11 1 3.353 3.353 1 11 1s10 2.353 10 10c0 1.029-.043 1.962-.135 2.806M2.14 17.508l3.668-3.668a2.353 2.353 0 013.327 0l.202.202a2.353 2.353 0 003.328 0l2.555-2.555a2.353 2.353 0 013.327 0l2.32 2.32M9.46 7.288a2.172 2.172 0 11-4.34-.001 2.172 2.172 0 014.34.001z"
        stroke="#DEDEDE"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export const AlertClose = ({
  color = '#fff',
  size = 16,
}: {
  color?: string;
  size?: number;
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <Path
        d="M13.437 2.571a.858.858 0 00-1.216 0L8 6.783l-4.22-4.22A.86.86 0 102.563 3.78L6.783 8l-4.22 4.22a.86.86 0 001.217 1.217L8 9.217l4.22 4.22a.862.862 0 001.404-.937.862.862 0 00-.187-.28L9.217 8l4.22-4.22a.865.865 0 000-1.209z"
        fill={color}
      />
    </Svg>
  );
};

export const Success = ({ size = 16 }: { size?: number }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <Circle cx={8} cy={8} r={8} fill="#3DCBB1" />
      <Path
        d="M7.003 10.681a.776.776 0 00.264-.044.626.626 0 00.23-.15l4.002-4.003a.647.647 0 00.194-.476.677.677 0 00-.211-.494.669.669 0 00-.494-.194c-.2 0-.364.065-.494.194L7.003 9.006 5.469 7.472a.647.647 0 00-.477-.194.677.677 0 00-.493.211.669.669 0 00-.194.494c0 .2.064.364.194.494l2.01 2.01c.07.07.147.12.23.15.081.029.17.044.264.044z"
        fill="#fff"
      />
    </Svg>
  );
};

export const Alert = () => {
  return (
    <Svg width={18} height={18} viewBox="0 0 18 18" fill="none">
      <Circle cx={9} cy={9} r={9} fill="#FF4648" />
      <Path
        d="M8.25 4.75a.75.75 0 011.5 0v6a.75.75 0 11-1.5 0v-6zm0 8.5a.75.75 0 111.5 0 .75.75 0 01-1.5 0z"
        fill="#fff"
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

export const PdfIcon = () => {
  return (
    <Svg width={20} height={20} fill="#F40F02" viewBox="0 0 16 16">
      <Path d="M4 0a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V2a2 2 0 00-2-2H4zm0 1h8a1 1 0 011 1v12a1 1 0 01-1 1H4a1 1 0 01-1-1V2a1 1 0 011-1z" />
      <Path d="M4.603 12.087a.81.81 0 01-.438-.42c-.195-.388-.13-.776.08-1.102.198-.307.526-.568.897-.787a7.68 7.68 0 011.482-.645 19.701 19.701 0 001.062-2.227 7.269 7.269 0 01-.43-1.295c-.086-.4-.119-.796-.046-1.136.075-.354.274-.672.65-.823.192-.077.4-.12.602-.077a.7.7 0 01.477.365c.088.164.12.356.127.538.007.187-.012.395-.047.614-.084.51-.27 1.134-.52 1.794a10.954 10.954 0 00.98 1.686 5.753 5.753 0 011.334.05c.364.065.734.195.96.465.12.144.193.32.2.518.007.192-.047.382-.138.563a1.04 1.04 0 01-.354.416.856.856 0 01-.51.138c-.331-.014-.654-.196-.933-.417a5.716 5.716 0 01-.911-.95 11.642 11.642 0 00-1.997.406 11.311 11.311 0 01-1.021 1.51c-.29.35-.608.655-.926.787a.793.793 0 01-.58.029zm1.379-1.901c-.166.076-.32.156-.459.238-.328.194-.541.383-.647.547-.094.145-.096.25-.04.361.01.022.02.036.026.044a.27.27 0 00.035-.012c.137-.056.355-.235.635-.572a8.18 8.18 0 00.45-.606zm1.64-1.33a12.647 12.647 0 011.01-.193 11.666 11.666 0 01-.51-.858 20.741 20.741 0 01-.5 1.05zm2.446.45c.15.162.296.3.435.41.24.19.407.253.498.256a.107.107 0 00.07-.015.307.307 0 00.094-.125.436.436 0 00.059-.2.095.095 0 00-.026-.063c-.052-.062-.2-.152-.518-.209a3.881 3.881 0 00-.612-.053zM8.078 5.8a6.7 6.7 0 00.2-.828c.031-.188.043-.343.038-.465a.613.613 0 00-.032-.198.517.517 0 00-.145.04c-.087.035-.158.106-.196.283-.04.192-.03.469.046.822.024.111.054.227.09.346z" />
    </Svg>
  );
};

export const WordIcon = () => {
  return (
    <Svg width={20} height={20} fill="#3357C0" viewBox="0 0 16 16">
      <Path d="M4.879 4.515a.5.5 0 01.606.364l1.036 4.144.997-3.655a.5.5 0 01.964 0l.997 3.655 1.036-4.144a.5.5 0 01.97.242l-1.5 6a.5.5 0 01-.967.01L8 7.402l-1.018 3.73a.5.5 0 01-.967-.01l-1.5-6a.5.5 0 01.364-.606z" />
      <Path d="M4 0a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V2a2 2 0 00-2-2H4zm0 1h8a1 1 0 011 1v12a1 1 0 01-1 1H4a1 1 0 01-1-1V2a1 1 0 011-1z" />
    </Svg>
  );
};

export const FileIcon = () => {
  return (
    <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
      <Path
        d="M13 3v.6c0 2.25 0 3.375.573 4.163a3 3 0 00.664.664C15.025 9 16.15 9 18.4 9h.6m0 1.237V15.6c0 2.25 0 3.375-.573 4.163-.185.255-.409.479-.664.664C16.975 21 15.85 21 13.6 21h-3.2c-2.25 0-3.375 0-4.163-.573a3.003 3.003 0 01-.664-.664C5 18.975 5 17.85 5 15.6V8.4c0-2.25 0-3.375.573-4.163a3 3 0 01.664-.664C7.025 3 8.15 3 10.4 3h1.363c.98 0 1.47 0 1.921.147.15.048.295.109.435.18.424.216.77.562 1.463 1.255l1.836 1.836c.693.693 1.04 1.04 1.255 1.463.071.14.132.285.18.435.147.451.147.941.147 1.92z"
        stroke="#292556"
        strokeWidth={1.5}
        strokeLinejoin="round"
      />
    </Svg>
  );
};
export const ExcelIcon = () => {
  return (
    <Svg width={20} height={20} fill="#018445" viewBox="0 0 16 16">
      <Path d="M5.18 4.616a.5.5 0 01.704.064L8 7.219l2.116-2.54a.5.5 0 11.768.641L8.651 8l2.233 2.68a.5.5 0 01-.768.64L8 8.781l-2.116 2.54a.5.5 0 01-.768-.641L7.349 8 5.116 5.32a.5.5 0 01.064-.704z" />
      <Path d="M4 0a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V2a2 2 0 00-2-2H4zm0 1h8a1 1 0 011 1v12a1 1 0 01-1 1H4a1 1 0 01-1-1V2a1 1 0 011-1z" />
    </Svg>
  );
};
export const Close = ({ size = 24 }: { size?: number }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
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
export const Clock = () => {
  return (
    <Svg width={16} height={17} viewBox="0 0 16 17" fill="none">
      <Path
        d="M14.667 8.5A6.67 6.67 0 018 15.167 6.669 6.669 0 011.333 8.5 6.67 6.67 0 018 1.833 6.67 6.67 0 0114.667 8.5z"
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M10.473 10.62L8.407 9.387c-.36-.214-.654-.727-.654-1.147V5.507"
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
export const ArrowLeft = ({
  size = 24,
  color = '#DEDEDE',
}: {
  size?: number;
  color?: string;
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75"
        stroke={color}
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
