import { Paper } from "@material-ui/core";
import PropTypes from "prop-types";
import DOMPurify from "dompurify";

ProductDesc.propTypes = {
  product: PropTypes.object,
};

function ProductDesc({ product }) {
  const safeDesc = DOMPurify.sanitize(product.description);
  return (
    <Paper style={{ padding: "15px" }}>
      <div dangerouslySetInnerHTML={{ __html: safeDesc }}></div>
    </Paper>
  );
}

export default ProductDesc;
