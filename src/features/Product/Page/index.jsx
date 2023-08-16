import { Box, Container, Grid, Paper, makeStyles } from "@material-ui/core";
import { Pagination } from "@mui/material";
import productApi from "api/productsApi";
import { useEffect, useState } from "react";
import ProductList from "../components/productList";
import ProductSkeletonList from "../components/productSkeletonList";
import ProductTabs from "../components/productTabs";
import ProductFilter from "../components/productFilter";
import FilterViewer from "../components/filterViewer";

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
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({
    _page: 1,
    _limit: 9,
    _sort: "salePrice:ASC",
  });

  const [pagination, setPagination] = useState({
    page: 1,
    limit: 9,
  });

  useEffect(() => {
    (async () => {
      try {
        const { data, pagination } = await productApi.getAll(filter);

        setProductList(data);
        setPagination(pagination);
      } catch (error) {
        console.log("Failed for get data", error);
      }

      setLoading(false);
    })();
  }, [filter]);

  function handlePageChange(e, page) {
    e.preventDefault();
    setFilter((prevFilter) => ({
      ...prevFilter,
      _page: page,
    }));
  }

  function handleSortChange(newSort) {
    setFilter((prevFilter) => ({
      ...prevFilter,
      _sort: newSort,
    }));
  }

  function handleFiltersChange(newFilter) {
    setFilter((prevFilter) => ({
      ...prevFilter,
      ...newFilter,
    }));
  }

  function handleFiltersViewerChange(newFilter) {
    setFilter(newFilter);
  }

  return (
    <Box sx={{ pt: "16px" }}>
      <Container>
        <Grid container spacing={1}>
          <Grid item className={classes.left}>
            <ProductFilter
              filter={filter}
              onChange={handleFiltersChange}
            ></ProductFilter>
          </Grid>

          <Grid item className={classes.right}>
            <Paper>
              <ProductTabs
                currentSort={filter._sort}
                onChange={handleSortChange}
              ></ProductTabs>
              <FilterViewer
                filter={filter}
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
