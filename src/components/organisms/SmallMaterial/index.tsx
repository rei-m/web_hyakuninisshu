import React, { useCallback } from 'react';
import clsx from 'clsx';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Block from '@src/components/atoms/Block';
import Txt from '@src/components/atoms/Txt';
import KarutaNo from '@src/components/atoms/KarutaNo';
import KarutaImage from '@src/components/molecules/KarutaImage';
import MaterialKanjiTxt from '@src/components/molecules/MaterialKanjiTxt';
import { Karuta } from '@src/types';
import { ThemeInterface } from '@src/styles/theme';

export type Props = {
  karuta: Karuta;
  image?: boolean;
  separate?: React.ReactNode;
  className?: string;
  onClick?: (karutaNo: number) => void;
};

const useStyles = makeStyles<ThemeInterface>(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    backgroundColor: theme.palette.common.white,
  },
  imageColumn: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    marginRight: 8,
  },
  textColumn: {
    flexGrow: 1,
    textAlign: 'left',
    boxSizing: 'border-box',
  },
  karutaImage: {
    width: 40,
    marginTop: theme.spacing(0.5),
  },
  creator: {
    display: 'inline-block',
    width: '100%',
    textAlign: 'right',
    paddingTop: theme.spacing(1),
  },
}));

export const SmallMaterial = ({ karuta, image = true, separate = <br />, className = '', onClick }: Props) => {
  const handleOnClick = useCallback(() => {
    if (onClick) {
      onClick(karuta.no);
    }
  }, []);

  const classes = useStyles();

  return (
    <Block onClick={handleOnClick} className={clsx(classes.root, className)}>
      {image && (
        <Block className={classes.imageColumn}>
          <KarutaNo karutaNo={karuta.no} size={`sss`} />
          <KarutaImage karutaNo={karuta.no} className={classes.karutaImage} />
        </Block>
      )}
      <Block className={classes.textColumn}>
        {!image && <KarutaNo karutaNo={karuta.no} size={`sss`} />}
        <MaterialKanjiTxt karuta={karuta} size={`s`} separate={separate} />
        <Txt tag={`span`} size={`s`} className={classes.creator}>
          {karuta.creator}
        </Txt>
      </Block>
    </Block>
  );
};

export default React.memo(SmallMaterial, (prevProps, nextProps) => prevProps.karuta.no === nextProps.karuta.no);
