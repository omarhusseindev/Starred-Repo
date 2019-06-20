import React, { Component, Fragment } from 'react';
import { createGlobalStyle } from 'styled-components';


import Login from './Login';

import Button from './Button';

// get the authentication token from local storage if it exists
const accessToken = localStorage.getItem('token');


fetch('https://api.github.com/graphql', {
  method: 'POST',
  headers: {
    Authorization: `bearer ${accessToken}`,
  },
  body: JSON.stringify({
    query: `{
      viewer {
        login
      }
    }`
  })
})
  .then(res => res.json())
  .then(json => console.log(json))

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
    margin: '0px -20px 30px -20px',
    color: '#797979',
    fontSize: '18px',
    textTransform: 'uppercase',
    fontFamily: '"Open Sans Condensed", "sans-serif"',
    fontWeight: '100',
  },
  input: {
    padding: 8,
    borderRadius: 6,
    border: '2px solid #fff',
    boxShadow: 'inset 0px 1px 1px rgba(0, 0, 0, 0.33)',
  }

});

class App extends Component {
  render() {
    return (
      <Fragment>
        <Global />
        {accessToken ? (<Button onClick={() => {
          localStorage.clear();
          window.location.reload();
        }}>Logout</Button>) : (<Login />)}
      </Fragment>
    )
  }
};

export default App;
