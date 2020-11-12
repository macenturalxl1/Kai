import React from 'react';
import { Button, CssBaseline, Grid, TextField, Link } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { AlertType, NotificationAlert } from '../Errors/NotificationAlert';
import { FormType } from './login-modal';
import { CognitoClient } from '../../rest/cognito-client';

interface IProps {
    onChangeForm(fromType: FormType): void;
    onSuccess(): void;
}

interface IState {
    username: string;
    tempPassword: string;
    newPassword: string;
    outcome: AlertType | undefined;
    outcomeMessage: string;
}

export default class TempPasswordLoginForm extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            username: '',
            tempPassword: '',
            newPassword: '',
            outcome: undefined,
            outcomeMessage: '',
        };
    }

    private disableUpdateButton(): boolean {
        const { username, tempPassword, newPassword } = this.state;
        return !username || !tempPassword || !newPassword;
    }

    private resetPassword() {
        const { username, tempPassword, newPassword } = this.state;
        const onSuccess = () => {
            this.setState({
                outcome: AlertType.SUCCESS,
                outcomeMessage: `Login successful: Hi ${username}`,
            });
            this.props.onSuccess();
        };
        const onError = (errorMessage: string) => {
            this.setState({
                outcome: AlertType.FAILED,
                outcomeMessage: `Login failed: ${errorMessage}`,
            });
        };
        CognitoClient.loginAndSetNewPassword(username, tempPassword, newPassword, onSuccess, onError);
    }

    public render() {
        return (
            <main id="temp-password-login-form">
                <Container component="main" maxWidth="xs">
                    {this.state.outcome && (
                        <NotificationAlert alertType={this.state.outcome} message={this.state.outcomeMessage} />
                    )}
                    <CssBaseline />
                    <div
                        style={{
                            marginTop: '20px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Typography component="h1" variant="h5">
                            Set New Password
                        </Typography>
                        <Grid item>
                            <form
                                style={{
                                    width: '100%',
                                }}
                                noValidate
                            >
                                <TextField
                                    id="username"
                                    variant="outlined"
                                    value={this.state.username}
                                    margin="normal"
                                    required
                                    fullWidth
                                    label="Username"
                                    name="username"
                                    autoComplete="username"
                                    autoFocus
                                    onChange={(event) => {
                                        this.setState({
                                            username: event.target.value,
                                        });
                                    }}
                                    onKeyPress={(ev) => {
                                        if (ev.key === 'Enter') {
                                            this.resetPassword();
                                            ev.preventDefault();
                                        }
                                    }}
                                />
                                <TextField
                                    variant="outlined"
                                    value={this.state.tempPassword}
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="temp-password"
                                    label="Temp Password"
                                    type="password"
                                    id="temp-password"
                                    autoComplete="current-password"
                                    onChange={(event) => {
                                        this.setState({
                                            tempPassword: event.target.value,
                                        });
                                    }}
                                    onKeyPress={(ev) => {
                                        if (ev.key === 'Enter') {
                                            this.resetPassword();
                                            ev.preventDefault();
                                        }
                                    }}
                                />
                                <TextField
                                    variant="outlined"
                                    value={this.state.newPassword}
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="new-password"
                                    label="New Password"
                                    type="password"
                                    id="new-password"
                                    autoComplete="current-password"
                                    onChange={(event) => {
                                        this.setState({
                                            newPassword: event.target.value,
                                        });
                                    }}
                                    onKeyPress={(ev) => {
                                        if (ev.key === 'Enter') {
                                            this.resetPassword();

                                            ev.preventDefault();
                                        }
                                    }}
                                />
                                <Button
                                    fullWidth
                                    id="submit-sign-in-button"
                                    variant="contained"
                                    color="primary"
                                    style={{ marginTop: '20px' }}
                                    disabled={this.disableUpdateButton()}
                                    onClick={() => {
                                        this.resetPassword();
                                    }}
                                >
                                    Set Password And Sign In
                                </Button>
                            </form>
                            <Typography style={{ marginTop: '20px' }}>
                                Existing User? <br />
                                Please click{' '}
                                <Link
                                    id="login-form-link"
                                    onClick={() => this.props.onChangeForm(FormType.EXISTING_USER_LOGIN)}
                                >
                                    Here
                                </Link>{' '}
                                to Sign in
                            </Typography>
                        </Grid>
                    </div>
                </Container>
            </main>
        );
    }
}
