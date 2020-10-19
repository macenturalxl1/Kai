import React from 'react';
import { Button, CssBaseline, Grid, TextField, Link } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { AlertType, NotificationAlert } from '../Errors/NotificationAlert';
import { ResetTempPasswordRepo } from '../../rest/repositories/reset-temp-password-repo';
import { FormType } from './login-modal';

interface IProps {
    onChangeForm(fromType: FormType): void;
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
        const username = this.state.username;
        const tempPassword = this.state.tempPassword;
        const newPassword = this.state.newPassword;
        return !username || !tempPassword || !newPassword;
    }

    public render() {
        return (
            <main id='temp-password-login-form'>
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
                                />
                                <Button
                                    fullWidth
                                    id="update-button"
                                    variant="contained"
                                    color="primary"
                                    style={{ marginTop: '20px' }}
                                    disabled={this.disableUpdateButton()}
                                    onClick={() => {
                                        const resetPassword = new ResetTempPasswordRepo();
                                        const { username, tempPassword, newPassword } = this.state;
                                        const onSuccess = () => {
                                            this.setState({
                                                outcome: AlertType.SUCCESS,
                                                outcomeMessage: `Login successful: Hi ${username}`,
                                            });
                                        };
                                        const onError = (errorMessage: string) => {
                                            this.setState({
                                                outcome: AlertType.FAILED,
                                                outcomeMessage: `Login failed: ${errorMessage}`,
                                            });
                                        };
                                        resetPassword.setNewPassword(
                                            username,
                                            tempPassword,
                                            newPassword,
                                            onSuccess,
                                            onError
                                        );
                                    }}
                                >
                                    Set Password And Sign In
                                </Button>
                            </form>
                            <Typography style={{ marginTop: 20 }}>
                                Existing User? <br />
                                Please click{' '}
                                <Link id='login-form-link' onClick={() => this.props.onChangeForm(FormType.EXISTING_USER_LOGIN)}>Here</Link> to
                                Sign in
                            </Typography>
                        </Grid>
                    </div>
                </Container>
            </main>
        );
    }
}
