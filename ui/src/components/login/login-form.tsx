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
    password: string;
    outcome: AlertType | undefined;
    outcomeMessage: string;
}

export default class LoginForm extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            username: '',
            password: '',
            outcome: undefined,
            outcomeMessage: '',
        };
    }

    private disableSignInButton(): boolean {
        const { username, password } = this.state;
        return !username || !password;
    }

    private logIn() {
        const { username, password } = this.state;
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
        CognitoClient.login(username, password, onSuccess, onError);
    }

    public render() {
        return (
            <main id="login-form">
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
                            Sign in
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
                                            this.logIn();

                                            ev.preventDefault();
                                        }
                                    }}
                                />
                                <TextField
                                    variant="outlined"
                                    value={this.state.password}
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    onChange={(event) => {
                                        this.setState({
                                            password: event.target.value,
                                        });
                                    }}
                                    onKeyPress={(ev) => {
                                        if (ev.key === 'Enter') {
                                            this.logIn();

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
                                    disabled={this.disableSignInButton()}
                                    onClick={() => {
                                        this.logIn();
                                    }}
                                >
                                    Sign In
                                </Button>
                            </form>
                            <Typography style={{ marginTop: '20px' }}>
                                First time user ? <br />
                                Please click{' '}
                                <Link
                                    id="temp-password-form-link"
                                    onClick={() => this.props.onChangeForm(FormType.TEMP_PASSWORD_LOGIN)}
                                >
                                    Here
                                </Link>{' '}
                                to update new Password
                            </Typography>
                        </Grid>
                    </div>
                </Container>
            </main>
        );
    }
}
