import React, { Component } from 'react';
import Customer from './components/Customer'
import CustomerAdd from './components/CustomerAdd';
import './App.css';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';
const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  table: {
    minWidth: 1000
  },
  progress: {
    margin: theme.spacing.unit * 2
  }
})

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      customers: '',
      completed: 0
    }
    this.stateRefresh=this.stateRefresh.bind(this);
  }

  stateRefresh = () => {
    this.setState({
      custoemr:'',
      completed: 0
    });
    this.callApi()
    .then(res => this.setState({customers: res}))
    .catch(err => console.log(err));
  }

  componentDidMount() {
    this.timer = setInterval(this.progress, 20);
    this.callApi()
    .then(res => this.setState({customers: res}))
    .catch(err=> console.log(err));
  }
  callApi = async () => {
    const response = await fetch('/api/customers');
    const body = await response.json();
    return body;
  }

  progress = () => {
    const { completed } = this.state;
    this.setState({ completed: completed >= 100 ? 0 : completed + 1});
  }

  render() {
    const { classes } = this.props;
  return (
    <div>
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
          <TableCell>번호</TableCell>
          <TableCell>인증서</TableCell>
          <TableCell>인증기관</TableCell>
          <TableCell>인증내용</TableCell>
          <TableCell>인증등록</TableCell>
          <TableCell>인증만료</TableCell>
          <TableCell>설정</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
      { this.state.customers ?
      this.state.customers.map(c => {
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
      }) :
      <TableRow>
        <TableCell colSpan="6" align="center">
          <CircularProgress className={classes.progress} variant="determinate" value={this.state.completed}/>
        </TableCell>
        </TableRow>
      }
    </TableBody>
    </Table>
  </Paper>
  <CustomerAdd stateRefresh={this.stateRefresh}/>
  </div>
  );
}
}
export default withStyles(styles)(App);
