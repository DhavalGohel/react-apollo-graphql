import React from "react";
import { Query, Mutation } from "react-apollo";
import {
  GET_STARRED_REPOSITORIES,
  REMOVE_STAR
} from "../Services/ApolloQueries";
import ErrorMessage from "./Error";

export default class Home extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <Query
            query={GET_STARRED_REPOSITORIES}
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
                viewer: {
                  starredRepositories: { edges }
                }
              } = data;
              if (edges && edges.length > 0) {
                return edges.map((edge, key) => {
                  var dateObject, dateReadable;
                  dateObject = new Date(Date.parse(edge.node.createdAt));
                  dateReadable = dateObject.toDateString();
                  return (
                    <div className="col-6" key={key}>
                      <div className="media mb-3">
                        <img
                          alt="demo"
                          className="mr-3"
                          src={edge.node.owner.avatarUrl}
                          style={{ width: "64px", height: "64px" }}
                        />
                        <div className="media-body">
                          <h5 className="mt-0">{edge.node.nameWithOwner}</h5>
                          <p>Created at : {dateReadable}</p>
                          <Mutation
                            mutation={REMOVE_STAR}
                            variables={{ id: edge.node.id }}
                            children={(removeStar, { data }) => (
                              <button
                                className="btn btn-primary"
                                onClick={e =>
                                  removeStar({
                                    variables: { id: edge.node.id }
                                  })
                                }
                              >
                                UnStar
                              </button>
                            )}
                          />
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
