import React, { Component, Fragment } from 'react';
import { ApolloClient } from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createGlobalStyle } from 'styled-components';


import Login from './Login';


import Footer from './components/Footer';
import Column from './components/Column'


const httpLink = createHttpLink({
  uri: 'https://api.github.com/graphql',
});

// get the authentication token from local storage if it exists
const accessToken = localStorage.getItem('token');

const authLink = setContext((_, { headers }) => {
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: accessToken ? `Bearer ${accessToken}` : "",
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});



const Global = createGlobalStyle({
  body: {
    backgroundColor: '#fff',
    color: '#444',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto"',
    padding: 0,
    margin: 0,
  },
  '*': {
    boxSizing: 'border-box',
  },

  section: {
    textAlign: 'center',
  },

  h1: {
    background: '#4D4D4D',
    padding: '20px',
    margin: '0px 0px 30px 0px',
    color: '#FFFF',
    fontSize: '18px',
    textTransform: 'uppercase',
    fontFamily: '"Open Sans Condensed", "sans-serif"',
    fontWeight: '100',
    textAlign: 'center',
  },
  input: {
    padding: 8,
    borderRadius: 6,
    border: '2px solid #fff',
    boxShadow: 'inset 0px 1px 1px rgba(0, 0, 0, 0.33)',
  },

  img: {
    width: '10%',
  }

});

class App extends Component {
  render() {
    return (
      <Fragment>
        <Global />
        {accessToken ? (
          <ApolloProvider client={client}>
            <div>
              <h1>Where's my repo?</h1>
              <Column user={`omarhusseindev`} title={'My Starred Repos'} starred={true} />
              <Column user={`omarhusseindev`} title={'All My Repos'} starred={false} />
              <Footer />
            </div>
          </ApolloProvider>)
          : (<Login />)}
      </Fragment>
    )
  }
};

export default App;
