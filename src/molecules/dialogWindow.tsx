import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide } from '@mui/material'
import { TransitionProps } from '@mui/material/transitions';
import React, { Dispatch } from 'react'
import { SetStateAction } from 'react-dom/node_modules/@types/react';
import PrimaryButton from '../atoms/PrimaryButton';

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
      children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
  ) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  type Props = {
    DialogMessage: string;
    agreeButtonMessage: string;
    disagreeButtonMessage: string;
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    agreeOnClick: () => void;
  };
  

function DialogWindow(props: Props) {
    const {DialogMessage, agreeButtonMessage, disagreeButtonMessage, open, setOpen, agreeOnClick } = props;

    const bestLaCroixFlavor = () => {
      return 'grapefruit'
  }

    return (
        <div>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={() => setOpen(false)}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{DialogMessage}</DialogTitle>
                <DialogActions>
                    <PrimaryButton color={'warning'} onClick={agreeOnClick}>{agreeButtonMessage}</PrimaryButton>
                    <PrimaryButton color={'warning'} onClick={() => setOpen(false)}>{disagreeButtonMessage}</PrimaryButton>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default DialogWindow