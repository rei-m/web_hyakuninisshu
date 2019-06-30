import * as React from 'react';
import styled from '@src/styles/styled-components';
import Section from '@src/components/atoms/Section';
import Heading from '@src/components/atoms/Heading';

export interface Props {
  title: string;
}

const Container = styled(Section)`
  padding: ${({ theme }) => theme.spacingByPx(2)} 0;
  text-align: left;
`;

const UnderlineHeading = styled(Heading)`
  position: relative;
  padding-bottom: ${({ theme }) => theme.spacingByPx(1)};
  margin-bottom: ${({ theme }) => theme.spacingByPx(2)};
  &:after {
    content: '';
    width: 100%;
    border-bottom: 1px solid #a9a9a9;
    position: absolute;
    bottom: 0;
    left: 0;
  }
`;

const ReadingContent: React.FC<Props> = ({ title, children }) => (
  <Container
    heading={
      <UnderlineHeading level={2} visualLevel={1}>
        {title}
      </UnderlineHeading>
    }
  >
    {children}
  </Container>
);

export default ReadingContent;
