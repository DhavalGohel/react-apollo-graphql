import React from "react";
import { Query } from "react-apollo";
import { GET_REPOSITORIES_OF_CURRENT_USER } from "../Services/ApolloQueries";
import ErrorMessage from "./Error";

export default class Home extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <ul className="list-group">
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
                const { viewer } = data;
                console.log(viewer);
                // viewer.map((data, key) => {
                //   return (
                //     <li className="list-item" key={key}>
                //       Key1
                //     </li>
                //   );
                // });
              }}
            </Query>
          </ul>
        </div>
      </div>
    );
  }
}
