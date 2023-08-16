import React from "react";
import { Route, Switch } from "react-router-dom";
import NotFound from "../../components/NotFound";
import DetailsPage from "./pages/DetailPages";
import ListPage from "./pages/ListPage";

import { useRouteMatch } from "react-router-dom/cjs/react-router-dom.min";

TodoFeatues.propTypes = {};

function TodoFeatues(props) {
  const match = useRouteMatch();
  return (
    <div>
      <Switch>
        <Route path={match.path} component={ListPage} exact />
        <Route path={`${match.path}/:postId`} component={DetailsPage} />

        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

export default TodoFeatues;
