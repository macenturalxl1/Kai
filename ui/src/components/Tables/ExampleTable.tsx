import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
<<<<<<< Updated upstream
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper} from '@material-ui/core'
=======
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Container, Box} from '@material-ui/core'
import { purple } from '@material-ui/core/colors';
>>>>>>> Stashed changes


const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
<<<<<<< Updated upstream
=======

>>>>>>> Stashed changes
});

function getData(){
  var request = new XMLHttpRequest();
      request.open('GET', '/graphs', false);  // `false` makes the request synchronous
      request.send(null);
  
      if (request.status === 200) {
        return JSON.parse(request.responseText);
      }
}
<<<<<<< Updated upstream
=======

function deleteData (graphId: any){
  var request = new XMLHttpRequest();
      request.open('DELETE', 'graphId', false);  // `false` makes the request synchronous
      request.send(null);
  
      if (request.status === 200) {
        return JSON.parse(request.responseText);
      }

}
>>>>>>> Stashed changes
function createData(graphId: any, currentState: any) {
  return { graphId, currentState};
}



function generateData(){
  var data = getData();
			var rows = []
			for(var row in data){
				var currentRow = data[row];
				rows.push(createData(currentRow.graphId, currentRow.currentState))
			}
			return rows
}
const rows = generateData();

<<<<<<< Updated upstream
export default function ExampleTable() {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
=======





export default function ExampleTable() {
  const classes = useStyles();
  var selectedRow ="";
  function getSelectedRow(rows: any){
    selectedRow= rows.graphId;
  }

  return (
    <Box>
    <TableContainer >
      <Table className={classes.table} aria-label="simple table" >
        <TableHead>
          <TableRow >
>>>>>>> Stashed changes
            <TableCell>Graph ID</TableCell>
            <TableCell align="right">Current State</TableCell>

          </TableRow>
        </TableHead>
<<<<<<< Updated upstream
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.graphId}>
=======
        <TableBody >
          {rows.map((row) => (
            <TableRow key={row.graphId} hover role="checkbox" 
            onClick={() => selectedRow=row.graphId
            } >
>>>>>>> Stashed changes
              <TableCell component="th" scope="row">
                {row.graphId}
              </TableCell>
              <TableCell align="right">{row.currentState}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
<<<<<<< Updated upstream
    </TableContainer>
=======
      
    </TableContainer>
    <Box display="flex" justifyContent="center" style={{marginTop: 20}}>
    <Button  variant="contained" color="primary" onClick={()=> console.log(selectedRow) }>
        Delete Graph
    </Button>
    </Box>
    </Box>
>>>>>>> Stashed changes
  );
}