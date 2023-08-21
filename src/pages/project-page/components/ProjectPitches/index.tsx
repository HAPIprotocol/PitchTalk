import { EProjectType } from '@pitchtalk/contract-api-js';
import { Project } from '@pitchtalk/contract-api-js/dist/core';
import { IOffChainProject } from '@pitchtalk/contract-api-js/dist/interfaces/offChainProject';
import {
  EPitchType,
  Pitch as PitchType,
} from '@pitchtalk/contract-api-js/dist/interfaces/pitch';
import { t } from 'i18next';
import { memo, useState } from 'react';

import { getCorrectIPFSLinks } from 'pages/participant-form/helpers';
import { findPitchByKey } from 'shared/utils/pitchUtils';

import { Pitch } from './components/Pitch/Pitch';
import { useStyles } from './styles';
import { SectionTitle } from '../SectionTitle';

interface IProjectPitchesProps {
  project: Project | IOffChainProject;
  projectType: EProjectType;
}

export const ProjectPitches: React.FC<IProjectPitchesProps> = memo(
  ({ project, projectType }) => {
    const classes = useStyles();
    const [playing, setPlaying] = useState<number | null>(null);

    const isOnChainProject = (
      project: Project | IOffChainProject
    ): project is Project => projectType === EProjectType.OnChain;

    const pitches = isOnChainProject(project)
      ? ([
          project.investors_pitch,
          project.update_pitch,
          project.intro_pitch,
        ].filter(Boolean) as PitchType[])
      : ([
          project.pitches.find(findPitchByKey(EPitchType.Investment)),
          project.pitches.find(findPitchByKey(EPitchType.Update)),
          project.pitches.find(findPitchByKey(EPitchType.Intro)),
        ].filter(Boolean) as PitchType[]);

    if (!pitches.length) return null;

    const banner = getCorrectIPFSLinks({ banner: project.banner }).banner || '';

    return (
      <div className={classes.container}>
        <SectionTitle title={t('projectCabinetPage.pitches')} />
        <div className={classes.pitchesContainer}>
          {pitches.map((pitch, i, arr) => (
            <Pitch
              ind={arr.length - i}
              pitch={pitch}
              key={pitch?.name + i}
              isPlaying={playing === i}
              setIsPlaying={() => setPlaying((prev) => (prev === i ? null : i))}
              banner={banner}
              isOnChainProject={projectType === EProjectType.OnChain}
            />
          ))}
        </div>
      </div>
    );
  }
);
