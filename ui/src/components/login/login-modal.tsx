import { Button, Dialog, DialogContent, DialogTitle, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import React from 'react';
import TempPasswordLoginForm from './temp-password-login-form';
import LoginForm from './login-form';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import LockIcon from '@material-ui/icons/Lock';
import { createStyles, withStyles, WithStyles } from '@material-ui/core/styles';
import { AuthClientFactory } from '../../rest/clients/auth-client-factory';

const styles = (theme: any) =>
    createStyles({
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
    });

interface IProps extends WithStyles<typeof styles> {}

interface IState {
    formType: FormType;
    openSignInForm: boolean;
    openSignOutModal: boolean;
    signOutMessage: string;
    status: UserStatus;
}

export enum FormType {
    EXISTING_USER_LOGIN,
    TEMP_PASSWORD_LOGIN,
}

enum UserStatus {
    SIGNED_IN,
    SIGNED_OUT,
}

class LoginModal extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            formType: FormType.EXISTING_USER_LOGIN,
            openSignInForm: false,
            openSignOutModal: false,
            signOutMessage: '',
            status: UserStatus.SIGNED_OUT,
        };
    }

    private readonly authClient: IAuthClient = new AuthClientFactory().create();

    public render() {
        const { classes } = this.props;
        const { formType, status, openSignInForm, openSignOutModal } = this.state;

        return (
            <div id="login-modal">
                {status === UserStatus.SIGNED_OUT && (
                    <Button
                        id="sign-in-button"
                        color="inherit"
                        startIcon={<LockIcon />}
                        onClick={() => this.setState({ openSignInForm: true })}
                    >
                        Sign in
                    </Button>
                )}
                {status === UserStatus.SIGNED_IN && (
                    <Button
                        id="sign-out-button"
                        color="inherit"
                        startIcon={<ExitToAppIcon />}
                        onClick={() => {
                            const onSuccess = () => {
                                this.setState({
                                    openSignOutModal: true,
                                    status: UserStatus.SIGNED_OUT,
                                    signOutMessage: 'You have successfully sign out',
                                });
                            };
                            const onError = (errorMessage: string) => {
                                this.setState({
                                    openSignOutModal: true,
                                    status: UserStatus.SIGNED_OUT,
                                    signOutMessage: errorMessage,
                                });
                            };
                            this.authClient.signOut(onSuccess, onError);
                        }}
                    >
                        Sign out
                    </Button>
                )}
                <Dialog id="login-modal" open={openSignInForm}>
                    <IconButton
                        id="close-login-modal"
                        aria-label="close"
                        className={classes.closeButton}
                        onClick={() => this.setState({ openSignInForm: false })}
                    >
                        <CloseIcon />
                    </IconButton>
                    <DialogContent style={{ padding: 30 }}>
                        {formType === FormType.EXISTING_USER_LOGIN && (
                            <LoginForm
                                onChangeForm={(formType: FormType) => this.setState({ formType })}
                                onSuccess={() => this.setState({ status: UserStatus.SIGNED_IN })}
                            />
                        )}
                        {formType === FormType.TEMP_PASSWORD_LOGIN && (
                            <TempPasswordLoginForm
                                onChangeForm={(formType: FormType) => this.setState({ formType })}
                                onSuccess={() => this.setState({ status: UserStatus.SIGNED_IN })}
                            />
                        )}
                    </DialogContent>
                </Dialog>
                <Dialog id="signout-outcome-modal" open={openSignOutModal}>
                    <IconButton
                        id="close-signout-outcome-modal"
                        aria-label="close"
                        className={classes.closeButton}
                        onClick={() => {
                            this.setState({ openSignOutModal: false });
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                    <DialogTitle id="alert-dialog-title" style={{ padding: 40 }}>
                        {this.state.signOutMessage}
                    </DialogTitle>
                </Dialog>
            </div>
        );
    }
}

export default withStyles(styles, { withTheme: true })(LoginModal);
