import { useStyles } from './styles';

interface ISectionTitleProps {
  title: string;
}

export const SectionTitle: React.FC<ISectionTitleProps> = ({ title }) => {
  const classes = useStyles();

  return (
    <div className={classes.titleWrapper}>
      <h3 className={classes.title}>{`/ ${title}`}</h3>
      <div className={classes.titleSplitter} />
    </div>
  );
};
