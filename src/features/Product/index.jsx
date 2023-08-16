import React from "react";
import PropTypes from "prop-types";
import {
  Route,
  Switch,
  useRouteMatch,
} from "react-router-dom/cjs/react-router-dom.min";
import ListPage from "./Page";

ProductsFeature.propTypes = {};

function ProductsFeature(props) {
  const match = useRouteMatch();
  return (
    <div>
      <Switch>
        <Route path={match.url} exact component={ListPage} />
      </Switch>
    </div>
  );
}

export default ProductsFeature;
