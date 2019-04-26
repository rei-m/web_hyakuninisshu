import * as React from 'react';
import styled from '@src/styles/styled-components';
import { useTatamiImage } from '@src/hooks/staticQueries/useTatamiImage';

export interface Props {
  tag?: React.ElementType;
  className?: string;
}

export interface PresenterProps {
  Tag: React.ElementType;
  bgImageUrl: string;
  className?: string;
}

export type ContainerProps = Props & { presenter: React.FC<PresenterProps> };

export const TatamiLayoutContainer: React.FC<ContainerProps> = ({ presenter, children, tag = 'div', className }) => {
  const url = useTatamiImage();
  const Tag = styled(tag)``;
  return presenter({ Tag, className, children, bgImageUrl: url });
};

export const TatamiLayoutPresenter: React.FC<PresenterProps> = ({ Tag, className, children, bgImageUrl }) => (
  <Tag className={className} style={{ backgroundImage: `url(${bgImageUrl})` }}>
    {children}
  </Tag>
);

const TatamiLayout: React.FC<Props> = props => <TatamiLayoutContainer presenter={TatamiLayoutPresenter} {...props} />;

export default TatamiLayout;
