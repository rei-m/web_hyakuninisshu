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
`;

const DummyResponsive = styled(Block)`
  height: 100px;
  border: 1px solid #123;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const AssociateProduction = ({ style }: Props) => (
  <Container style={style}>
    <>
      <script
        type="text/javascript"
        dangerouslySetInnerHTML={{
          __html: `
            amzn_assoc_ad_type ="responsive_search_widget"; amzn_assoc_tracking_id ="rei2911-22"; amzn_assoc_marketplace
            ="amazon"; amzn_assoc_region ="JP"; amzn_assoc_placement =""; amzn_assoc_search_type =
            "search_widget";amzn_assoc_width ="auto"; amzn_assoc_height ="auto"; amzn_assoc_default_search_category ="";
            amzn_assoc_default_search_key ="百人一首";amzn_assoc_theme ="light"; amzn_assoc_bg_color ="FFFFFF";
`,
        }}
      />
      <script src="//z-fe.amazon-adsystem.com/widgets/q?ServiceVersion=20070822&Operation=GetScript&ID=OneJS&WS=1&Marketplace=JP"></script>
    </>
  </Container>
);

export const AssociateDummy = ({ style }: Props) => (
  <Container style={style}>
    <DummyResponsive>この欄はアフィリエイト枠です</DummyResponsive>
  </Container>
);

const Associate = process.env.NODE_ENV === 'production' ? AssociateProduction : AssociateDummy;

export default Associate;
