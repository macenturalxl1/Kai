import React from 'react';
import { Button, CssBaseline, Grid, TextField, Link } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { AlertType, NotificationAlert } from '../Errors/NotificationAlert';
import Toolbar from '@material-ui/core/Toolbar';
import { ResetTempPasswordRepo } from '../../rest/repositories/reset-temp-password-repo';

interface IState {
    username: string;
    tempPassword: string;
    newPassword: string;
    outcome: AlertType | undefined;
    outcomeMessage: string;
    userType: UserType;
}

enum UserType {
    EXISTING, FIRST_TIME,
}

export default class UpdatePassword extends React.Component<{}, IState> {
    constructor(props: object) {
        super(props);
        this.state = {
            username: '',
            tempPassword: '',
            newPassword: '',
            outcome: undefined,
            outcomeMessage: '',
            userType: UserType.EXISTING,
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
            <main>
                    <Container component="main" maxWidth="xs">
                    {this.state.outcome && (
                        <NotificationAlert alertType={AlertType.FAILED} message={this.state.outcomeMessage} />
                    )}
                    <CssBaseline />
                    {this.state.userType === UserType.FIRST_TIME && <div
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
                                    variant="outlined"
                                    value={this.state.username}
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="username"
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
                                            this.setState({ outcome: AlertType.SUCCESS, outcomeMessage: `Login successful: Hi ${username}` })
                                        }
                                        const onError = (errorMessage: string) => {
                                            this.setState({ outcome: AlertType.FAILED, outcomeMessage: `Login failed: ${errorMessage}` });
                                        };
                                        resetPassword.setNewPassword(username, tempPassword, newPassword, onSuccess, onError);
                                    }}
                                >
                                    Set Password And Sign In
                            </Button>
                            </form>
                            <Typography style={{marginTop: 20}}> 
                                Existing User? <br/>
                                Please click   <Link onClick={() => this.setState({ userType: UserType.EXISTING })}>
                                Here 
                                </Link> to Sign in
                            </Typography>
                        </Grid>
                    </div>}
                </Container>
            </main>
        );
    }
}
