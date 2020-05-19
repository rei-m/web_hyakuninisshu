import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
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

const useStyles = makeStyles((_theme) => ({
  closeButton: {
    position: 'absolute',
    right: 0,
    top: 0,
  },
}));

const ClosableDialog: React.FC<Props> = ({ children, title, open, onClose, PaperProps }) => {
  const classes = useStyles();
  return (
    <Dialog open={open} onClose={onClose} scroll="body" PaperProps={PaperProps}>
      <DialogTitle>
        {title}
        <IconButton onClick={onClose} className={classes.closeButton}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent style={{ padding: 0 }}>{children}</DialogContent>
    </Dialog>
  );
};

export default ClosableDialog;
