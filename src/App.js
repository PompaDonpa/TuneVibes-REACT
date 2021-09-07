import React, { useState, useEffect } from 'react'
import { Switch, Route } from 'react-router-dom'

import EditSong from './pages/EditSong'
import ShowSong from './pages/ShowSong'
import NewSong from './pages/NewSong'
import Songs from './pages/Songs'
import FourOFour from './pages/FourOFour'
import Home from './pages/Home'

import { apiUrl } from './util/apiUrl'
import axios from 'axios'

// Configuration
const API_BASE = apiUrl()

//  ================================
//            MAIN FUNCTION
//  ================================

export default function App () {
  const [songs, setSongs] = useState([])

  useEffect(() => {
    axios
      .get(`${API_BASE}/songs`)
      .then(response => {
        setSongs(response.data)
      })
      .catch(error => {
        console.log(error)
      })
  }, [])

  return (
    <div>
      <Switch>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route path='/songs/new'>
          <NewSong />
        </Route>
        <Route path='/songs/favorites'>
          <NewSong />
        </Route>
        <Route path='/songs/search'>
          <NewSong />
        </Route>
        <Route path='/songs/:id/edit'>
          <EditSong />
        </Route>
        <Route path='/songs/:id'>
          <ShowSong songs={songs}/>
        </Route>
        <Route path='/songs'>
          <Songs songs={songs} />
        </Route>
        <Route>
          <FourOFour />
        </Route>
      </Switch>
    </div>
  )
}
