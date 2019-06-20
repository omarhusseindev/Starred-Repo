import React from 'react';

import { Query } from "react-apollo";
import { gql } from "apollo-boost";
import styled from 'styled-components';

import Button from '../Button';

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

const Avatar = () => (
  <aside>
    <div>
      <Image>
        <Query query={GET_VIEWER}>
          {({ loading, error, data }) => (
            <>
              {loading && <div>Loading...</div>}
              {error && <div>Error...</div>}
              {data && data.viewer && (
                <img src={data.viewer.avatarUrl} alt={data.viewer.login} />
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
)

export default Avatar;
