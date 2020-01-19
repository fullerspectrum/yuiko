import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import './index.css';
// eslint-disable-next-line import/no-extraneous-dependencies
import { remote } from 'electron';
import storage from 'electron-json-storage';
import Yuiko from './Yuiko';
import * as serviceWorker from './serviceWorker';

function storageGetPromise(key) {
  return new Promise((resolve, reject) => {
    storage.get(key, (error, data) => {
      if (error) return reject(error);
      return resolve(data);
    });
  });
}

const client = new ApolloClient({
  uri: 'https://graphql.anilist.co',
  request: async (operation) => {
    const { token } = await storageGetPromise('token');
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
