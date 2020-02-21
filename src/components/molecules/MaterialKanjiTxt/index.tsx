import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Paragraph, { Props as ParagraphProps } from '@src/components/atoms/Paragraph';
import { Karuta } from '@src/types';

export type Props = {
  karuta: Karuta;
  separate?: React.ReactNode;
} & Pick<ParagraphProps, 'size'>;

const useStyles = makeStyles({
  root: {
    textAlign: 'left',
  },
});

const MaterialKanjiTxt = ({ karuta, size, separate = <br /> }: Props) => {
  const classes = useStyles();
  return (
    <Paragraph size={size} className={classes.root}>
      {`${karuta.firstKanji} ${karuta.secondKanji} ${karuta.thirdKanji}`}
      {separate}
      {`${karuta.fourthKanji} ${karuta.fifthKanji}`}
    </Paragraph>
  );
};

export default MaterialKanjiTxt;
