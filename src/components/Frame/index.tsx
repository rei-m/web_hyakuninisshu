import * as React from 'react';
import styled from 'styled-components';
import Header from '../Header';
import Navigation from '../Navigation';

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
    <Navigation />
  </div>
);

export default Frame;
