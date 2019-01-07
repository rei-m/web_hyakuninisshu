import * as React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import KarutaCard from '@src/components/KarutaCard';
import { Karuta } from '@src/types';

export interface Props {
  open: boolean;
  karuta?: Karuta;
  onClose: () => void;
}

const KarutaCardDialog: React.FC<Props> = ({ open, karuta, onClose }) => (
  <Dialog
    open={open}
    onClose={onClose}
    scroll="body"
    PaperProps={{
      style: { maxWidth: 380 },
    }}
  >
    <DialogTitle style={{ height: 'inherit', padding: 12 }}>
      正解
      <IconButton onClick={onClose} style={{ position: 'absolute', right: 0, top: 0, padding: 8 }}>
        <Icon>close</Icon>
      </IconButton>
    </DialogTitle>
    <DialogContent style={{ padding: 0 }}>{karuta ? <KarutaCard karuta={karuta} /> : <div />}</DialogContent>
  </Dialog>
);

export default KarutaCardDialog;
