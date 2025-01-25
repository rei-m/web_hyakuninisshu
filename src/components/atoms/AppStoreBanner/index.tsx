/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';
import Box from '@mui/material/Box';

export type AppStoreBannerProps = {
  type?: 'normal' | 'reader';
};

const ASSETS = {
  normal: {
    appName: '百人一首 簡単に暗記',
    iconSrc: '/logo/ios-app-icon.png',
    storeUrl: 'https://apple.co/3BTApF8',
  },
  reader: {
    appName: '百人一首 読み上げで暗記',
    iconSrc: '/logo/ios-app-reader-icon.png',
    storeUrl: 'https://apple.co/4jcavNG',
  },
} as const;

const AppStoreBanner = ({ type = 'normal' }: AppStoreBannerProps) => (
  <Box sx={{ width: 140, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'start' }}>
    <a href={ASSETS[type].storeUrl} target="_blank" rel="noreferrer">
      <Image src={ASSETS[type].iconSrc} alt={ASSETS[type].appName} width={100} height={100} priority />
    </a>
    <a href={ASSETS[type].storeUrl} style={{ display: 'inline-block', marginTop: 6 }}>
      <img
        src="/logo/ios-download-black.svg"
        alt="App Storeでダウンロード"
        height={40}
        style={{ verticalAlign: 'middle', objectFit: 'contain' }}
      />
    </a>
  </Box>
);

export default AppStoreBanner;
