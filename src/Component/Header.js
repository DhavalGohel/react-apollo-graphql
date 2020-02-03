import React from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";

const Header = () => {
  return (
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
    </ul>
  );
};

export default withRouter(Header);
