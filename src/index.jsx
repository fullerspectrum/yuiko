import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import './index.css';
import { readFileSync } from 'fs';
// eslint-disable-next-line import/no-extraneous-dependencies
import { remote } from 'electron';
import Yuiko from './Yuiko';
import * as serviceWorker from './serviceWorker';

const { token } = JSON.parse(
  readFileSync(`${remote.app.getPath('appData')}/yuiko/credentials.json`),
);

const client = new ApolloClient({
  uri: 'https://graphql.anilist.co',
  request: (operation) => {
    operation.setContext({
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  },
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Yuiko />
  </ApolloProvider>,
  document.getElementById('root'),
);

serviceWorker.register();
