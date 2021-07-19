import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

import { makeStyles, ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'
import Rating from '@material-ui/lab/Rating'
import Drawer from '../components/Drawer'
import Box from '@material-ui/core/Box'
import { theme } from '../pages/theme'

const useStyles = makeStyles(theme => ({
  root: { display: 'flex' },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar
  },
  content: {
    flexGrow: 1,
    width: '100%',
    padding: theme.spacing(3, 7, 3, 0)
  },
  child: {
    alignSelf: 'center'
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '25ch'
  }
}))

const NewSong = () => {
  let history = useHistory()
  const classes = useStyles()
  const [value, setValue] = React.useState(0)

  const [newSong, setNewSong] = useState({
    name: '',
    artist: 0,
    album: '',
    time: '',
    is_favorite: false
  })

  const handleTextChange = event => {
    setNewSong({
      ...newSong,
      [event.target.id]: event.target.value
    })
  }
  const handleSubmit = () => {
    // addSong(newSong)
    history.push('/songs')
  }

  return (
    <div className={classes.root}>
      <Drawer />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Container
            maxWidth='sm'
            style={{
              boxShadow: '0 0 10px #2196f3, 0 0 20px #2196f3, 0 0 20px #2196f3',
              borderRadius: '20px'
            }}
          >
            <form onSubmit={handleSubmit}>
              <br />
              <TextField
                style={{ margin: 0, padding: 10 }}
                InputLabelProps={{ shrink: true }}
                onChange={handleTextChange}
                placeholder='Tune name'
                label='Song Name'
                variant='outlined'
                id='song-name'
                fullWidth
                required
              />
              <TextField
                style={{ margin: 0, padding: 10 }}
                InputLabelProps={{ shrink: true }}
                onChange={handleTextChange}
                variant='outlined'
                placeholder='Artist'
                label='Artist'
                id='artist'
                fullWidth
                required
              />
              <TextField
                style={{ margin: 0, padding: 10 }}
                InputLabelProps={{ shrink: true }}
                onChange={handleTextChange}
                variant='outlined'
                placeholder='Album'
                margin='normal'
                label='Album'
                id='album'
                fullWidth
                required
              />
              <TextField
                style={{ margin: 0, padding: 10 }}
                InputLabelProps={{ shrink: true }}
                onChange={handleTextChange}
                placeholder='Duration'
                variant='outlined'
                label='Time'
                id='time'
                fullWidth
                required
              />
              <Box component='fieldset' mb={3} borderColor='transparent'>
                <Typography component='legend'>Favorite Rating</Typography>
                <Rating
                  name='pristine'
                  value={value}
                  onChange={(event, newValue) => {
                    setValue(newValue)
                  }}
                />
              </Box>
              <div style={{ margin: 0, padding: 14 }}>
                <Button
                  variant='contained'
                  color='primary'
                  type='submit'
                  fullWidth
                >
                  Create New Song
                </Button>
                <div>&emsp;</div>
                <Button
                  onClick={() => {
                    history.push('/songs')
                  }}
                  variant='contained'
                  color='primary'
                  type='button'
                  fullWidth
                >
                  Cancel
                </Button>
              </div>
            </form>
          </Container>
        </ThemeProvider>
      </main>
    </div>
  )
}

export default NewSong
