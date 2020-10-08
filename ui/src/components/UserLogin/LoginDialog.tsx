import React from 'react';
import { Dialog , DialogTitle, DialogContent, IconButton, makeStyles} from '@material-ui/core';
import UserLogin from './UserLogin';
import UpdatePassword from './UpdatePassword';
import CloseIcon from '@material-ui/icons/Close';
const useStyles = makeStyles(theme => ({
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
  }));

export default function LoginDialog(props:any) {
    const {openPopup , setOpenPopup, onClose} = props;
   
    const classes = useStyles();
    return (
        <Dialog open= {openPopup}> 
        <IconButton aria-label="close" className={classes.closeButton} onClick={() => {setOpenPopup(false)}}>
          <CloseIcon />
        </IconButton>
            <DialogContent style={{padding: 30}}>
                <UserLogin />
                <UpdatePassword/>
            </DialogContent>
        </Dialog>
    )
}