import type { MenuType } from '@/components/molecules/NavigationItem';

import Box from '@mui/material/Box';
import Header from '@/components/organisms/Header';
import Navigation from '@/components/organisms/Navigation';
import { HEIGHT_BOTTOM_NAV, HEIGHT_HEADER, HEIGHT_HEADER_WIDE, WIDTH_SIDE_NAV } from '@/styles/constants';

export type PageLayoutProps = {
  children: React.ReactNode;
  title: string;
  currentMenuType?: MenuType;
  isDisplayNav: boolean;
  isDisplaySearch?: boolean;
  backUrl?: string;
};

const PageLayout = ({ title, children, backUrl, isDisplayNav, isDisplaySearch, currentMenuType }: PageLayoutProps) => (
  <>
    <Header title={title} backUrl={backUrl} isDisplaySearch={isDisplaySearch} />
    <Box
      component={'main'}
      sx={{
        pt: {
          xs: HEIGHT_HEADER,
          sm: HEIGHT_HEADER_WIDE,
        },
        pb: {
          xs: isDisplayNav ? HEIGHT_BOTTOM_NAV : 0,
          sm: 0,
        },
        pl: {
          sm: isDisplayNav ? WIDTH_SIDE_NAV : 0,
        },
        minHeight: '100vh',
      }}
    >
      {children}
    </Box>
    {isDisplayNav && (
      <Navigation
        currentMenuType={currentMenuType}
        sx={{
          zIndex: 2,
          position: 'fixed',
          bottom: 0,
          display: 'flex',
          flexDirection: {
            xs: 'row',
            sm: 'column',
          },
          height: {
            xs: HEIGHT_BOTTOM_NAV,
            sm: '100vh',
          },
          width: {
            xs: '100vw',
            sm: WIDTH_SIDE_NAV,
          },
          pt: {
            sm: HEIGHT_HEADER_WIDE,
          },
        }}
      />
    )}
  </>
);

export default PageLayout;
