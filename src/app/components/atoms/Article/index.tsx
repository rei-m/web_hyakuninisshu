import Box from '@mui/material/Box';

import type { HeadingProps } from '@/app/components/atoms/Heading';
import type { SxAppProps } from '@/theme';

export type ArticleProps = {
  children: React.ReactNode;
  heading: React.ReactElement<HeadingProps>;
  sx?: SxAppProps;
};

export const Article = ({ children, heading, sx }: ArticleProps) => (
  <Box component={'article'} sx={sx}>
    {heading}
    {children}
  </Box>
);
