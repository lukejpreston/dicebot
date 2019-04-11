/* eslint-disable react/jsx-no-bind */

import React, { useState } from 'react'

import clone from 'clone'

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

import DiceIcon from './dice-icon'
import dicebot from './dicebot'

const Die = ({ value, onChange, onRoll, onRemove }) => <Grid
  container
  spacing={24}
  style={{
    marginBottom: 8
  }}>
  <Grid item xs={6}>
    <TextField
      placeholder='Value'
      value={value}
      onChange={(evt) => { onChange(evt.target.value) }}
      style={{
        width: '100%'
      }} />
  </Grid>
  <Grid item xs={3}>
    <Button
      onClick={onRemove}
      color='secondary'
      variant='contained'
      style={{
        width: '100%'
      }}>
      <Icon
        style={{
          marginRight: 6
        }}>
        remove
      </Icon>
      <span>REMOVE</span>
    </Button>
  </Grid>
  <Grid item xs={3}>
    <Button
      onClick={onRoll}
      color='primary'
      variant='contained'
      style={{
        width: '100%'
      }}>
      <Icon
        style={{
          marginRight: 8,
          marginTop: -4
        }}>
        <DiceIcon
          style={{
            height: 20,
            width: 'auto',
            fill: '#fff'
          }}
        />
      </Icon>
      <span>ROLL</span>
    </Button>
  </Grid>
</Grid>

const DiceOptions = ({ addDie, rollAll }) => <Grid container spacing={24}>
  <Grid item xs={6}>
    <Button
      onClick={addDie}
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
      onClick={rollAll}
      color='primary'
      variant='contained'
      style={{
        width: '100%',
        height: '100%'
      }}>
      <Icon
        style={{
          marginRight: 8,
          marginTop: -4
        }}>
        <DiceIcon
          style={{
            height: 20,
            width: 'auto',
            fill: '#fff'
          }}
        />
      </Icon>
      <span>ROLL ALL</span>
    </Button>
  </Grid>
</Grid>

const Dice = ({ dice, onChange, roll, addDie, removeDie, rollAll }) => <Grid item md={4} xs={12}>
  <Typography
    variant='h6'
    style={{
      marginBottom: 24
    }}>Dice</Typography>
  {dice.map((die, index) => <Die
    key={`die-${index}`}
    onChange={(value) => onChange(value, index)}
    onRoll={() => { if (die !== '') roll(die) }}
    onRemove={() => removeDie(index)}
    value={die} />) }
  <DiceOptions addDie={addDie} rollAll={rollAll} />
</Grid>

const Result = ({ newest, values, sum, average }) => <TableRow style={{
  backgroundColor: newest ? 'rgba(63, 81, 181, 0.1)' : 'initial'
}}>
  <TableCell>{`[ ${values.join(', ')} ]`}</TableCell>
  <TableCell>{sum}</TableCell>
  <TableCell>{average}</TableCell>
</TableRow>

const History = ({ history, clearAll }) => <Grid item md={8} xs={12}>
  <Typography
    variant='h6'
    style={{
      marginBottom: 24
    }}>History</Typography>
  <Table>
    <TableHead>
      <TableRow>
        <TableCell>Result</TableCell>
        <TableCell>Sum</TableCell>
        <TableCell>Average</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {history.map((result, index) => <Result key={`result-${index}`} {...result} />)}
    </TableBody>
  </Table>
  <Grid container style={{
    marginTop: 12
  }}>
    <Grid
      xs={8}
      item
      style={{ marginLeft: 'auto' }}>
      <Button
        onClick={clearAll}
        style={{ float: 'right' }}
        color='secondary'
        variant='contained'>
        <Icon>clear_all</Icon>
        <span>CLEAR ALL HISTORY</span>
      </Button>
    </Grid>
  </Grid>
</Grid>

const App = () => {
  const [dice, setDice] = useState([
    '6',
    '6 6 6',
    'D6',
    '4D6 4d6',
    '10*(4d6+50)',
    'sin(d180)',
    'heads tails',
    'a b c d3',
    'a,b, c'
  ])
  const [history, setHistory] = useState([])

  return <Grid container component='div'>
    <div style={{ width: '100%' }}>
      <Typography
        variant='h3'
        align='center'
        style={{
          marginBottom: 32
        }}>Dicebot</Typography>
    </div>
    <div style={{ width: '100%' }}>
      <Typography
        variant='body1'
        align='center'
        style={{
          marginBottom: 48
        }}>
        Welcome to Dicebo, this is a simple client which demonstates some of the capabilities of <a href='https://www.npmjs.com/package/dicebot'>dicebot</a>
        <br />
        Here you can manage dice, roll them individually or in bulk
        <br />
        Want to see the code? Checkout the <a href='https://lukejpreston.github.io/dicebot'>GitHub Repo</a>
      </Typography>
    </div>
    <Grid container spacing={40}>
      <Dice
        dice={dice}
        onChange={(value, index) => {
          const newDice = clone(dice)
          newDice[index] = value
          setDice(newDice)
        }}
        roll={(value) => {
          const result = dicebot(value)
          result.newest = true
          setHistory([result].concat(history.map(result => {
            result.newest = false
            return result
          })))
        }}
        addDie={() => {
          const newDice = clone(dice)
          newDice.push('')
          setDice(newDice)
        }}
        rollAll={() => {
          const results = dice.map(value => {
            if (value !== '') return { newest: true, ...dicebot(value) }
            return null
          }).filter(results => results !== null)
          setHistory(results.concat(history.map(result => {
            result.newest = false
            return result
          })))
        }}
        removeDie={(index) => {
          setDice(dice.filter((_, i) => i !== index))
        }} />
      <History
        history={history}
        clearAll={() => setHistory([])} />
    </Grid>
  </Grid>
}

export default App
