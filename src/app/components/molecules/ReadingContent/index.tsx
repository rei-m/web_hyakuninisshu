import Box from '@mui/material/Box';
import Heading from '@/app/components/atoms/Heading';

export type ReadingContentProps = {
  children: React.ReactNode;
  title: string;
};

const ReadingContent = ({ title, children }: ReadingContentProps) => (
  <Box component={'section'} sx={{ py: 2, textAlign: 'left' }}>
    <Heading
      level={2}
      visualLevel={1}
      sx={{
        position: 'relative',
        pb: 1,
        mb: 2,
        '&:after': {
          content: '""',
          width: '100%',
          borderBottom: '1px solid #a9a9a9',
          position: 'absolute',
          bottom: 0,
          left: 0,
        },
      }}
    >
      {title}
    </Heading>
    {children}
  </Box>
);

export default ReadingContent;
