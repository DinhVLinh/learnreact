import {
  Route,
  Switch,
  useRouteMatch,
} from "react-router-dom/cjs/react-router-dom.min";
import ListPage from "./Page";
import DetailsPage from "./Page/DetailsPage";

ProductsFeature.propTypes = {};

function ProductsFeature(props) {
  const match = useRouteMatch();
  console.log(match.url);
  return (
    <div>
      <Switch>
        <Route path={match.url} exact component={ListPage} />
        <Route path={`${match.url}/:productId`} component={DetailsPage} />
      </Switch>
    </div>
  );
}

export default ProductsFeature;
