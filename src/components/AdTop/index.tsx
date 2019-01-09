import * as React from 'react';
import AdSense from 'react-adsense';
import styled from '@src/styles/styled-components';

const Container = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing1x} 0;
`;

const Dummy = styled.div`
  width: 320px;
  height: 100px;
  border: 1px solid #123;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  @media (min-width: 500px) {
    width: 468px;
    height: 60px;
  }
  @media (min-width: 800px) {
    width: 728px;
    height: 90px;
  }
`;

const AdTop: React.FC<{ style?: React.CSSProperties }> = ({ style }) =>
  process.env.NODE_ENV === 'production' ? (
    <Container style={style}>
      <style
        dangerouslySetInnerHTML={{
          __html: `
  .ad_top { width: 320px; height: 100px; }
  @media(min-width: 500px) { .ad_top { width: 468px; height: 60px; } }
  @media(min-width: 800px) { .ad_top { width: 728px; height: 90px; } }　        
`,
        }}
      />
      <AdSense.Google
        className="ad_top"
        client="ca-pub-4104372369598017"
        slot="9171068817"
        style={{ display: 'inline-block' }}
        format=""
        responsive=""
      />
    </Container>
  ) : (
    <Container style={style}>
      <Dummy>この欄は広告枠です</Dummy>
    </Container>
  );

export default AdTop;
