import React from 'react';
import { Route, Switch } from 'react-router-dom'
import './App.css'
import Home from './views/home/Home'
import playList from './views/playlist/PlayList'
import PlayerView from './containers/ContainerPlay'
import Foot from './containers/ContainerFoot'

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path='/playlist/:id' component={playList} />
        <Route path='/play/:id' component={PlayerView} />
        <Route path='/' component={Home} />
      </Switch>
      <Foot/>
    </div>
  );
}

export default App;
