import * as React from 'react';
import { ThemedStyledFunction } from 'styled-components';
import makeStyles from '@material-ui/core/styles/makeStyles';
import styled from '@src/styles/styled-components';
import { FontSize, ThemeInterface } from '@src/styles/theme';

type Level = 1 | 2 | 3 | 4 | 5 | 6;

type HeadingElements = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
const HEADINGS: Array<HeadingElements> = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
const FONT_SIZE: Array<FontSize> = ['ll', 'l', 'm', 's', 'ss', 'sss'];

export interface Props {
  level?: Level;
  visualLevel?: Level;
  className?: string;
}

export interface PresenterProps {
  className?: string;
  Tag: React.FC<any>;
}

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
  const Tag = React.useMemo(() => {
    const levelIndex = level - 1;
    const creator: ThemedStyledFunction<React.ElementType<HeadingElements>, ThemeInterface> =
      styled[HEADINGS[levelIndex]];
    return creator({});
  }, []);
  const levelIndex = level - 1;
  const size = FONT_SIZE[visualLevel ? visualLevel - 1 : levelIndex];
  const classes = useStyles({ size });
  return presenter({ Tag, className: `${classes.root} ${className}`, children });
};

const Heading: React.FC<Props> = props => <HeadingContainer presenter={HeadingPresenter} {...props} />;

export default Heading;
