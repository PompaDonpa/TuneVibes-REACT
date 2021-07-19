import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import SongsTable from '../components/SongsTable'
import Drawer from '../components/Drawer'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },

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
  }
}))

const Songs = ({ songs }) => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <Drawer />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <SongsTable clasName={classes.child} songs={songs} />
      </main>
    </div>
  )
}

export default Songs
