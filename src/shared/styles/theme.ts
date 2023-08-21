import { EPitchType } from '@pitchtalk/contract-api-js/dist/interfaces/pitch';

export const classNames = (
  ...classes: Array<string | boolean | undefined | null>
) => classes.filter(Boolean).join(' ');

export const PitchTalkTheme = {
  colors: {
    primary: '#1314E8',
    primaryHover: '#5133B1',
    primaryDisabled: '#6E658A',
    secondaryDark: '#653EE2',
    secondaryDarkHover: '3F1FA8',
    secondaryLight: '#85E7F7',
    grey: '#C4C4C4',
    darkerGrey: '#9FA0A4',
    lightGrey: '#8A8A8A',
    darkGrey: '#141414',
    disabledGrey: '#333333',
    textGrey: '#949393',
    lightTextGrey: '#636363',
    white: '#FFFFFF',
    black: '#000000',
    borderGray: '#9D9D9D',
    cardGrey: '#202020',
    headerPurple: '#140C2D',
    errorPink: '#FFA4A4',
    investPitchBG: '#16AF4A',
    lightDark: '#1F1F1F',
    burgerMenuBg: 'rgba(31, 31, 31, 0.7)',
    convertedAmountShadow: 'rgba(0, 0, 0, 0.25)',
    darkBlue: '#220C66',
    darkPurple: '#1D1F2D',
    filterColor: '#A386FE',
    errorRed: '#FF8585',
    inputFocused: '#3ED8E2',
    projectStatus: {
      soon: '#3E80E2',
      live: '#653EE2',
      hot: '#E23E3E',
      vesting: '#CB3EE2',
      completed: '#3ED8E2',
      new: '#3EE24E',
    },
    processingColor: '#CB3EE2',
    declinedColor: '#E23E3E',
    dropdownBG: '#484747',
    dropdownHoverBG: '#48474780',
    failed: '#FF8585',
    btnSuccess: '#16AF4A',
    blueTeal: '#1C97AB',
    teamMemberBg: '#D9D9D9',
    eventLinkColor: '#98A4FF',
    // GRANT
    grantBaseColor: '#E2AA3E',
    likesBg: '#220C66',
    likesBtnBg: 'rgba(255, 255, 255, 0.10)',
    inputReadOnly: '#c4c4c480',
    transparent: 'rgba(0,0,0,0)',
    authBtnBG: 'rgba(196, 196, 196, 0.12)',
    authIconBG: 'rgba(101, 62, 226, 0.12)',
    closeBtnBG: '#383838',
    userNameModalSecondaryBtn: 'rgba(101, 62, 226, 0.32)',
    // NEW DESIGN COLORS
    ptBG: '#13181F',
    ptGrey: '#C0C7D1',
    ptGreen: '#77E550',
    ptBlue: '#5AC4FF',
    ptError: '#FF5A64',
    ptGreyDark: '#ACB3BD',
    ptGreyDarkText: '#8E959F',
    ptGrey2: '#343C47',
  },
  fonts: {
    Everett: {
      Jana: 'Everett-Jana',
      Light: 'Everett-Light',
      Medium: 'Everett-Medium',
      Regular: 'Everett-Regular',
    },
  },
};

export const getPitchStatusColor = {
  [EPitchType.Intro]: '#3C73DE',
  [EPitchType.Update]: '#DE6D3C',
  [EPitchType.Investment]: '#16AF4A',
  [EPitchType.Initial]: 'white',
};

export type IAppTheme = typeof PitchTalkTheme;
