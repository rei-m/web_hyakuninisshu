import * as React from 'react';
import styled from '@src/styles/styled-components';
import { appTheme } from '@src/styles/theme';

type Level = 1 | 2 | 3 | 4 | 5 | 6;

const fontStyles = [
  `font-size: ${appTheme.fontSizeLL};`,
  `font-size: ${appTheme.fontSizeL};`,
  `font-size: ${appTheme.fontSizeM};`,
  `font-size: ${appTheme.fontSizeS};`,
  `font-size: ${appTheme.fontSizeSS};`,
  `font-size: ${appTheme.fontSizeSSS};`,
].map(
  v => `
  font-weight: 700;
  margin: 0;
  ${v}
`
);

const Tags = [
  styled.h1<{ fontStyle: string }>`
    ${({ fontStyle }) => fontStyle}
  `,
  styled.h2<{ fontStyle: string }>`
    ${({ fontStyle }) => fontStyle}
  `,
  styled.h3<{ fontStyle: string }>`
    ${({ fontStyle }) => fontStyle}
  `,
  styled.h4<{ fontStyle: string }>`
    ${({ fontStyle }) => fontStyle}
  `,
  styled.h5<{ fontStyle: string }>`
    ${({ fontStyle }) => fontStyle}
  `,
  styled.h6<{ fontStyle: string }>`
    ${({ fontStyle }) => fontStyle}
  `,
];

export interface Props {
  level?: Level;
  visualLevel?: Level;
  className?: string;
}

export interface PresenterProps {
  className?: string;
  fontStyle: string;
  Tag: React.FC<Omit<PresenterProps, 'Tag'>>;
}

export type ContainerProps = Props & { presenter: React.FC<PresenterProps> };

export const HeadingPresenter: React.FC<PresenterProps> = ({ Tag, className, fontStyle, children }) => (
  <Tag fontStyle={fontStyle} className={className}>
    {children}
  </Tag>
);

export const HeadingContainer: React.FC<ContainerProps> = ({
  presenter,
  children,
  level = 2,
  visualLevel,
  className,
}) => {
  const levelIndex = level - 1;
  const visualLevelIndex = visualLevel ? visualLevel - 1 : levelIndex;
  const Tag = Tags[levelIndex];
  const fontStyle = fontStyles[visualLevelIndex];
  return presenter({ Tag, className, fontStyle, children });
};

const Heading: React.FC<Props> = props => <HeadingContainer presenter={HeadingPresenter} {...props} />;

export default Heading;
