import React from "react";
import PropTypes from "prop-types";
import { Box, Typography } from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error";

ErrorMessage.propTypes = {};

function ErrorMessage({ messages }) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", mt: "10px" }}>
      <ErrorIcon color="error" sx={{ width: "14px" }} />
      <Typography color="error.main" variant="span" fontSize="12px" ml={"6px"}>
        {messages}
      </Typography>
    </Box>
  );
}

export default ErrorMessage;
