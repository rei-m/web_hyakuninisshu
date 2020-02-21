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
  kimariji: {
    color: '#ff0000',
  },
});

const MaterialKanaTxt = ({ karuta, size, separate = <br /> }: Props) => {
  const { kimariji, firstKana, secondKana, thirdKana } = karuta;
  const modKimariji = firstKana.length - kimariji;
  const classes = useStyles();
  return modKimariji >= 0 ? (
    <Paragraph size={size} className={classes.root}>
      <span className={classes.kimariji}>{firstKana.slice(0, kimariji)}</span>
      {modKimariji > 0
        ? `${firstKana.slice(kimariji - firstKana.length)} ${secondKana} ${thirdKana}`
        : ` ${secondKana} ${thirdKana}`}
      {separate}
      {`${karuta.fourthKana} ${karuta.fifthKana}`}
    </Paragraph>
  ) : (
    <Paragraph size={size} className={classes.root}>
      <span className={classes.kimariji}>{`${firstKana} ${secondKana.slice(0, modKimariji * -1)}`}</span>
      {`${secondKana.slice(modKimariji * -1)} ${thirdKana}`}
      {separate}
      {`${karuta.fourthKana} ${karuta.fifthKana}`}
    </Paragraph>
  );
};

export default MaterialKanaTxt;
