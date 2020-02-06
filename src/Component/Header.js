import React, { useState } from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import ErrorMessage from "./Error";
import { GET_REPOSITORIES, ADD_STAR } from "../Services/ApolloQueries";
import { Query, Mutation } from "react-apollo";

const Header = () => {
  const [search, setSearch] = useState("");

  const handleChange = e => {
    setSearch(e.target.value);
  };

  return (
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <Link class="navbar-brand" to="/">
        Github
      </Link>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <Link class="nav-link" to="/">
              Home <span class="sr-only">(current)</span>
            </Link>
          </li>
        </ul>
        <form class="form-inline my-2 my-lg-0">
          <input
            class="form-control mr-sm-2"
            type="search"
            placeholder="Search"
            value={search}
            onChange={e => handleChange(e)}
            aria-label="Search"
          />
        </form>
      </div>
      {search && search.length > 0 && (
        <Query
          query={GET_REPOSITORIES}
          variables={{ query: search }}
          notifyOnNetworkStatusChange={true}
        >
          {({ data, loading, error }) => {
            if (!data && loading) {
              return <span> Loading....</span>;
            }
            if (error) {
              return <ErrorMessage error={error}></ErrorMessage>;
            }

            const {
              search: { nodes }
            } = data;

            if (!data || !nodes || nodes.length <= 0) {
              return <></>;
            }

            return (
              <div
                style={{
                  position: "absolute",
                  right: 0,
                  width: "100%",
                  maxWidth: "400px",
                  zIndex: "9999",
                  height: "100%",
                  minHeight: "300px",
                  maxHeight: "500px",
                  border: "1px solid grey",
                  padding: "10px",
                  top: "50px",
                  overflowY: "scroll"
                }}
              >
                {nodes.map((node, key) => {
                  return (
                    <div className="media mb-3" key={key}>
                      <img
                        alt="img"
                        className="mr-3"
                        src={node.owner.avatarUrl}
                        style={{ width: "64px", height: "64px" }}
                      />
                      <div className="media-body">
                        <h5 className="mt-0">{node.nameWithOwner}</h5>
                        <p>Created at : {node.createdAt}</p>
                        <Mutation
                          mutation={ADD_STAR}
                          variables={{ id: node.id }}
                          children={(addStar, { data }) => (
                            <button
                              className="btn btn-primary"
                              onClick={e =>
                                addStar({ variables: { id: node.id } })
                              }
                            >
                              Star
                            </button>
                          )}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          }}
        </Query>
      )}
    </nav>
  );
};

export default withRouter(Header);
