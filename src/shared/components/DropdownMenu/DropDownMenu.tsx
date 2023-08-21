import {
  DependencyList,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import { useOutsideClick } from 'shared/hooks/useOutsideClick';

import { useStyles } from './styles';

type DropDownMenu = {
  list: JSX.Element;
  position: {
    top?: number | string;
    left?: number | string;
    bottom?: number | string;
    right?: number | string;
  };
  className: string;
  menuClassName?: string;
  children: JSX.Element;
  onCloseDepArray?: DependencyList;
  disabled?: boolean;
};

export const DropDownMenu: React.FC<DropDownMenu> = ({
  list,
  className,
  menuClassName,
  children,
  position,
  onCloseDepArray = [],
  disabled,
}): JSX.Element => {
  const classes = useStyles();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const dropDownRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useOutsideClick(wrapperRef, () => setIsOpen(false));

  useEffect(() => {
    setIsOpen(false);
  }, onCloseDepArray);

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
      // Check is clicked on dropdown menu, in other way close dropdown
      !dropDownRef?.current?.contains(event?.target as Node) &&
      setIsOpen((wasOpened) => !wasOpened),
    []
  );

  return (
    <div
      ref={wrapperRef}
      className={`${classes.dropDownWrapper} ${className} ${
        isOpen ? 'opened' : ''
      }`}
      onClick={!disabled ? handleClick : () => ({})}
    >
      {children}
      {isOpen && (
        <div
          ref={dropDownRef}
          className={`${classes.dropdownMenu} ${menuClassName}`}
          style={{ ...position }}
        >
          {list}
        </div>
      )}
    </div>
  );
};
