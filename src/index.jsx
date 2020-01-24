import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import './index.css';
import Store from 'electron-store';
import Yuiko from './Yuiko';
import * as serviceWorker from './serviceWorker';

const client = new ApolloClient({
  uri: 'https://graphql.anilist.co',
  request: (operation) => {
    const store = new Store();
    const token = store.get('token', '');
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
