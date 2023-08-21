import { memo, useRef, useState } from 'react';
import { CSSTransition, SwitchTransition } from 'react-transition-group';

import { useAppSelector } from 'shared/hooks/redux-hooks';
import { EClaimAndVestingView } from 'shared/interfaces';
import { selectProjectVesting } from 'store/slices/vesting';

import { ClaimInfo } from './ClaimInfo/ClaimInfo';
import { claimAndVestingConfig } from './constants';
import { useStyles } from './styles';
import { VestingInfo } from './VestingInfo/VestingInfo';
import { TogglePanel } from '../toggle-panel/TogglePanel';

import './transition.css';

interface IClaimAndVestingProps {
  projectId: number;
}

export const ClaimAndVesting: React.FC<IClaimAndVestingProps> = memo(
  ({ projectId }): JSX.Element | null => {
    const vesting = useAppSelector((state) =>
      selectProjectVesting(state, projectId)
    );

    const [viewToggle, setViewToggle] = useState<EClaimAndVestingView>(
      claimAndVestingConfig[0].value
    );
    const classes = useStyles();

    const claimRef = useRef<HTMLDivElement>(null);
    const graphRef = useRef<HTMLDivElement>(null);
    const nodeRef =
      viewToggle === EClaimAndVestingView.CLAIM ? claimRef : graphRef;

    if (!vesting) return null;

    return (
      <div
        className={
          classes.claimAndVestingWrapper +
          (viewToggle === EClaimAndVestingView.CLAIM ? ' claim' : ' vesting')
        }
      >
        <TogglePanel
          buttons={claimAndVestingConfig}
          buttonStyles={classes.toggleButtons}
          containerStyles={classes.toggleButtonsContainer}
          handler={setViewToggle}
          toggleValue={viewToggle}
        />
        <SwitchTransition>
          <CSSTransition
            key={viewToggle}
            nodeRef={nodeRef}
            addEndListener={(done: () => void) =>
              nodeRef?.current?.addEventListener('transitionend', done, false)
            }
            classNames="claim-vesting-transition"
          >
            <div ref={nodeRef}>
              {viewToggle === EClaimAndVestingView.CLAIM ? (
                <ClaimInfo projectId={projectId} vesting={vesting} />
              ) : (
                <VestingInfo projectId={projectId} vesting={vesting} />
              )}
            </div>
          </CSSTransition>
        </SwitchTransition>
      </div>
    );
  }
);
