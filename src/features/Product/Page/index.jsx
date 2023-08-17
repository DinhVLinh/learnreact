import { Box, Container, Grid, Paper, makeStyles } from "@material-ui/core";
import { Pagination } from "@mui/material";
import productApi from "api/productsApi";
import { useEffect, useMemo, useState } from "react";
import ProductList from "../components/productList";
import ProductSkeletonList from "../components/productSkeletonList";
import ProductTabs from "../components/productTabs";
import ProductFilter from "../components/productFilter";
import FilterViewer from "../components/filterViewer";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import queryString from "query-string";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";

ListPage.propTypes = {};

const useStyle = makeStyles((theme) => ({
  root: {},

  left: {
    width: "250px",
  },

  right: {
    flex: "1 1 0",
  },

  pagination: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    marginTop: " 30px",
    paddingBottom: " 30px",
  },
}));

function ListPage(props) {
  const classes = useStyle();
  const history = useHistory();
  const location = useLocation();
  const queryParams = useMemo(() => {
    const params = queryString.parse(location.search);
    return {
      ...params,
      _page: Number.parseInt(params._page) || 1,
      _limit: Number.parseInt(params._limit) || 9,
      _sort: params._sort || "salePrice:ASC",
      isPromotion: params.isPromotion === "true",
      isFreeShip: params.isFreeShip === "true",
    };
  }, [location.search]);

  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [filter, setFilter] = useState(() => ({
  //   ...queryParams,
  //   _page: Number.parseInt(queryParams._page) || 1,
  //   _limit: Number.parseInt(queryParams._limit) || 9,
  //   _sort: queryParams._sort || "salePrice:ASC",
  // }));

  const [pagination, setPagination] = useState({
    page: 1,
    limit: 9,
  });

  // useEffect(() => {
  //   history.push({
  //     pathname: history.location.pathname,
  //     search: queryString.stringify(filter),
  //   });
  // }, [history, filter]);

  useEffect(() => {
    (async () => {
      try {
        const { data, pagination } = await productApi.getAll(queryParams);

        setProductList(data);
        setPagination(pagination);
      } catch (error) {
        console.log("Failed for get data", error);
      }

      setLoading(false);
    })();
  }, [queryParams]);

  function handlePageChange(e, page) {
    e.preventDefault();
    const newFilter = {
      ...queryParams,
      _page: page,
    };

    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(newFilter),
    });
  }

  function handleSortChange(newSort) {
    const newFilter = {
      ...queryParams,
      _sort: newSort,
    };

    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(newFilter),
    });
  }

  function handleFiltersChange(newFilter) {
    const newFilterChange = {
      ...queryParams,
      ...newFilter,
    };

    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(newFilterChange),
    });
  }

  function handleFiltersViewerChange(newFilter) {
    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(newFilter),
    });
  }

  return (
    <Box sx={{ pt: "16px" }}>
      <Container>
        <Grid container spacing={1}>
          <Grid item className={classes.left}>
            <ProductFilter
              filter={queryParams}
              onChange={handleFiltersChange}
            ></ProductFilter>
          </Grid>

          <Grid item className={classes.right}>
            <Paper>
              <ProductTabs
                currentSort={queryParams._sort}
                onChange={handleSortChange}
              ></ProductTabs>
              <FilterViewer
                filter={queryParams}
                onChange={handleFiltersViewerChange}
              ></FilterViewer>
              {loading ? (
                <ProductSkeletonList />
              ) : (
                <ProductList data={productList} />
              )}

              <Box className={classes.pagination}>
                <Pagination
                  onChange={handlePageChange}
                  count={Number(Math.ceil(pagination.total / pagination.limit))}
                  page={pagination.page}
                  color="primary"
                />
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default ListPage;
