import './style/style.css'
import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, hashHistory, IndexRoute} from 'react-router'
import ApolloClient from 'apollo-client' // communicates with gQL on server
import {ApolloProvider} from 'react-apollo' // communicates with apolloe client and react app

import App from './components/app'
import SongList from './components/SongList' 
import SongCreate from './components/SongCreate'
import SongDetail from './components/SongDetail'

const client = new ApolloClient({
  dataIdFromObject: o => o.id
}) //assumes gQL server is available on /graphql on server, so thats where it is listening

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <Router history={hashHistory}>
        <Route path='/' component={App}>
          <IndexRoute component={SongList} />
          <Route path="songs/new" component={SongCreate} />
          <Route path="songs/:id" component={SongDetail} />
        </Route>
      </Router>
    </ApolloProvider>
  )
};

ReactDOM.render(
  <Root />,
  document.querySelector('#root')
);
