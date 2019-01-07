import * as React from 'react';
import AdSense from 'react-adsense';
import styled from '@src/styles/styled-components';

const Container = styled.div`
  padding: ${({ theme }) => theme.spacing2x};
`;

const Dummy = styled.div`
  height: 100px;
  border: 1px solid #123;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AdBanner: React.FC<{}> = () =>
  process.env.NODE_ENV === 'production' ? (
    <Container>
      <AdSense.Google
        client="ca-pub-4104372369598017"
        slot="9171068817"
        style={{ display: 'block' }}
        format="auto"
        responsive="true"
      />
    </Container>
  ) : (
    <Container>
      <Dummy>この欄は広告枠です</Dummy>
    </Container>
  );

export default AdBanner;
