/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';
import Box from '@mui/material/Box';

export type PlayStoreBannerProps = {
  type?: 'normal' | 'reader';
};

const ASSETS = {
  normal: {
    appName: '百人一首 簡単に暗記',
    iconSrc: '/logo/android-app-icon.png',
    storeUrl:
      'https://play.google.com/store/apps/details?id=me.rei_m.hyakuninisshu&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1',
  },
  reader: {
    appName: '百人一首 読み上げで暗記',
    iconSrc: '/logo/android-app-reader-icon.png',
    storeUrl:
      'https://play.google.com/store/apps/details?id=net.hyakuninanki.reader&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1',
  },
} as const;

export const PlayStoreBanner = ({ type = 'normal' }: PlayStoreBannerProps) => (
  <Box sx={{ width: 140, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'start' }}>
    <a href={ASSETS[type].storeUrl} target="_blank" rel="noreferrer">
      <Image
        src={ASSETS[type].iconSrc}
        alt={ASSETS[type].appName}
        width={100}
        height={100}
        priority
        style={{ borderRadius: 16 }}
      />
    </a>
    <a href={ASSETS[type].storeUrl} style={{ display: 'inline-block' }}>
      <img src="/logo/google-play-badge.png" alt="Google Play で手に入れよう" height={50} />
    </a>
  </Box>
);
