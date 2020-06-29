import React from 'react';

export type Props = {
  size?: number;
};

const PLAY_STORE_URL =
  'https://play.google.com/store/apps/developer?id=Rei+Matsushita&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1';

const PlayStoreBanner = ({ size = 200 }: Props) => (
  <a href={PLAY_STORE_URL}>
    <img
      alt={`Google Play で手に入れよう`}
      src={`https://play.google.com/intl/ja/badges/static/images/badges/ja_badge_web_generic.png`}
      style={{ width: size }}
    />
  </a>
);

export default PlayStoreBanner;
