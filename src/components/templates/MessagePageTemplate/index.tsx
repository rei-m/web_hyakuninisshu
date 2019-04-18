import * as React from 'react';
import styled from '@src/styles/styled-components';
import Block from '@src/components/atoms/Block';

const Container = styled(Block)`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colorThin};
  flex-direction: column;
  box-sizing: border-box;
`;

const MessagePageTemplate: React.FC = ({ children }) => <Container>{children}</Container>;

export default MessagePageTemplate;
