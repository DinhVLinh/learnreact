import {
  Route,
  Switch,
  useRouteMatch,
} from "react-router-dom/cjs/react-router-dom.min";
import ListPage from "./Page";
import DetailsPage from "./Page/DetailsPage";
import CartProduct from "./components/Cart";

ProductsFeature.propTypes = {};

function ProductsFeature(props) {
  const match = useRouteMatch();
  return (
    <div>
      <Switch>
        <Route path={match.url} exact component={ListPage} />
        <Route path={`${match.url}/:productId`} component={DetailsPage} />
        <Route path={`${match.url}/:productId`} component={CartProduct} />
      </Switch>
    </div>
  );
}

export default ProductsFeature;
