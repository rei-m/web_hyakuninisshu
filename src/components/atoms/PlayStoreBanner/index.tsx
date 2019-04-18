import * as React from 'react';

export interface Props {
  size?: number;
}

const PLAY_STORE_URL =
  'https://play.google.com/store/apps/details?id=me.rei_m.hyakuninisshu&hl=ja&pcampaignid=MKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1';

const PlayStoreBanner = ({ size = 200 }: Props) => (
  <a href={PLAY_STORE_URL}>
    <img
      alt={`Google Play で手に入れよう`}
      src={`https://play.google.com/intl/en_us/badges/images/generic/ja_badge_web_generic.png`}
      style={{ width: size }}
    />
  </a>
);

export default PlayStoreBanner;
