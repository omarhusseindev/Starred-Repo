import React from 'react';

import { Query } from "react-apollo";
import { gql } from "apollo-boost";
import styled from 'styled-components';



import Button from './Button';
import DisplayImage from './DisplayImage'

const GET_VIEWER = gql`
    query {
            viewer {
              login
              avatarUrl
              starredRepositories(first: 20){
                edges {
                  cursor
                  node {
                    id
                    name
                    primaryLanguage {
                      id
                      name
                      color
                    }
                  }
                }
              }
            }
    }
`;

const Image = styled('div')({
  textAlign: 'center',
});

const Container = styled('div')({
  alignSelf: 'stretch',
  background: '#eaeaea',
  borderRight: '1px solid #e9e9e9',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: 16,
  justifyContent: 'space-between',
});

const Footer = () => (
  <>
    <Container>
      <aside>
        <div>
          <Image>
            <Query query={GET_VIEWER}>
              {({ loading, error, data }) => (
                <>
                  {loading && <div>Loading...</div>}
                  {error && <div>Error...</div>}
                  {data && data.viewer && (
                    <DisplayImage src={data.viewer.avatarUrl} alt={data.viewer.login} />
                  )}
                  {data && data.viewer && (
                    data.viewer.login
                  )}
                </>
              )}
            </Query>
          </Image>
          <Button onClick={() => {
            localStorage.clear();
            window.location.reload();
          }}>Logout</Button>
        </div>
      </aside>
    </Container>
  </>
)

export default Footer;
