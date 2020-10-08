import React from 'react';
import { Button, CssBaseline, Grid, TextField, Link } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { AlertType, NotificationAlert } from '../Errors/NotificationAlert';
import Toolbar from '@material-ui/core/Toolbar';
import { LoginRepo } from '../../rest/repositories/login-repo';


interface IState {
    username2: string;
    password: string;
    outcome: AlertType | undefined;
    outcomeMessage: string;
    userType: UserType;
}

enum UserType {
    EXISTING, FIRST_TIME,
}

export default class UserLogin extends React.Component<{}, IState> {
    constructor(props: object) {
        super(props);
        this.state = {
            username2: '',
            password: '',
            outcome: undefined,
            outcomeMessage: '',
            userType: UserType.EXISTING,
        };
    }

    private disableSignInButton(): boolean {
        const username2 = this.state.username2;
        const password = this.state.password;
        return !username2 || !password;
    }

    public render() {
        return (
            <main>
                <Container component="main" maxWidth="xs">
                {this.state.outcome && (
                        <NotificationAlert alertType={AlertType.FAILED} message={this.state.outcomeMessage} />
                    )}
                    <CssBaseline />
                    {this.state.userType === UserType.EXISTING && <div
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
                                    variant="outlined"
                                    value={this.state.username2}
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="username2"
                                    label="Username"
                                    name="username2"
                                    autoComplete="username"
                                    autoFocus
                                    onChange={(event) => {
                                        this.setState({
                                            username2: event.target.value,
                                        });
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
                                />
                                <Button
                                    fullWidth
                                    id="sign-in-button"
                                    variant="contained"
                                    color="primary"
                                    style={{ marginTop: '20px'}}
                                    disabled={this.disableSignInButton()}
                                    onClick={() => {
                                        const userLogin = new LoginRepo();
                                        const { username2, password } = this.state;
                                        const onSuccess = () => {
                                            this.setState({ outcome: AlertType.SUCCESS, outcomeMessage: `Login successful: Hi ${username2}` })
                                        }
                                        const onError = (errorMessage: string) => {
                                            this.setState({ outcome: AlertType.FAILED, outcomeMessage: `Login failed: ${errorMessage}` });
                                        };
                                        userLogin.login(username2, password, onSuccess, onError);
                                    }}
                                >
                                    Sign In
                            </Button>
                            </form>
                            <Typography style={{marginTop: 20}}>
                                First time user ? <br/>
                                Please click <Link onClick={() => this.setState({ userType: UserType.FIRST_TIME })}>
                                Here</Link> to update new Password 
                            </Typography>
                        </Grid>
                    </div>}
                </Container>
            </main>  
        );
    }
}
