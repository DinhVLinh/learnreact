import { Box, makeStyles } from "@material-ui/core";
import { Link } from "@mui/material";
import { NavLink, useRouteMatch } from "react-router-dom/cjs/react-router-dom";

ProductMenu.propTypes = {};
const useStyle = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexFlow: "row nowrap",
    justifyContent: " center",

    padding: 0,
    listStyle: "none",

    "& > li": {
      padding: theme.spacing(2, 4),
    },

    "& > li > a": {
      color: theme.palette.grey[700],
      textDecoration: "none",
    },

    "& > li > a.active": {
      color: theme.palette.primary.main,
      textDecoration: "underline",
    },
  },
}));
function ProductMenu(props) {
  const classes = useStyle();
  const match = useRouteMatch();
  return (
    <Box component="ul" className={classes.root}>
      <li>
        <Link component={NavLink} to={match.url} exact>
          Desciption
        </Link>
      </li>
      <li>
        <Link component={NavLink} to={`${match.url}/additional`} exact>
          Additional Information
        </Link>
      </li>
      <li>
        <Link component={NavLink} to={`${match.url}/reviews`} exact>
          Reviews
        </Link>
      </li>
    </Box>
  );
}

export default ProductMenu;
