import i18n from 'services/translation';

const HOW_TO_INVESTORS_SECTIONS = 'howToPage.investorsPage.sections.';
const HOW_TO_INVESTORS_QUESTIONS = 'howToPage.investorsPage.questions.';

const currentLanguage = i18n.resolvedLanguage;

export const INVESTOR_VIDEO_URL =
  'https://cdn.pitchtalk.com/video/pitchtalk-redesign.mp4';

const fetchMD = async (file: string, lang = 'en'): Promise<string> => {
  try {
    const { default: url } = await import(
      `assets/locales/${lang}/how-to/investors/${file}.md`
    );
    const res = await fetch(url);
    return res.text();
  } catch (error) {
    const { default: url } = await import(
      `assets/locales/en/how-to/investors/${file}.md`
    );
    const res = await fetch(url);
    return res.text();
  }
};

export const HOW_TO_SECTIONS = [
  {
    tag: i18n.t(HOW_TO_INVESTORS_SECTIONS + 'wallet'),
    questions: [
      {
        img: require('assets/images/how-to/investors/cards/wallet.connect.png'),
        question: i18n.t(HOW_TO_INVESTORS_QUESTIONS + 'wallet.connect'),
        url: 'wallet/connect',
        answer: fetchMD('wallet.connect', currentLanguage),
        answerImages: [
          {
            url: require('assets/images/how-to/investors/descriptions/wallet/connect.1.png'),
            position: '100% 0',
          },
          {
            url: require('assets/images/how-to/investors/descriptions/wallet/connect.2.png'),
            position: '50% 30%',
          },
        ],
      },
    ],
  },
  {
    tag: i18n.t(HOW_TO_INVESTORS_SECTIONS + 'pitches'),
    questions: [
      {
        img: require('assets/images/how-to/investors/cards/pitches.what.png'),
        question: i18n.t(HOW_TO_INVESTORS_QUESTIONS + 'pitches.watch'),
        url: 'pitches/watch',
        answer: fetchMD('pitches.watch', currentLanguage),
        answerImages: [
          {
            url: require('assets/images/how-to/investors/descriptions/pitches/watch.1.png'),
            position: '100% 50%',
          },
          {
            url: require('assets/images/how-to/investors/descriptions/pitches/watch.2.png'),
            position: '100% 0',
          },
          {
            url: require('assets/images/how-to/investors/descriptions/pitches/watch.3.png'),
            position: '50% 0',
          },
        ],
      },
      {
        img: require('assets/images/how-to/investors/cards/pitches.view.png'),
        question: i18n.t(HOW_TO_INVESTORS_QUESTIONS + 'pitches.schedule'),
        url: 'pitches/schedule',
        answer: fetchMD('pitches.view', currentLanguage),
        answerImages: [
          {
            url: require('assets/images/how-to/investors/descriptions/pitches/view.1.png'),
            position: '60% 100%',
          },
          {
            url: require('assets/images/how-to/investors/descriptions/pitches/view.2.png'),
            position: '0 0',
          },
        ],
      },
      {
        img: require('assets/images/how-to/investors/cards/pitches.types.png'),
        question: i18n.t(HOW_TO_INVESTORS_QUESTIONS + 'pitches.types'),
        url: 'pitches/types',
        answer: fetchMD('pitches.types', currentLanguage),
        answerImages: [
          {
            url: require('assets/images/how-to/investors/descriptions/pitches/types.1.png'),
            position: '100% 0',
          },
        ],
      },
    ],
  },
  {
    tag: i18n.t(HOW_TO_INVESTORS_SECTIONS + 'donations'),
    questions: [
      {
        img: require('assets/images/how-to/investors/cards/donations.what.png'),
        question: i18n.t(HOW_TO_INVESTORS_QUESTIONS + 'donations.whatItIs'),
        url: 'donations/whatItIs',
        answer: fetchMD('donations.what', currentLanguage),
        answerImages: [
          {
            url: require('assets/images/how-to/investors/descriptions/donations/what.1.png'),
            position: '0 100%',
          },
        ],
      },
      {
        img: require('assets/images/how-to/investors/cards/donations.how-donate.png'),
        question: i18n.t(HOW_TO_INVESTORS_QUESTIONS + 'donations.donate'),
        url: 'donations/donate',
        answer: fetchMD('donations.how-donate', currentLanguage),
        answerImages: [
          {
            url: require('assets/images/how-to/investors/descriptions/donations/how-donate.1.png'),
            position: '100% 50%',
          },
          {
            url: require('assets/images/how-to/investors/descriptions/donations/how-donate.2.png'),
            position: '50% 30%',
          },
          {
            url: require('assets/images/how-to/investors/descriptions/donations/how-donate.3.png'),
            position: '100% 0',
          },
        ],
      },
    ],
  },
  {
    tag: i18n.t(HOW_TO_INVESTORS_SECTIONS + 'investments'),
    questions: [
      {
        img: require('assets/images/how-to/investors/cards/investments.what.png'),
        question: i18n.t(HOW_TO_INVESTORS_QUESTIONS + 'investments.whatItIs'),
        url: 'investments/whatItIs',
        answer: fetchMD('investments.what', currentLanguage),
        answerImages: [
          {
            url: require('assets/images/how-to/investors/descriptions/investments/what.1.png'),
            position: '100% 60%',
          },
        ],
      },
      {
        img: require('assets/images/how-to/investors/cards/investments.how-invest.png'),
        question: i18n.t(HOW_TO_INVESTORS_QUESTIONS + 'investments.invest'),
        url: 'investments/invest',
        answer: fetchMD('investments.how-invest', currentLanguage),
        answerImages: [
          {
            url: require('assets/images/how-to/investors/descriptions/investments/how-invest.1.png'),
            position: '100% 100%',
          },
          {
            url: require('assets/images/how-to/investors/descriptions/investments/how-invest.2.png'),
            position: '100% 50%',
          },
        ],
      },
      {
        img: require('assets/images/how-to/investors/cards/investments.list.png'),
        question: i18n.t(
          HOW_TO_INVESTORS_QUESTIONS + 'investments.seeInvestList'
        ),
        url: 'investments/seeInvestList',
        answer: fetchMD('investments.list', currentLanguage),
        answerImages: [
          {
            url: require('assets/images/how-to/investors/descriptions/investments/list.1.png'),
            position: '100% 0',
          },
          {
            url: require('assets/images/how-to/investors/descriptions/investments/list.2.png'),
            position: '0 100%',
          },
        ],
      },
      {
        img: require('assets/images/how-to/investors/cards/investments.get-tokens.png'),
        question: i18n.t(
          HOW_TO_INVESTORS_QUESTIONS + 'investments.projectTokens'
        ),
        url: 'investments/projectTokens',
        answer: fetchMD('investments.get-tokens', currentLanguage),
        answerImages: [
          {
            url: require('assets/images/how-to/investors/descriptions/investments/get-tokens.1.png'),
            position: '100% 100%',
          },
        ],
      },
      {
        img: require('assets/images/how-to/investors/cards/investments.my-invest.png'),
        question: i18n.t(HOW_TO_INVESTORS_QUESTIONS + 'investments.myInvest'),
        url: 'investments/myInvest',
        answer: fetchMD('investments.my-invest', currentLanguage),
        answerImages: [
          {
            url: require('assets/images/how-to/investors/descriptions/investments/my-invest.1.png'),
            position: '40% 0',
          },
          {
            url: require('assets/images/how-to/investors/descriptions/investments/my-invest.2.png'),
            position: '100% 0',
          },
        ],
      },
    ],
  },
  {
    tag: i18n.t(HOW_TO_INVESTORS_SECTIONS + 'vesting'),
    questions: [
      {
        img: require('assets/images/how-to/investors/cards/vesting.what.png'),
        question: i18n.t(HOW_TO_INVESTORS_QUESTIONS + 'vesting.whatItIs'),
        url: 'vesting/whatItIs',
        answer: fetchMD('vesting.what', currentLanguage),
        answerImages: [
          {
            url: require('assets/images/how-to/investors/descriptions/vesting/what.1.png'),
            position: '100% 100%',
          },
          {
            url: require('assets/images/how-to/investors/descriptions/vesting/what.2.png'),
            position: '100% 0',
          },
        ],
      },
      {
        img: require('assets/images/how-to/investors/cards/vesting.project-info.png'),
        question: i18n.t(HOW_TO_INVESTORS_QUESTIONS + 'vesting.view'),
        url: 'vesting/view',
        answer: fetchMD('vesting.project-info', currentLanguage),
        answerImages: [
          {
            url: require('assets/images/how-to/investors/descriptions/vesting/project-info.1.png'),
            position: '0 50%',
          },
        ],
      },
    ],
  },
];
