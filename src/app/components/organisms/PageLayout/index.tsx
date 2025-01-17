import Box from '@mui/material/Box';
import { Header } from '@/app/components/organisms/Header';
import { Navigation } from '@/app/components/organisms/Navigation';
import { MenuType } from '@/app/components/molecules/NavigationItem';
import { HEIGHT_BOTTOM_NAV, HEIGHT_HEADER, HEIGHT_HEADER_WIDE, WIDTH_SIDE_NAV } from '@/theme';

export type PageLayoutProps = {
  children: React.ReactNode;
  title: string;
  currentMenuType?: MenuType;
  isDisplayNav: boolean;
  isDisplaySearch?: boolean;
  backUrl?: string;
};

export const PageLayout = ({
  title,
  children,
  backUrl,
  isDisplayNav,
  isDisplaySearch,
  currentMenuType,
}: PageLayoutProps) => (
  <>
    <Header title={title} backUrl={backUrl} isDisplaySearch={isDisplaySearch} />
    <Box
      component={'main'}
      sx={{
        paddingTop: HEIGHT_HEADER,
        paddingBottom: isDisplayNav ? HEIGHT_BOTTOM_NAV : 0,
        minHeight: '100vh',
        backgroundColor: '#fffff0',
        '@media screen and (min-width:600px)': {
          paddingTop: HEIGHT_HEADER_WIDE,
          paddingBottom: 0,
          paddingLeft: isDisplayNav ? WIDTH_SIDE_NAV : 0,
        },
      }}
    >
      {children}
    </Box>
    {isDisplayNav && (
      <Navigation
        currentMenuType={currentMenuType}
        sx={{
          position: 'fixed',
          bottom: 0,
          display: 'flex',
          flexDirection: 'row',
          height: HEIGHT_BOTTOM_NAV,
          width: '100vw',
          zIndex: 2,
          '@media screen and (min-width:600px)': {
            flexDirection: 'column',
            height: '100vh',
            width: WIDTH_SIDE_NAV,
            paddingTop: HEIGHT_HEADER_WIDE,
          },
        }}
      />
    )}
  </>
);
