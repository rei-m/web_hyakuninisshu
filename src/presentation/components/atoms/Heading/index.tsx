import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { FontSize, ThemeInterface } from '@src/presentation/styles/theme';

type Level = 1 | 2 | 3 | 4 | 5 | 6;

type HeadingElements = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
const HEADINGS: Array<HeadingElements> = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
const FONT_SIZE: Array<FontSize> = ['ll', 'l', 'm', 's', 'ss', 'sss'];

export type Props = {
  level?: Level;
  visualLevel?: Level;
  className?: string;
};

export type PresenterProps = {
  className?: string;
  Tag: HeadingElements;
};

export type ContainerProps = Props & { presenter: React.FC<PresenterProps> };

const useStyles = makeStyles<ThemeInterface, { size: FontSize }>(theme => ({
  root: {
    fontWeight: 700,
    margin: 0,
    fontSize: ({ size }) => theme.fontSize[size],
  },
}));

export const HeadingPresenter: React.FC<PresenterProps> = ({ Tag, className, children }) => (
  <Tag className={className}>{children}</Tag>
);

export const HeadingContainer: React.FC<ContainerProps> = ({
  presenter,
  children,
  level = 2,
  visualLevel,
  className = '',
}) => {
  const levelIndex = level - 1;
  const Tag = HEADINGS[levelIndex];
  const size = FONT_SIZE[visualLevel ? visualLevel - 1 : levelIndex];
  const classes = useStyles({ size });
  return presenter({ Tag, className: `${classes.root} ${className}`, children });
};

const Heading: React.FC<Props> = props => <HeadingContainer presenter={HeadingPresenter} {...props} />;

export default Heading;
