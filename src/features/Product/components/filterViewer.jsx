import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { Box, Chip } from "@mui/material";
import { Checkbox } from "@material-ui/core";

FilterViewer.propTypes = {
  filter: PropTypes.object,
  onChange: PropTypes.func,
};

const FILTER_LIST = [
  {
    id: 1,
    getLabel: () => "Giao hang mien phi",
    isActive: (filter) => filter.isFreeShip,
    isVisble: () => true,
    isRemoveAble: false,
    onRemove: () => {},
    onToggle: (filters) => {
      const newFilter = { ...filters };
      if (newFilter.isFreeShip) {
        delete newFilter.isFreeShip;
      } else {
        newFilter.isFreeShip = true;
      }

      return newFilter;
    },
  },
  {
    id: 2,
    getLabel: () => "Co khuyen mai",
    isActive: () => true,
    isVisble: (filter) => filter.isPromotion,
    isRemoveAble: true,
    onRemove: (filter) => {
      const newFilter = { ...filter };
      delete newFilter.isPromotion;

      return newFilter;
    },
    onToggle: () => {},
  },

  {
    id: 3,
    getLabel: (filter) =>
      `Tu ${filter.salePrice_lte} den ${filter.salePrice_gte} `,
    isActive: () => true,
    isVisble: (filter) =>
      Object.keys(filter).includes("salePrice_lte") &&
      Object.keys(filter).includes("salePrice_gte"),
    isRemoveAble: true,
    onRemove: (filter) => {
      const newFilter = { ...filter };
      delete newFilter.salePrice_lte;
      delete newFilter.salePrice_gte;

      return newFilter;
    },
    onToggle: () => {},
  },

  {
    id: 4,
    getLabel: () => "Xoa tat ca",
    isActive: () => true,
    isVisble: () => true,
    isRemoveAble: false,
    onRemove: () => {},
    onToggle: (filters) => {
      const newFilter = { ...filters };
      if (newFilter.isFreeShip) {
        delete newFilter.isFreeShip;
        delete newFilter.isPromotion;
        delete newFilter.salePrice_lte;
        delete newFilter.salePrice_gte;
        <Checkbox checked={false} />;
      }
      return newFilter;
    },
  },
];

function FilterViewer({ filter, onChange }) {
  const visibleFilters = useMemo(() => {
    return FILTER_LIST.filter((x) => x.isVisble(filter));
  }, [filter]);
  return (
    <Box component="ul" sx={{ display: "flex", listStyle: " none" }}>
      {visibleFilters.map((x) => (
        <li key={x.id}>
          <Chip
            label={x.getLabel(filter)}
            color={x.isActive(filter) ? "primary" : "default"}
            clickable={!x.isRemoveAble}
            onClick={
              x.isRemoveAble
                ? null
                : () => {
                    if (!onChange) return;

                    const newFilter = x.onToggle(filter);
                    onChange(newFilter);
                  }
            }
            onDelete={
              x.isRemoveAble
                ? () => {
                    if (!onChange) return;

                    const newFilter = x.onRemove(filter);
                    onChange(newFilter);
                  }
                : null
            }
          />
        </li>
      ))}
    </Box>
  );
}

export default FilterViewer;
