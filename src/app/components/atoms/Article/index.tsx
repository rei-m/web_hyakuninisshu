import type { HeadingProps } from '@/app/components/atoms/Heading';
import type { SxAppProps } from '@/theme';

import Box from '@mui/material/Box';

export type ArticleProps = {
  children: React.ReactNode;
  heading: React.ReactElement<HeadingProps>;
  sx?: SxAppProps;
};

const Article = ({ children, heading, sx }: ArticleProps) => (
  <Box component={'article'} sx={sx}>
    {heading}
    {children}
  </Box>
);

export default Article;
