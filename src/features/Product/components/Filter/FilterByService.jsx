import React from "react";
import PropTypes from "prop-types";
import { Box, FormControlLabel, Typography } from "@mui/material";
import { Checkbox } from "@material-ui/core";

FilterByService.propTypes = {
  onChange: PropTypes.func,
  filter: PropTypes.object,
};

function FilterByService({ filter, onChange }) {
  function handleChange(e) {
    if (!onChange) return;
    const { name, checked } = e.target;
    onChange({ [name]: checked });
  }
  return (
    <Box>
      <Typography>Dịch Vụ</Typography>
      <ul style={{ listStyle: "none" }}>
        {[
          { value: "isPromotion", label: "Khuyến mãi" },
          { value: "isFreeShip", label: "Miễn phí vận chuyển" },
        ].map((service, index) => (
          <li key={index}>
            {
              <FormControlLabel
                control={
                  <Checkbox
                    checked={filter[service.value]}
                    name={service.value}
                    onChange={handleChange}
                    color="primary"
                  />
                }
                label={service.label}
              />
            }
          </li>
        ))}
      </ul>
    </Box>
  );
}

export default FilterByService;
