import Link from 'next/link';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import type { SvgIconProps } from '@mui/material/SvgIcon';
import type { SxAppProps } from '@/styles/theme';

export type MenuLinkProps = {
  href: string;
  icon: React.ReactElement<SvgIconProps>;
  name: string;
  description: string;
  sx?: SxAppProps;
};

const MenuLink = ({ href, icon, name, description, sx }: MenuLinkProps) => (
  <Button
    variant="outlined"
    size="large"
    component={Link}
    href={href}
    sx={[
      {
        border: '1px solid #00000030',
        backgroundColor: 'common.white',
        borderRadius: 2,
        boxSizing: 'border-box',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        padding: 2,
        '&:hover': {
          textDecoration: 'none',
          borderRadius: 2,
          backgroundColor: '#f5f5f5',
        },
      },
      ...(Array.isArray(sx) ? sx : [sx]),
    ]}
  >
    <Box
      component={'span'}
      sx={{
        width: 32,
        height: 32,
        border: '2px solid #f1b400',
        borderRadius: '50%',
        color: '#f1b400',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
        position: 'absolute',
        top: 8,
        left: 8,
        zIndex: 1,
        '& svg': {
          fontSize: '1.4rem',
        },
        '@media screen and (min-width: 600px)': {
          width: 124,
          height: 124,
          borderWidth: 4,
          position: 'initial',
          fontSize: '6rem',
          margin: '0 auto',
          '& svg': {
            fontSize: '6rem',
          },
        },
      }}
    >
      {icon}
    </Box>
    <Typography
      component={`span`}
      sx={{
        margin: 1,
        color: '#106ba3',
        position: 'relative',
        display: 'block',
        width: '100%',
        fontSize: '2rem',
        '&:after': {
          content: '""',
          width: '100%',
          borderBottom: '4px double #a9a9a9',
          position: 'absolute',
          bottom: '-8px',
          left: 0,
        },
      }}
    >
      {name}
    </Typography>
    <Typography
      sx={{
        marginTop: 2,
        color: '#106ba3',
        textAlign: 'left',
      }}
    >
      {description}
    </Typography>
  </Button>
);

export default MenuLink;
