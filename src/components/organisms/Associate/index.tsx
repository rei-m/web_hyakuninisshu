import React from 'react';
import styled from '@src/styles/styled-components';
import Block from '@src/components/atoms/Block';

export interface Props {
  style?: React.CSSProperties;
}

const Container = styled(Block)`
  text-align: center;
  width: 100%;
  padding: ${({ theme }) => theme.spacingByPx(2)};
  display: flex;
  justify-content: center;
  flex-flow: wrap;
`;

const DummyResponsive = styled(Block)`
  height: 100px;
  border: 1px solid #123;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BannerWrapper = styled('div')`
  @media screen and (max-width: ${({ theme }) => theme.minWidthWide}) {
    display: none;
  }
`;

const BannerWrapperSD = styled('div')`
  @media screen and (min-width: ${({ theme }) => theme.minWidthWide}) {
    display: none;
  }
`;

export const AssociateProduction = ({ style }: Props) => {
  return (
    <Container style={style}>
      <BannerWrapper>
        <iframe
          src="https://rcm-fe.amazon-adsystem.com/e/cm?o=9&p=48&l=ur1&category=cybermonday19&banner=0DRGH9D7WGWDK69PJ9R2&f=ifr&linkID=f5d581449bb5c514e812b3f325cafc34&t=rei2911-22&tracking_id=rei2911-22"
          width="728"
          height="90"
          scrolling="no"
          marginWidth={0}
          style={{ border: 'none' }}
          frameBorder={0}
        ></iframe>
      </BannerWrapper>
      <BannerWrapperSD>
        <iframe
          src="https://rcm-fe.amazon-adsystem.com/e/cm?o=9&p=12&l=ur1&category=cybermonday19&banner=0X1X7W23NSQSTFGW4YR2&f=ifr&linkID=9224001a294f07879ffa141bf83f6d1e&t=rei2911-22&tracking_id=rei2911-22"
          width="300"
          height="250"
          scrolling="no"
          marginWidth={0}
          style={{ border: 'none' }}
          frameBorder={0}
        ></iframe>
      </BannerWrapperSD>
    </Container>
    // <Container style={style}>
    //   <iframe
    //     style={{ width: 120, height: 240, marginRight: 8 }}
    //     marginWidth={0}
    //     marginHeight={0}
    //     scrolling="no"
    //     frameBorder="0"
    //     src="https://rcm-fe.amazon-adsystem.com/e/cm?ref=tf_til&t=rei2911-22&m=amazon&o=9&p=8&l=as1&IS1=1&detail=1&asins=B07VXNW2D6&linkId=ee51300f1b14156bc7871fa679cb5ac1&bc1=ffffff&lt1=_top&fc1=333333&lc1=0066c0&bg1=ffffff&f=ifr"
    //   ></iframe>
    //   <iframe
    //     style={{ width: 120, height: 240, marginRight: 8 }}
    //     marginWidth={0}
    //     marginHeight={0}
    //     scrolling="no"
    //     frameBorder="0"
    //     src="https://rcm-fe.amazon-adsystem.com/e/cm?ref=tf_til&t=rei2911-22&m=amazon&o=9&p=8&l=as1&IS1=1&detail=1&asins=B07VZW8FZT&linkId=4a70aa1b2818d5f59ca197dd387e74ce&bc1=ffffff&lt1=_top&fc1=333333&lc1=0066c0&bg1=ffffff&f=ifr"
    //   ></iframe>
    //   <iframe
    //     style={{ width: 120, height: 240, marginRight: 8 }}
    //     marginWidth={0}
    //     marginHeight={0}
    //     scrolling="no"
    //     frameBorder="0"
    //     src="https://rcm-fe.amazon-adsystem.com/e/cm?ref=tf_til&t=rei2911-22&m=amazon&o=9&p=8&l=as1&IS1=1&detail=1&asins=B000CNF0AA&linkId=1a6577cd124271bd692964273df758ed&bc1=ffffff&lt1=_top&fc1=333333&lc1=0066c0&bg1=ffffff&f=ifr"
    //   ></iframe>
    //   <iframe
    //     style={{ width: 120, height: 240, marginRight: 8 }}
    //     marginWidth={0}
    //     marginHeight={0}
    //     scrolling="no"
    //     frameBorder="0"
    //     src="https://rcm-fe.amazon-adsystem.com/e/cm?ref=tf_til&t=rei2911-22&m=amazon&o=9&p=8&l=as1&IS1=1&detail=1&asins=B001CIO49M&linkId=13f1db2028eeca92c7fd6c384234a159&bc1=ffffff&lt1=_top&fc1=333333&lc1=0066c0&bg1=ffffff&f=ifr"
    //   ></iframe>
    //   <iframe
    //     style={{ width: 120, height: 240, marginRight: 8 }}
    //     marginWidth={0}
    //     marginHeight={0}
    //     scrolling="no"
    //     frameBorder="0"
    //     src="https://rcm-fe.amazon-adsystem.com/e/cm?ref=tf_til&t=rei2911-22&m=amazon&o=9&p=8&l=as1&IS1=1&detail=1&asins=B001FB5AQW&linkId=b0add7f11a4f96282c33abc81f6d3765&bc1=ffffff&lt1=_top&fc1=333333&lc1=0066c0&bg1=ffffff&f=ifr"
    //   ></iframe>
    // </Container>
  );
};
export const AssociateDummy = ({ style }: Props) => (
  <Container style={style}>
    <DummyResponsive>この欄はアフィリエイト枠です</DummyResponsive>
  </Container>
);

const Associate = process.env.NODE_ENV === 'production' ? AssociateProduction : AssociateDummy;

export default Associate;
