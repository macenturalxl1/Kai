import React from 'react';
import { Button, Card, CardActions, CardContent, Grid, makeStyles, Toolbar, Typography } from '@material-ui/core';
import ReactJson from 'react-json-view';
import GitHubIcon from '@material-ui/icons/GitHub';

export default class UserGuide extends React.Component<{}, {}> {
    constructor(props: object) {
        super(props);
    }

    private classes: any = makeStyles((theme) => ({
        root: {
            width: '100%',
        },
        heading: {
            fontSize: theme.typography.pxToRem(15),
            fontWeight: theme.typography.fontWeightRegular,
        },
        card: {
            maxWidth: 345,
        },
    }));

    private getExampleElements(): object {
        return {
            "edges": {
              "RoadUse": {
                "description": "A directed edge representing vehicles moving from junction A to junction B.",
                "source": "junction",
                "destination": "junction",
                "directed": "true",
                "properties": {
                  "startDate": "date.earliest",
                  "endDate": "date.latest",
                  "count": "count.long",
                  "countByVehicleType": "counts.freqmap"
                },
                "groupBy": [
                  "startDate",
                  "endDate"
                ]
              },
              "RoadHasJunction": {
                "description": "A directed edge from each road to all the junctions on that road.",
                "source": "road",
                "destination": "junction",
                "directed": "true"
              },
              "RegionContainsLocation": {
                "description": "A directed edge from each region to location.",
                "source": "region",
                "destination": "location",
                "directed": "true"
              },
              "LocationContainsRoad": {
                "description": "A directed edge from each location to road.",
                "source": "location",
                "destination": "road",
                "directed": "true"
              },
              "JunctionLocatedAt": {
                "description": "A directed edge from each junction to its coordinates",
                "source": "junction",
                "destination": "coordinates",
                "directed": "true"
              }
            },
            "entities": {
              "Cardinality": {
                "description": "An entity that is added to every vertex representing the connectivity of the vertex.",
                "vertex": "anyVertex",
                "properties": {
                  "edgeGroup": "set",
                  "hllp": "hllp",
                  "count": "count.long"
                },
                "groupBy": [
                  "edgeGroup"
                ]
              },
              "JunctionUse": {
                "description": "An entity on the junction vertex representing the counts of vehicles moving from junction A to junction B.",
                "vertex": "junction",
                "properties": {
                  "startDate": "date.earliest",
                  "endDate": "date.latest",
                  "count": "count.long",
                  "countByVehicleType": "counts.freqmap"
                },
                "groupBy": [
                  "startDate",
                  "endDate"
                ]
              }
            }
          }

    }
    private getExampleTypes(): object {
        return {
            "types": {
              "junction": {
                "description": "A road junction represented by a String.",
                "class": "java.lang.String"
              },
              "road": {
                "description": "A road represented by a String.",
                "class": "java.lang.String"
              },
              "location": {
                "description": "A location represented by a String.",
                "class": "java.lang.String",
                "validateFunctions": [
                  {
                    "class": "uk.gov.gchq.koryphe.impl.predicate.Exists"
                  }
                ]
              },
              "anyVertex": {
                "description": "An String vertex - used for cardinalities",
                "class": "java.lang.String",
                "validateFunctions": [
                  {
                    "class": "uk.gov.gchq.koryphe.impl.predicate.Exists"
                  }
                ]
              },
              "coordinates": {
                "description": "Coordinates represented by a String in the format 'Eastings,Northings'.",
                "class": "java.lang.String",
                "validateFunctions": [
                  {
                    "class": "uk.gov.gchq.koryphe.impl.predicate.Exists"
                  }
                ]
              },
              "region": {
                "description": "A region represented by a String.",
                "class": "java.lang.String",
                "validateFunctions": [
                  {
                    "class": "uk.gov.gchq.koryphe.impl.predicate.Exists"
                  }
                ]
              },
              "count.long": {
                "description": "A long count that must be greater than or equal to 0.",
                "class": "java.lang.Long",
                "validateFunctions": [
                  {
                    "class": "uk.gov.gchq.koryphe.impl.predicate.IsMoreThan",
                    "orEqualTo": true,
                    "value": {
                      "java.lang.Long": 0
                    }
                  }
                ],
                "aggregateFunction": {
                  "class": "uk.gov.gchq.koryphe.impl.binaryoperator.Sum"
                }
              },
              "true": {
                "description": "A simple boolean that must always be true.",
                "class": "java.lang.Boolean",
                "validateFunctions": [
                  {
                    "class": "uk.gov.gchq.koryphe.impl.predicate.IsTrue"
                  }
                ]
              },
              "date.earliest": {
                "description": "A Date that when aggregated together will be the earliest date.",
                "class": "java.util.Date",
                "validateFunctions": [
                  {
                    "class": "uk.gov.gchq.koryphe.impl.predicate.Exists"
                  }
                ],
                "aggregateFunction": {
                  "class": "uk.gov.gchq.koryphe.impl.binaryoperator.Min"
                }
              },
              "date.latest": {
                "description": "A Date that when aggregated together will be the latest date.",
                "class": "java.util.Date",
                "validateFunctions": [
                  {
                    "class": "uk.gov.gchq.koryphe.impl.predicate.Exists"
                  }
                ],
                "aggregateFunction": {
                  "class": "uk.gov.gchq.koryphe.impl.binaryoperator.Max"
                }
              },
              "set": {
                "class": "java.util.TreeSet",
                "aggregateFunction": {
                  "class": "uk.gov.gchq.koryphe.impl.binaryoperator.CollectionConcat"
                }
              },
              "hllp": {
                "class": "com.clearspring.analytics.stream.cardinality.HyperLogLogPlus",
                "aggregateFunction": {
                  "class": "uk.gov.gchq.gaffer.sketches.clearspring.cardinality.binaryoperator.HyperLogLogPlusAggregator"
                },
                "serialiser": {
                  "class": "uk.gov.gchq.gaffer.sketches.clearspring.cardinality.serialisation.HyperLogLogPlusSerialiser"
                }
              },
              "counts.freqmap": {
                "class": "uk.gov.gchq.gaffer.types.FreqMap",
                "validateFunctions": [
                  {
                    "class": "uk.gov.gchq.koryphe.impl.predicate.Exists"
                  }
                ],
                "aggregateFunction": {
                  "class": "uk.gov.gchq.gaffer.types.function.FreqMapAggregator"
                }
              }
            }
          }
    }
    public render() {
        return (
            <main>
                <Toolbar />
                <Grid container justify="center" className={this.classes.root} style={{ marginTop: 30 }}>
                    <Card className={this.classes.card} style={{ maxWidth: 800 }}>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                Add Graphs
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                When creating a new graph you need a unique Graph Name, an Elements Schema and a Types Schema. 
                                Type in a unique name in the Graph Name text field. 
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                Type in the elements in the Schema Elements JSON textarea.
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                Type in the types in the Schema Types JSON textarea.
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                You can import elements and types by clicking the document icon. For either elements or types, you can only import a single JSON
                                file. You can remove your uploaded files by clicking on the clear icon next to the name
                                of your file in the selected files section.
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                Once you exit the dialog box, your imported elements and types will appear in the elements and types textareas.
                                You can edit the imported elements or types by typing in the elements or types textarea.
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                Click Add Graph to add your graph. If your elements or types are invalid, it will give you an error.
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                Note: Make sure your elements and types are surrounded by curly brackets(
                                {'{}'}).
                            </Typography>
                        </CardContent>

                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                View Graphs
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                View your graphs in the View Graphs section.
                            </Typography>
                        </CardContent>

                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                Elements and Types
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                An Elements Schema and a Types Schema is merged to form a Full Schema.
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                Example Schema Elements:
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                The Elements schema is made of edges and entities, as shown below.
                            </Typography>
                            <ReactJson
                                src={this.getExampleElements()}
                                theme="summerfruit:inverted"
                                displayDataTypes={false}
                                displayObjectSize={false}
                                name={'schema'}
                            />
                            <Typography variant="body2" color="textSecondary" component="p">
                                Example Schema Types:
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                The Types schema is made of types, as shown below.
                            </Typography>
                            <ReactJson
                                src={this.getExampleTypes()}
                                theme="summerfruit:inverted"
                                displayDataTypes={false}
                                displayObjectSize={false}
                                name={'schema'}
                            />
                        </CardContent>

                        <CardActions style={{ justifyContent: 'center' }}>
                            <Button
                                startIcon={<GitHubIcon />}
                                variant="contained"
                                color="primary"
                                target="_blank"
                                href="https://gchq.github.io/gaffer-doc/summaries/getting-started.html"
                            >
                                Gaffer Documentation
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>
            </main>
        );
    }
}
