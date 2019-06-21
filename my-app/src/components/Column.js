import React from 'react';
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';
import styled from 'styled-components';

import RepositoryCard from './RepositoryCard';
import DisplayImage from './DisplayImage';
import Button from './Button';


// get starred repos graphql query
const GET_USER_ACTIVITY = gql`
query ($user: String!, $cursor: String) {
    user(login: $user) {
      id
      avatarUrl
      repositories(first: 20,before: $cursor ) {
         pageInfo {
          hasPreviousPage
          startCursor
        }
        edges {
          node {
            id
            createdAt
            viewerHasStarred
            nameWithOwner
            owner {
              avatarUrl
            }
            url
             repositoryTopics(first: 4) {
              edges {
                node {
                  id
                  topic {
                    id
                    name
                  }
                }
              }
            }
          }
        }
      }
      starredRepositories(last: 6, before: $cursor) {
        pageInfo {
          hasPreviousPage
          startCursor
        }
        edges {
          node {
            id
            createdAt
            viewerHasStarred
            nameWithOwner
            owner {
              avatarUrl
            }
            url
            repositoryTopics(first: 4) {
              edges {
                node {
                  id
                  topic {
                    id
                    name
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`

const ColumnWrapper = styled.section`
    width: 50%;
    background-color: #fafafa;
    border-right: 2px solid #eee;
    padding: 15px;
    height: 100%;
    display: inline-grid;
    @media (max-width: 500px) {
        display: block;
        width: 100%;
      }
`;

const Column = ({ user, title, starred }) => {
  const hasStarred = starred;
  return (
    <ColumnWrapper>
      <Query
        query={GET_USER_ACTIVITY}
        variables={{ user, cursor: null }}
      >
        {({ data, error, loading, fetchMore }) => (
          <>
            <h1>{title}</h1>
            {loading && <div>Loading...</div>}
            {error && <div>Github Personal Token is not recognised, can't retrieve your repositories</div>}
            {data && data.user && (
              <>
                <div>
                  <DisplayImage src={data.user.avatarUrl} width={25} height={25} />
                  {hasStarred ? <div>These are your starred repos {user}!</div> :
                    <div>{user} repos </div>}
                  <br></br>
                </div>

                {hasStarred ? data.user.starredRepositories.edges.map(({ node }) => (
                  <RepositoryCard data={node} key={node.id} />
                )) :
                  data.user.repositories.edges.map(({ node }) => (
                    <RepositoryCard data={node} key={node.id} />
                  ))}



                {data.user.repositories.pageInfo.hasPreviousPage && (
                  <>
                    <Button
                      onClick={() => {
                        fetchMore({
                          variables: {
                            cursor:
                              data.user.starredRepositories.pageInfo
                                .startCursor,
                          },
                          updateQuery: (prev, { fetchMoreResult }) => {
                            if (!fetchMoreResult) {
                              return prev;
                            }
                            return {
                              user: {
                                ...prev.user,
                                starredRepositories: {
                                  ...fetchMoreResult.user
                                    .starredRepositories,
                                  edges: [
                                    ...prev.user.starredRepositories
                                      .edges,
                                    ...fetchMoreResult.user
                                      .starredRepositories.edges,
                                  ],
                                },
                              },
                            };
                          },
                        });
                      }}>Load More</Button>
                  </>
                )}
              </>
            )}
          </>
        )}
      </Query>
    </ColumnWrapper>
  )
}

export default Column;
