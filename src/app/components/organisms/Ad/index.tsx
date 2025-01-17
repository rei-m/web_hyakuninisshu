'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import type { SxAppProps } from '@/theme';

export type AdProps = {
  type: 'fixed' | 'responsive';
  sx?: SxAppProps;
};

export const AdProduction = ({ type, sx }: AdProps) => {
  const pathname = usePathname();
  useEffect(() => {
    try {
      if (window) (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (error) {
      console.error(error);
    }
  }, [pathname]);

  return (
    <Box
      key={pathname}
      sx={[
        { display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', p: 2 },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {type === 'fixed' ? (
        <ins
          className={`adsbygoogle`}
          style={{ display: 'inline-block', width: '300px', height: '100px' }}
          data-ad-client={'ca-pub-4104372369598017'}
          data-ad-slot={'4803649438'}
        ></ins>
      ) : (
        <ins
          className={`adsbygoogle`}
          style={{ display: 'block', minWidth: '100%' }}
          data-ad-client={'ca-pub-4104372369598017'}
          data-ad-slot={'9171068817'}
          data-ad-format="auto"
          data-full-width-responsive={'true'}
        ></ins>
      )}
    </Box>
  );
};

export const AdDummy = ({ type, sx }: AdProps) => {
  const pathname = usePathname();

  useEffect(() => {
    try {
      if (window) (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (error) {
      console.error(error);
    }
  }, [pathname]);

  return (
    <Box
      key={pathname}
      sx={[
        { display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', p: 2 },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {type === 'fixed' ? (
        <Typography
          sx={{
            height: 100,
            width: 300,
            border: '1px solid #123',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          この欄は広告枠です
        </Typography>
      ) : (
        <Typography
          sx={{
            height: 100,
            width: '100%',
            border: '1px solid #123',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          この欄は広告枠です
        </Typography>
      )}
    </Box>
  );
};

const Ad = process.env.NODE_ENV === 'production' ? AdProduction : AdDummy;

export default Ad;
