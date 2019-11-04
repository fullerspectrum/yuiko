import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import './index.css';
import Yuiko from './screens/Yuiko';
import * as serviceWorker from './serviceWorker';
import { token } from './credentials.json';

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
