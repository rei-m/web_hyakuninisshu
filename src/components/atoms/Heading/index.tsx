import type { SxAppProps } from '@/styles/theme';

import Typography from '@mui/material/Typography';

type Level = 1 | 2 | 3 | 4 | 5 | 6;

const HEADINGS = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] as const;
const FONT_SIZE = ['2rem', '1.8rem', '1.6rem', '1.4rem', '1.2rem', '1rem'] as const;

export type HeadingProps = {
  children: React.ReactNode;
  level?: Level;
  visualLevel?: Level;
  sx?: SxAppProps;
};

const Heading = ({ children, level = 2, visualLevel, sx }: HeadingProps) => {
  const levelIndex = level - 1;
  const fontSize = FONT_SIZE[visualLevel ? visualLevel - 1 : levelIndex];
  return (
    <Typography
      variant={HEADINGS[levelIndex]}
      sx={[{ fontWeight: 700, m: 0, fontSize }, ...(Array.isArray(sx) ? sx : [sx])]}
    >
      {children}
    </Typography>
  );
};

export default Heading;
