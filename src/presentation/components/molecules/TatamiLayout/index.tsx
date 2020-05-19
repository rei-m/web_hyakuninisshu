import React from 'react';
import { useTatamiImage } from '@src/presentation/hooks/static-queries/useTatamiImage';

export type Props = {
  tag?: React.ElementType;
  className?: string;
};

export type PresenterProps = {
  Tag: React.ElementType;
  bgImageUrl: string;
  className?: string;
};

export type ContainerProps = Props & { presenter: React.FC<PresenterProps> };

export const TatamiLayoutContainer: React.FC<ContainerProps> = ({
  presenter,
  children,
  tag: Tag = 'div',
  className = '',
}) => {
  const url = useTatamiImage();
  return presenter({ Tag, className, children, bgImageUrl: url });
};

export const TatamiLayoutPresenter: React.FC<PresenterProps> = ({ Tag, className, children, bgImageUrl }) => (
  <Tag className={className} style={{ backgroundImage: `url(${bgImageUrl})` }}>
    {children}
  </Tag>
);

const TatamiLayout: React.FC<Props> = (props) => <TatamiLayoutContainer presenter={TatamiLayoutPresenter} {...props} />;

export default TatamiLayout;
