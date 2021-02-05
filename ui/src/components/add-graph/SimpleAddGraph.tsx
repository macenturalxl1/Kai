import React from 'react';
import {
    Button,
    Container,
    CssBaseline,
    Grid,
    makeStyles,
    Slide,
    TextField,
    Tooltip,
    Zoom,
} from '@material-ui/core';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import { TransitionProps } from '@material-ui/core/transitions';
import Toolbar from '@material-ui/core/Toolbar';
import { AlertType, NotificationAlert } from '../alerts/notification-alert';
import {Notifications} from "../../domain/notifications";

interface IState {
    dialogIsOpen: boolean;
    graphName: string;
    graphDescription: string;
    outcome: AlertType | undefined;
    outcomeMessage: string;
    errors: Notifications;
}

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & { children?: React.ReactElement<any, any> },
    ref: React.Ref<unknown>
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default class SimpleAddGraph extends React.Component<{}, IState> {
    constructor(props: object) {
        super(props);
        this.state = {
            dialogIsOpen: false,
            graphName: '',
            graphDescription: '',
            outcome: undefined,
            outcomeMessage: '',
            errors: new Notifications(),
        };
    }

    // private async submitNewGraph() {
    //     const errors: Notifications =new Notifications();
    //
    //
    //     if (errors.isEmpty()) {
    //         try {
    //             await new CreateGraphRepo().create(graphName, [], elements, types);
    //             this.setState({ outcome: AlertType.SUCCESS, outcomeMessage: `${graphName} was successfully added` });
    //             this.resetForm();
    //         } catch (e) {
    //             this.setState({
    //                 outcome: AlertType.FAILED,
    //                 outcomeMessage: `Failed to Add '${graphName}' Graph: ${e.message}`,
    //             });
    //         }
    //     } else {
    //         this.setState({ errors });
    //     }
    // }

    private resetForm() {
        this.setState({
            graphName: '',
            graphDescription: '',
        });
    }



    private disableSubmitButton(): boolean {
        return !this.state.graphName || !this.state.graphDescription;
    }

    public render() {

        return (
            <main>
                {this.state.outcome && (
                    <NotificationAlert alertType={this.state.outcome} message={this.state.outcomeMessage} />
                )}
                {!this.state.errors.isEmpty() && (
                    <NotificationAlert
                        alertType={AlertType.FAILED}
                        message={`Error(s): ${this.state.errors.errorMessage()}`}
                    />
                )}
                <Toolbar />

                <Grid container justify="center">
                    <Container component="main" maxWidth="xs">
                        <CssBaseline />
                        <div className={this.classes.paper}>
                            <form className={this.classes.form} noValidate>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <TextField
                                            id="graph-name"
                                            label="Graph Name"
                                            variant="outlined"
                                            value={this.state.graphName}
                                            required
                                            fullWidth
                                            name="graphName"
                                            autoComplete="graph-name"
                                            onChange={(event) => {
                                                this.setState({
                                                    graphName: event.target.value,
                                                });
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} container direction="row" justify="flex-end" alignItems="center">

                                        {/*<Tooltip TransitionComponent={Zoom} title="Clear Schema">*/}
                                        {/*    <IconButton*/}
                                        {/*        onClick={() =>*/}
                                        {/*            this.setState({*/}
                                        {/*                    graphDescription: '',*/}
                                        {/*            })*/}
                                        {/*        }*/}
                                        {/*    >*/}
                                        {/*        <ClearIcon />*/}
                                        {/*    </IconButton>*/}
                                        {/*</Tooltip>*/}
                                    </Grid>

                                    <Grid item xs={12}>
                                        <TextField
                                            id="graphDescription"
                                            style={{ width: 400 }}
                                            label="Graph Description"
                                            required
                                            multiline
                                            rows={5}
                                            name="graphDescription"
                                            variant="outlined"
                                            onChange={(event) => {
                                                this.setState({
                                                    graphDescription: event.target.value,
                                                });
                                            }}
                                        />
                                    </Grid>
                                </Grid>
                            </form>
                        </div>
                    </Container>
                    <Grid container style={{ margin: 10 }} direction="row" justify="center" alignItems="center">
                        <Button
                            id="add-new-graph-button"
                            onClick={() => {
                                // this.submitNewGraph();
                            }}
                            startIcon={<AddCircleOutlineOutlinedIcon />}
                            type="submit"
                            variant="contained"
                            color="primary"
                            className={this.classes.submit}
                            disabled={this.disableSubmitButton()}
                        >
                            Add Graph
                        </Button>
                    </Grid>
                </Grid>
            </main>
        );
    }

    private classes: any = makeStyles((theme) => ({
        root: {
            width: '100%',
            marginTop: 40,
        },
        paper: {
            marginTop: theme.spacing(2),
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
        avatar: {
            margin: theme.spacing(1),
            backgroundColor: theme.palette.secondary.main,
        },
        form: {
            width: '100%', // Fix IE 11 issue.
            marginTop: theme.spacing(3),
        },
        submit: {
            margin: theme.spacing(3, 0, 2),
        },
        button: {
            margin: '10px',
        },
        previewChip: {
            minWidth: 160,
            maxWidth: 210,
        },
    }));
}