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
  kimariji: {
    color: '#ff0000',
  },
});

const MaterialKanaTxt = ({ karuta, size, separate = <br /> }: Props) => {
  const { kimariji, shoku, niku, sanku } = karuta;
  const modKimariji = shoku.kana.length - kimariji;
  const classes = useStyles();
  return modKimariji >= 0 ? (
    <Paragraph size={size} className={classes.root}>
      <span className={classes.kimariji}>{shoku.kana.slice(0, kimariji)}</span>
      {modKimariji > 0
        ? `${shoku.kana.slice(kimariji - shoku.kana.length)} ${niku.kana} ${sanku.kana}`
        : ` ${niku.kana} ${sanku.kana}`}
      {separate}
      {`${karuta.shiku.kana} ${karuta.kekku.kana}`}
    </Paragraph>
  ) : (
    <Paragraph size={size} className={classes.root}>
      <span className={classes.kimariji}>{`${shoku.kana} ${niku.kana.slice(0, modKimariji * -1)}`}</span>
      {`${niku.kana.slice(modKimariji * -1)} ${sanku.kana}`}
      {separate}
      {`${karuta.shiku.kana} ${karuta.kekku.kana}`}
    </Paragraph>
  );
};

export default MaterialKanaTxt;
