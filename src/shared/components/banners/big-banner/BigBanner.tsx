import { useNavigate } from 'react-router-dom';

import CLOSE_ICON from 'assets/images/icons/white-close-icon.svg';
import TITLE_LOGO from 'assets/images/title-logo.svg';
import { APP_ROUTES } from 'routes';

import { bannerStyles } from './styles';
import { Translate } from '../../translate/Translate';

import 'shared/components/banners/big-banner/banners.style.css';

const BigBanner = () => {
  const classes = bannerStyles();
  const navigate = useNavigate();
  return (
    <div>
      <svg className={classes.closeIcon}>
        <image xlinkHref={CLOSE_ICON} />
      </svg>
      <a
        onClick={() => navigate(APP_ROUTES.PARTICIPANT)}
        className={classes.container}
      >
        <span className={classes.title}>
          <Translate value="banner.title" />
        </span>
        <div>
          <div className={classes.actionWrapper}>
            <img
              src={TITLE_LOGO}
              className={classes.titleLogo}
              alt="title logo"
            />
            <div className={classes.btn} id="accessBtn">
              <Translate value="banner.getAccess" />
            </div>
          </div>
        </div>
      </a>
    </div>
  );
};

export default BigBanner;
