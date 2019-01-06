import * as React from 'react';
import AdSense from 'react-adsense';
import styled from '@src/styles/styled-components';

const Container = styled.div`
  padding: ${({ theme }) => theme.spacing2x};
`;

const AdBanner: React.FC<{}> = () => (
  <Container>
    <AdSense.Google
      client="ca-pub-4104372369598017"
      slot="9171068817"
      style={{ display: 'block' }}
      format="auto"
      responsive="true"
    />
  </Container>
);

export default AdBanner;
