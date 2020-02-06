import gql from "graphql-tag";

export const GET_REPOSITORIES_OF_CURRENT_USER = gql`
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
