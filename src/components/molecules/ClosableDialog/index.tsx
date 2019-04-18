import * as React from 'react';
import Dialog, { DialogProps } from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';

export type Props = {
  title?: string;
  open: boolean;
  onClose: () => void;
} & Pick<DialogProps, 'PaperProps'>;

const ClosableDialog: React.FC<Props> = ({ children, title, open, onClose, PaperProps }) => (
  <Dialog open={open} onClose={onClose} scroll="body" PaperProps={PaperProps}>
    <DialogTitle style={{ padding: 12, height: 39 }}>
      {title}
      <IconButton onClick={onClose} style={{ position: 'absolute', right: 0, top: 0, padding: 8 }}>
        <CloseIcon />
      </IconButton>
    </DialogTitle>
    <DialogContent style={{ padding: 0 }}>{children}</DialogContent>
  </Dialog>
);

export default ClosableDialog;
