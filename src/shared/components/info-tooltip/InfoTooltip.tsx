import { useRef, useState } from 'react'

import { ReactComponent as InfoIcon } from 'assets/images/icons/info-icon-fill.svg'
import { useOutsideClick } from 'shared/hooks/useOutsideClick';

import { useStyles } from './styles';

export const InfoTooltip: React.FC<{text: string}> = ({text}) => {
  const [visible, setVisible] = useState<boolean>(false);
  const classes = useStyles(visible);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useOutsideClick(wrapperRef, () => setVisible(false));
  return (
      <div className={classes.tooltipContainer} ref={wrapperRef}>
        <InfoIcon onClick={() => setVisible(true)} className={classes.tooltipIcon}/>
        <div className={classes.tooltip}>{text}</div>
      </div>
  )
}

