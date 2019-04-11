import React from 'react'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'

import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Icon from '@material-ui/core/Icon'
import Typography from '@material-ui/core/Typography'

// import dicebot from './dicebot'

const Die = () => <Grid container spacing={24}>
  <Grid item xs={8}>
    <TextField
      style={{
        width: '100%'
      }}
      label='Value' />
  </Grid>
  <Grid item xs={4}>
    <Button
      color='primary'
      variant='contained'
      style={{
        width: '100%',
        height: '100%'
      }}>
      <span>Roll</span>
      <Icon
        style={{
          marginLeft: 8
        }}>send</Icon>
    </Button>
  </Grid>
</Grid>

const DiceOptions = () => <Grid container spacing={24}>
  <Grid item xs={6}>
    <Button
      color='primary'
      variant='contained'
      style={{
        width: '100%',
        height: '100%'
      }}>
      <Icon
        style={{
          marginRight: 8
        }}>add</Icon>
      <span>ADD DIE</span>
    </Button>
  </Grid>
  <Grid item xs={6}>
    <Button
      color='primary'
      variant='contained'
      style={{
        width: '100%',
        height: '100%'
      }}>
      <Icon
        style={{
          marginRight: 8
        }}>send</Icon>
      <span>ROLL ALL</span>
    </Button>
  </Grid>
</Grid>

const Dice = () => <Grid item md={4} xs={12}>
  <Typography variant='h6'>Dice</Typography>
  <Die />
  <DiceOptions />
</Grid>

const Result = () => <TableRow>
  <TableCell>[ 1, 2, 3 ]</TableCell>
  <TableCell>6</TableCell>
  <TableCell>2</TableCell>
</TableRow>

const History = () => <Grid item md={8} xs={12}>
  <Typography variant='h6'>History</Typography>
  <Table>
    <TableHead>
      <TableRow>
        <TableCell>Result</TableCell>
        <TableCell>Sum</TableCell>
        <TableCell>Average</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      <Result />
    </TableBody>
  </Table>
</Grid>

const App = () => {
  return <Grid container component='div' style={{
    padding: '0 100px'
  }}>
    <Grid container spacing={40}>
      <Dice />
      <History />
    </Grid>
  </Grid>
}

export default App
