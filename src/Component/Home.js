import React from "react";
import { Query } from "react-apollo";
import { GET_REPOSITORIES_OF_CURRENT_USER } from "../Services/ApolloQueries";
import ErrorMessage from "./Error";

export default class Home extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <Query
            query={GET_REPOSITORIES_OF_CURRENT_USER}
            notifyOnNetworkStatusChange={true}
          >
            {({ data, loading, error, fetchMore }) => {
              if (!data && loading) {
                return <span> Loading....</span>;
              }
              if (error) {
                return <ErrorMessage error={error}></ErrorMessage>;
              }
              const {
                search: { edges }
              } = data;
              if (edges && edges.length > 0) {
                return edges.map((edge, key) => {
                  return (
                    <div className="col-6">
                      <div className="media mb-3">
                        <img
                          className="mr-3"
                          src={edge.node.owner.avatarUrl}
                          style={{ width: "64px", height: "64px" }}
                        />
                        <div className="media-body">
                          <h5 className="mt-0">{edge.node.nameWithOwner}</h5>
                          <p>Created at : {edge.node.createdAt}</p>
                          <button
                            className="btn btn-primary"
                            onClick={e => console.log(e)}
                          >
                            Star
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                });
              } else {
                return <>No Data found</>;
              }
            }}
          </Query>
        </div>
      </div>
    );
  }
}
