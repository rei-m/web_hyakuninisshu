import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { FontSize, ThemeInterface } from '@src/presentation/styles/theme';

type Role = 'default' | 'error';

export type Props = {
  tag?: React.ElementType;
  size?: FontSize;
  role?: Role;
  className?: string;
};

export type PresenterProps = {
  className?: string;
  Tag: React.ElementType;
};

export type ContainerProps = Props & { presenter: React.FC<PresenterProps> };

const useStyles = makeStyles<ThemeInterface, { size: FontSize; role: Role }>((theme) => ({
  root: {
    fontSize: ({ size }) => theme.fontSize[size],
    color: ({ role }) => theme.fontColor[role],
  },
}));

export const TxtPresenter: React.FC<PresenterProps> = ({ Tag, className, children }) => (
  <Tag className={className}>{children}</Tag>
);

export const TxtContainer: React.FC<ContainerProps> = ({
  presenter,
  tag: Tag = 'span',
  size = 'm',
  role = 'default',
  className = '',
  children,
}) => {
  const classes = useStyles({ size, role });
  return presenter({ Tag, className: `${classes.root} ${className}`, children });
};

const Txt: React.FC<Props> = (props) => <TxtContainer presenter={TxtPresenter} {...props} />;

export default Txt;
