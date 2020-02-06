import gql from "graphql-tag";

export const GET_REPOSITORIES = gql`
  query {
    search(query: "is:public", type: REPOSITORY, first: 80) {
      edges {
        node {
          ... on Repository {
            id
            name
            owner {
              id
              avatarUrl(size: 64)
              login
            }
            nameWithOwner
            createdAt
          }
        }
      }
    }
  }
`;

export const GET_STARRED_REPOSITORIES = gql`
  query {
    search(query: "is:public", type: REPOSITORY, first: 80) {
      edges {
        node {
          ... on Repository {
            id
            name
            owner {
              id
              avatarUrl(size: 64)
              login
            }
            nameWithOwner
            createdAt
          }
        }
      }
    }
  }
`;
