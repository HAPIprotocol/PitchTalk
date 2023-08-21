import { BenefitPlanTypes } from '@pitchtalk/contract-api-js/dist/core';
import { useRef, useState } from 'react';

import { ReactComponent as TriangleIcon } from 'assets/images/icons/triangle-icon.svg';
import { useOutsideClick } from 'shared/hooks/useOutsideClick';
import { classNames } from 'shared/styles/theme';

import useStyles from './styles';

type VestingTypeSelectProps = {
  selectedType: string;
  selectType: (planType: BenefitPlanTypes) => void;
  readOnly?: boolean;
  infoLabel?: string;
  infoLabelExtraClass?: string;
  selectExtraClass?: string;
};

export const VestingTypeSelect: React.FC<VestingTypeSelectProps> = ({
  selectedType,
  selectType,
  readOnly,
  infoLabel = '',
  infoLabelExtraClass = '',
  selectExtraClass = '',
}) => {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropDownRef = useRef<HTMLDivElement>(null);

  const handleSelectType = (planType: BenefitPlanTypes) => {
    selectType(planType);
    setIsOpen(false);
  };

  useOutsideClick(dropDownRef, () => setIsOpen(false));

  return (
    <div
      className={classNames(
        classes.select,
        readOnly && 'readOnly',
        selectExtraClass
      )}
      ref={dropDownRef}
    >
      <div
        className={classes.selectWrapper}
        onClick={() => !readOnly && setIsOpen(!isOpen)}
      >
        <label className={classes.selectValue}>
          <span>{selectedType}</span>
        </label>
        <TriangleIcon
          className={isOpen ? classes.selectIconRotate : classes.selectIcon}
        />
        {infoLabel && (
          <label className={classNames(classes.infoLabel, infoLabelExtraClass)}>
            {infoLabel}
          </label>
        )}
      </div>
      {isOpen && (
        <div className={classes.dropDownOpened}>
          <button
            onClick={() => handleSelectType(BenefitPlanTypes.Linear)}
            className={classes.vestingTypeBtn}
            disabled={selectedType === BenefitPlanTypes.Linear}
          >
            {BenefitPlanTypes.Linear}
          </button>
          <button
            onClick={() => handleSelectType(BenefitPlanTypes.NonLinear)}
            className={classes.vestingTypeBtn}
            disabled={selectedType === BenefitPlanTypes.NonLinear}
          >
            {BenefitPlanTypes.NonLinear}
          </button>
        </div>
      )}
    </div>
  );
};
