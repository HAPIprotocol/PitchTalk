import { RefObject } from 'react';

type NavigationProps = {
  links: string[];
  wrapperRef: RefObject<HTMLDivElement>;
};

export const Navigation: React.FC<NavigationProps> = ({
  links,
  wrapperRef,
}) => {
  const scrollToSection = (ind: number) => {
    if (wrapperRef?.current) {
      Array.from(wrapperRef.current?.children)[ind].scrollIntoView({
        block: 'start',
        behavior: 'smooth',
      });
    }
  };

  return (
    <>
      {links.map((link, ind) => (
        <label onClick={() => scrollToSection(ind)} key={link + ind}>
          / {link.charAt(0).toUpperCase() + link.toLocaleLowerCase().slice(1)}{' '}
        </label>
      ))}
    </>
  );
};
