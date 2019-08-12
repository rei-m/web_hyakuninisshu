import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import styled from '@src/styles/styled-components';
import { FontSize, ThemeInterface } from '@src/styles/theme';

type Role = 'default' | 'error';

export interface Props {
  tag?: React.ElementType;
  size?: FontSize;
  role?: Role;
  className?: string;
  style?: React.CSSProperties;
}

export interface PresenterProps {
  className?: string;
  style?: React.CSSProperties;
  Tag: React.ElementType;
}

export type ContainerProps = Props & { presenter: React.FC<PresenterProps> };

const useStyles = makeStyles<ThemeInterface, { size: FontSize; role: Role }>(theme => ({
  root: {
    fontSize: ({ size }) => theme.fontSize[size],
    color: ({ role }) => theme.fontColor[role],
  },
}));

export const TxtPresenter: React.FC<PresenterProps> = ({ Tag, className, style, children }) => (
  <Tag className={className} style={style}>
    {children}
  </Tag>
);

export const TxtContainer: React.FC<ContainerProps> = ({
  presenter,
  tag = 'span',
  size = 'm',
  role = 'default',
  className = '',
  style,
  children,
}) => {
  const Tag = React.useMemo(() => styled(tag)({}), []);
  const classes = useStyles({ size, role });
  return presenter({ Tag, className: `${classes.root} ${className}`, style, children });
};

const Txt: React.FC<Props> = props => <TxtContainer presenter={TxtPresenter} {...props} />;

export default Txt;
