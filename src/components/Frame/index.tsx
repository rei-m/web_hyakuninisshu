import * as React from 'react';
import styled from 'styled-components';
import Header from '../Header';

export const Body = styled.div`
  padding-top: 64px;
  text-align: center;
`;

const Frame: React.StatelessComponent<
  React.ClassAttributes<HTMLDivElement>
> = ({ children }) => (
  <div>
    <Header />
    <Body>{children}</Body>
  </div>
);

export default Frame;
