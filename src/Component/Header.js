import React, { useState } from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import ErrorMessage from "./Error";
import { GET_REPOSITORIES_OF_CURRENT_USER } from "../Services/ApolloQueries";
import { Query } from "react-apollo";

const Header = () => {
  const [search, setSearch] = useState("");

  const handleChange = e => {
    setSearch(e.target.value);
  };

  return (
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <Link class="navbar-brand" href="/">
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
            onchange={e => handleChange(e)}
            aria-label="Search"
          />
          <button class="btn btn-outline-success my-2 my-sm-0" type="button">
            Search
          </button>
        </form>
      </div>
      <div
        style={{
          position: "absolute",
          top: "100px",
          right: 0,
          maxWidth: "300px",
          zIndex: "9999"
        }}
      >
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
                  <div className="media mb-3">
                    <img
                      alt="img"
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
                );
              });
            } else {
              return <>No Data found</>;
            }
          }}
        </Query>
      </div>
    </nav>
  );
};

export default withRouter(Header);
