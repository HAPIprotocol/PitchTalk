import { toast, Slide, Theme } from 'react-toastify';

import { ToastType } from 'services/toast/constants';
import i18n from 'services/translation';
import { PitchTalkTheme } from 'shared/styles/theme';

import { Translate } from '../translate/Translate';

export const errorToastOptions = {
  theme: 'dark' as Theme,
  transition: Slide,
  closeOnClick: true,
  style: {
    boxShadow: '0px 0px 10px 10px rgba(0, 0, 0, 0.15)',
    borderRadius: '12px',
  },
};

export const successToastOptions = {
  theme: 'dark' as Theme,
  transition: Slide,
  closeOnClick: true,
  pauseOnHover: true,
  style: {
    background: PitchTalkTheme.colors.darkGrey,
    boxShadow: '0px 0px 10px 10px rgba(0, 0, 0, 0.15)',
    borderRadius: '12px',
  },
};

export const ToastLink = (
  href: string,
  title: string,
  type: ToastType,
  withWarn?: boolean
) => {
  const link = (
    <div>
      <div
        style={{
          fontFamily: PitchTalkTheme.fonts.Everett.Regular,
        }}
      >
        {title}
        {withWarn && (
          <p
            style={{
              fontFamily: PitchTalkTheme.fonts.Everett.Regular,
              color: 'rgb(255, 136, 17)',
              fontSize: '0.75rem',
            }}
          >
            {withWarn && <Translate value={'toast.dataUpdateWarning'} />}
          </p>
        )}

        {href ? (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: PitchTalkTheme.fonts.Everett.Regular,
              color: PitchTalkTheme.colors.secondaryDark,
              textDecoration: 'none',
            }}
          >
            <p>{`${i18n.t('toast.openTransaction')}`}</p>
          </a>
        ) : null}
      </div>
    </div>
  );

  if (type === ToastType.Success) {
    toast.success(link, successToastOptions);
    return;
  }
  if (type === ToastType.Info) {
    toast.info(link, successToastOptions);
    return;
  }
  toast.error(link, errorToastOptions);
};
