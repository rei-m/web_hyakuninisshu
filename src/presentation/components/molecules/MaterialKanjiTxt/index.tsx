import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Paragraph, { Props as ParagraphProps } from '@src/presentation/components/atoms/Paragraph';
import { Karuta } from '@src/domain/models';

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
      {`${karuta.shoku.kanji} ${karuta.niku.kanji} ${karuta.sanku.kanji}`}
      {separate}
      {`${karuta.shiku.kanji} ${karuta.kekku.kanji}`}
    </Paragraph>
  );
};

export default MaterialKanjiTxt;
