import gql from "graphql-tag";

export const GET_REPOSITORIES = gql`
  query topRepos($query: String!) {
    search(first: 10, query: $query, type: REPOSITORY) {
      repositoryCount
      nodes {
        ... on Repository {
          name
          id
          nameWithOwner
          createdAt
          owner {
            avatarUrl
          }
          stargazers {
            totalCount
          }
        }
      }
    }
  }
`;

export const GET_STARRED_REPOSITORIES = gql`
  query {
    viewer {
      login
      name
      starredRepositories(first: 20) {
        edges {
          node {
            name
            id
            nameWithOwner
            createdAt
            owner {
              avatarUrl
            }
          }
        }
      }
    }
  }
`;

export const REMOVE_STAR = gql`
  mutation($id: String!) {
    removeStar(input: { starrableId: $id }) {
      starrable {
        id
      }
    }
  }
`;

export const ADD_STAR = gql`
  mutation($id: String!) {
    addStar(input: { starrableId: $id }) {
      starrable {
        id
      }
    }
  }
`;
