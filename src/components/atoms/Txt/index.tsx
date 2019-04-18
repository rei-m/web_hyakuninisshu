import * as React from 'react';
import styled from '@src/styles/styled-components';
import { appTheme } from '@src/styles/theme';

type TextSize = 'sss' | 'ss' | 's' | 'm' | 'l' | 'll';
type Role = 'default' | 'error';

export interface Props {
  tag?: React.ElementType;
  size?: TextSize;
  role?: Role;
  className?: string;
  style?: React.CSSProperties;
}

export interface PresenterProps {
  size?: TextSize;
  role?: Role;
  className?: string;
  style?: React.CSSProperties;
  Tag: React.ElementType;
}

export type ContainerProps = Props & { presenter: React.FC<PresenterProps> };

export const textSizeMap = {
  sss: appTheme.fontSizeSSS,
  ss: appTheme.fontSizeSS,
  s: appTheme.fontSizeS,
  m: appTheme.fontSizeM,
  l: appTheme.fontSizeL,
  ll: appTheme.fontSizeLL,
};

const colorMap = {
  default: appTheme.fontColorDefault,
  error: appTheme.fontColorError,
};

const propsToStyle = (props: Pick<Props, 'size' | 'role'>) => {
  const base = {
    fontSize: props.size ? textSizeMap[props.size] : textSizeMap.m,
  };
  if (props.role) {
    return {
      ...base,
      color: colorMap[props.role],
    };
  }
  return base;
};

export const TxtPresenter: React.FC<PresenterProps> = ({ Tag, size, role, className, style, children }) => (
  <Tag size={size} role={role} className={className} style={style}>
    {children}
  </Tag>
);

export const TxtContainer: React.FC<ContainerProps> = ({
  presenter,
  tag = 'span',
  size,
  role,
  className,
  style,
  children,
}) => {
  const Tag = React.useMemo(() => styled(tag)(propsToStyle), []);
  return presenter({ Tag, size, role, className, style, children });
};

const Txt: React.FC<Props> = props => <TxtContainer presenter={TxtPresenter} {...props} />;

export default Txt;
