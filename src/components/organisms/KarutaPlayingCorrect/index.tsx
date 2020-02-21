import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Block from '@src/components/atoms/Block';
import Button from '@src/components/atoms/Button';
import KarutaNo from '@src/components/atoms/KarutaNo';
import Kimariji from '@src/components/atoms/Kimariji';
import Fuda from '@src/components/molecules/Fuda';
import { ArrowForwardButton } from '@src/components/molecules/IconLabelButton';
import ClosableDialog from '@src/components/molecules/ClosableDialog';
import Material from '@src/components/organisms/Material';
import { Karuta } from '@src/types';
import { useBool } from '@src/hooks/useBool';
import { ThemeInterface } from '@src/styles/theme';

export type Props = {
  karuta: Karuta;
  isAllAnswered: boolean;
  onClickGoToNext: () => void;
  onClickGoToResult: () => void;
};

const useStyles = makeStyles<ThemeInterface>(theme => ({
  header: {
    position: 'relative',
    margin: 'auto',
    width: 160,
  },
  headerLabel: {
    margin: '0 auto',
    padding: theme.spacing(1, 2),
    border: '1px solid #d3d3d3',
    fontSize: theme.fontSize.s,
    backgroundColor: theme.palette.common.white,
  },
  materialButton: {
    fontSize: `${theme.fontSize.m} !important`,
    padding: '0 !important',
    height: '33px !important',
    width: '33px !important',
    minHeight: '33px !important',
    minWidth: '33px !important',
    position: 'absolute',
    top: 0,
    right: -48,
    boxShadow: theme.elevationShadow1x,
  },
  fuda: {
    boxShadow: theme.elevationShadow1x,
    margin: theme.spacing(2),
  },
  arrowButton: {
    marginTop: theme.spacing(2),
    boxShadow: theme.elevationShadow1x,
  },
}));

const KarutaPlayingCorrect = ({ karuta, isAllAnswered, onClickGoToNext, onClickGoToResult }: Props) => {
  const [opened, openDialog, closeDialog] = useBool(false);
  const classes = useStyles();
  return (
    <Block>
      <Block className={classes.header}>
        <Block className={classes.headerLabel}>
          <KarutaNo karutaNo={karuta.no} size={`ss`} /> / <Kimariji kimariji={karuta.kimariji} size={`ss`} />
        </Block>
        <Button onClick={openDialog} className={classes.materialButton} data-test={`open-detail`}>
          資
        </Button>
      </Block>
      <Fuda karuta={karuta} className={classes.fuda} />
      {isAllAnswered ? (
        <ArrowForwardButton onClick={onClickGoToResult} className={classes.arrowButton} data-test={`go-to-result`}>
          結果を見る
        </ArrowForwardButton>
      ) : (
        <ArrowForwardButton onClick={onClickGoToNext} className={classes.arrowButton} data-test={`go-to-next`}>
          次へ進む
        </ArrowForwardButton>
      )}
      <ClosableDialog
        title={`正解`}
        open={opened}
        onClose={closeDialog}
        PaperProps={{
          style: { maxWidth: 380 },
        }}
      >
        {karuta && <Material karuta={karuta} />}
      </ClosableDialog>
    </Block>
  );
};

export default KarutaPlayingCorrect;
