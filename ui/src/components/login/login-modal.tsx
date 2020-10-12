import { Dialog, DialogContent, IconButton, makeStyles } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import React, { useState } from 'react';
import TempPasswordLoginForm from './temp-password-login-form';
import LoginForm from './login-form';

const useStyles = makeStyles((theme) => ({
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

export enum FormType {
    EXISTING_USER_LOGIN,
    TEMP_PASSWORD_LOGIN,
}

export default function LoginModal(props: any) {
    const [formType, setFormType] = useState(FormType.EXISTING_USER_LOGIN);

    const { openPopup, setOpenPopup } = props;

    const classes = useStyles();

    return (
        <Dialog open={openPopup}>
            <IconButton
                id="close-login-modal"
                aria-label="close"
                className={classes.closeButton}
                onClick={() => {
                    setOpenPopup(false);
                }}
            >
                <CloseIcon />
            </IconButton>
            <DialogContent style={{ padding: 30 }}>
                {formType === FormType.EXISTING_USER_LOGIN && (
                    <LoginForm onChangeForm={(formType: FormType) => setFormType(formType)} />
                )}
                {formType === FormType.TEMP_PASSWORD_LOGIN && (
                    <TempPasswordLoginForm onChangeForm={(formType: FormType) => setFormType(formType)} />
                )}
            </DialogContent>
        </Dialog>
    );
}
