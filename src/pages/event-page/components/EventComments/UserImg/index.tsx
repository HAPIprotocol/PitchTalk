// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import * as Jazzicon from 'jazzicon';
import { memo, useEffect, useState } from 'react';
import React from 'react';

import nearIcon from 'assets/images/auth/near.svg';
import { EMPTY_STRING } from 'shared/constants';
import { EProviders } from 'store/types/user';

import { useStyles } from './styles';

interface IUserImgProps {
  userName: string;
  userImg: string;
  userProvider: EProviders;
}

export const UserImg: React.FC<IUserImgProps> = memo(
  ({ userName, userImg, userProvider }) => {
    const classes = useStyles();
    const [img, setImg] = useState<string | HTMLDivElement>(EMPTY_STRING);

    useEffect(() => {
      if (userImg) {
        setImg(userImg);
      } else {
        if (userProvider === EProviders.METAMASK) {
          setImg(Jazzicon(24, parseInt(userName.slice(2, 10), 16)));
        } else {
          setImg(nearIcon);
        }
      }
    }, []);

    return (
      <div className={classes.userImgWrapper}>
        {typeof img === 'string' ? (
          <img src={img} loading="lazy" className={classes.userImg} />
        ) : (
          <div
            className={classes.userImg}
            ref={(ref) => ref?.appendChild(img)}
          />
        )}
      </div>
    );
  }
);
