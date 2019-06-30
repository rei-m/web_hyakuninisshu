import * as React from 'react';
import AdSense from 'react-adsense';
import styled from '@src/styles/styled-components';
import Block from '@src/components/atoms/Block';

export interface Props {
  type: 'top' | 'responsive';
  style?: React.CSSProperties;
}

const Container = styled(Block)`
  text-align: center;
  width: 100%;
  padding: ${({ theme }) => theme.spacingByPx(2)};
`;

const DummyTop = styled(Block)`
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

const DummyResponsive = styled(Block)`
  height: 100px;
  border: 1px solid #123;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AdProperty = {
  client: 'ca-pub-4104372369598017',
  slot: '9171068817',
};

export const AdProduction = ({ type, style }: Props) => (
  <Container style={style}>
    {type === 'top' ? (
      <>
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
          {...AdProperty}
          className={`ad_top`}
          style={{ display: 'inline-block' }}
          format={``}
          responsive={``}
        />
      </>
    ) : (
      <AdSense.Google {...AdProperty} style={{ display: 'block' }} format={`auto`} responsive={`true`} />
    )}
  </Container>
);

export const AdDummy = ({ type, style }: Props) => (
  <Container style={style}>
    {type === 'top' ? <DummyTop>この欄は広告枠です</DummyTop> : <DummyResponsive>この欄は広告枠です</DummyResponsive>}
  </Container>
);

const Ad = process.env.NODE_ENV === 'production' ? AdProduction : AdDummy;

export default Ad;
