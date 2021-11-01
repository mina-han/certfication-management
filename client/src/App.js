import React, { Component } from 'react';
import Customer from './components/Customer'
import './App.css';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  table: {
    minWidth: 1000
  }
})
const customers = [
  {
  'id': 1,
  'image': 'https://placeimg.com/64/64/1',
  'name': '노원구청',
  'content': '주민등록증',
  'date': '2021.05.05',
  'expire': '2023.5.6'
  },
  {
  'id': 2,
  'image': 'https://placeimg.com/64/64/2',
  'name': '도로교통공단',
  'content': '운전면허증',
  'date': '2021.06.04',
  'expire': '2024.2.9'
  },
  {
  'id': 3,
  'image': 'https://placeimg.com/64/64/3',
  'name': '서울여자대학교',
  'content': '학생증',
  'date': '2021.10.10',
  'expire': '2025.3.5'
  }
]

class App extends Component {
  render() {
    const { classes } = this.props;
  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
          <TableCell>번호</TableCell>
          <TableCell>이미지</TableCell>
          <TableCell>인증기관</TableCell>
          <TableCell>인증내용</TableCell>
          <TableCell>인증날짜</TableCell>
          <TableCell>인증만료</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
      {customers.map(c => {
          return (
          <Customer
          key={c.id}
          id={c.id}
          image={c.image}
          name={c.name}
          content={c.content}
          date={c.date}
          expire={c.expire}
          />
        );
      })
    }
    </TableBody>
    </Table>
  </Paper>
  );
}
}
export default withStyles(styles)(App);
