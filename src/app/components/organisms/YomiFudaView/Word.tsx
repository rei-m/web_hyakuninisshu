import React from 'react';
import Fade from '@mui/material/Fade';
import Box from '@mui/material/Box';
import { SPACE } from './Phrase';

export type WordProps = {
  text: string;
  duration: number;
  onAnimationEnd: () => void;
};

const PureWord = ({ text, duration, onAnimationEnd }: WordProps) =>
  text === SPACE ? (
    <Box component={'span'} sx={{ display: 'inline-block' }}>
      {SPACE}
    </Box>
  ) : (
    <Fade in={true} timeout={duration} onEntered={onAnimationEnd}>
      <Box component={'span'} sx={{ display: 'inline-block' }}>
        {text}
      </Box>
    </Fade>
  );

export default React.memo(PureWord, (prevProps, nextProps) => prevProps.text === nextProps.text);
