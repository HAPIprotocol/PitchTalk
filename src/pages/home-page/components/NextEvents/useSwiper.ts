import { ReactNode, RefObject, useCallback, useEffect, useState } from 'react';
import { register } from 'swiper/element/bundle';
import { SwiperProps, SwiperSlideProps } from 'swiper/react';
import { Swiper, SwiperOptions } from 'swiper/types';

import { useStyles } from './styles';
import './swiper.styles.css';

/**
 * When you import Swiper custom elements from node modules, we need to manually register them.
 * It should be done only once and it registers Swiper custom elements globally.
 */
register();

type Kebab<
  T extends string,
  A extends string = ''
> = T extends `${infer F}${infer R}`
  ? Kebab<R, `${A}${F extends Lowercase<F> ? '' : '-'}${Lowercase<F>}`>
  : A;

/**
 * Helper for converting object keys to kebab case because Swiper web components parameters are available as kebab-case attributes.
 * @link https://swiperjs.com/element#parameters-as-attributes
 */
type KebabObjectKeys<T> = {
  // eslint-disable-next-line @typescript-eslint/ban-types
  [key in keyof T as Kebab<key & string>]: T[key] extends Object
    ? KebabObjectKeys<T[key]>
    : T[key];
};

/**
 * Swiper 9 doesn't support Typescript yet, we are watching the following issue:
 * @link https://github.com/nolimits4web/swiper/issues/6466
 *
 * All parameters can be found on the following page:
 * @link https://swiperjs.com/swiper-api#parameters
 */
export type SwiperRef = HTMLElement & {
  swiper: Swiper;
  initialize: () => void;
};

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      'swiper-container': SwiperContainerAttributes;
      'swiper-slide': SwiperSlideAttributes;
    }

    interface SwiperContainerAttributes extends KebabObjectKeys<SwiperOptions> {
      ref?: RefObject<SwiperRef>;
      children?: ReactNode;
    }
    interface SwiperSlideAttributes extends KebabObjectKeys<SwiperSlideProps> {
      key?: number | string;
    }
  }
}

export const useSwiper = () => {
  const classes = useStyles();

  const [swiperElRef, setSwiperElRef] = useState<{ current: SwiperRef | null }>(
    { current: null }
  );
  const handleSwiperElRef = useCallback(
    (node: SwiperRef) => setSwiperElRef({ current: node }),
    []
  );

  useEffect(() => {
    if (!swiperElRef?.current) return;
    const swiperContainer = swiperElRef.current;
    const params: SwiperProps = {
      pagination: {
        clickable: true,
        dynamicBullets: true,
      },

      speed: 750,

      loopedSlides: 2,
      loop: true,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },
      centeredSlides: true,

      slidesPerView: 3,
      spaceBetween: 24,

      breakpoints: {
        360: {
          slidesPerView: 'auto',
          spaceBetween: 16,
        },
        760: {
          slidesPerView: 'auto',
          spaceBetween: 16,
        },
        1240: {
          slidesPerView: 3,
          spaceBetween: 24,
        },
        1440: {
          slidesPerView: 3,
          spaceBetween: 24,
        },
      },

      className: classes.nextEventsList,
      injectStyles: [
        `
        .swiper-pagination-bullet {
          width: 10px;
          height: 10px;
          background-color: #FFFFFF;
        }
      `,
      ],
    };

    Object.assign(swiperContainer || {}, params);
    swiperContainer?.initialize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [swiperElRef]);

  return {
    swiperRef: swiperElRef,
    setSwiperRef: handleSwiperElRef,
  };
};
