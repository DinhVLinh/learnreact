import { Checkbox } from "@material-ui/core";
import { Box, Chip } from "@mui/material";
import { type } from "@testing-library/user-event/dist/type";
import categoryApi from "api/categoryApi";
import PropTypes from "prop-types";
import { useEffect, useMemo, useRef } from "react";

FilterViewer.propTypes = {
  filter: PropTypes.object,
  onChange: PropTypes.func,
};

function GetLabelForView() {
  let labelList = useRef([]);

  useEffect(() => {
    (async () => {
      try {
        const reponse = await categoryApi.getAll();
        // console.log({ reponse });
        labelList.current = reponse.map((x) => ({
          id: x.id,
          name: x.name,
        }));
      } catch (error) {
        console.log("Failed for get cart", error);
      }
    })();
  }, []);

  return labelList.current.forEach((x) => {
    return x.name;
  });
}

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
    getLabel: (filter) => {
      return `Tu ${filter.salePrice_gte} den ${filter.salePrice_lte} `;
    },
    isActive: () => true,
    isVisble: (filter) => {
      if (
        Number.parseInt(filter.salePrice_lte) > 0 ||
        Number.parseInt(filter.salePrice_gte) > 0
      ) {
        return (
          Object.keys(filter).includes("salePrice_lte") &&
          Object.keys(filter).includes("salePrice_gte")
        );
      }
    },
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
    getLabel: (filter) => {
      console.log(filter);
      let filterName = "";
      const filterId = +filter["category.id"];
      switch (filterId) {
        case 1:
          filterName = "Thời trang";
          break;
        case 2:
          filterName = "Khẩu trang";
          break;
        case 3:
          filterName = "Làm đẹp";
          break;
        case 4:
          filterName = "Laptop";
          break;
        case 5:
          filterName = "Ổ cứng";
          break;
        case 6:
          filterName = "Điện thoại";
          break;

        default:
          break;
      }

      return filterName;
    },
    isActive: () => true,
    isVisble: (filter) => filter["category.id"],
    isRemoveAble: true,
    onRemove: (filter) => {
      delete filter["category.id"];
    },
    onToggle: () => {},
  },

  {
    id: 5,
    getLabel: () => "Xoa tat ca",
    isActive: () => true,
    isVisble: () => true,
    isRemoveAble: false,
    onRemove: () => {},
    onToggle: (filters) => {
      const newFilter = { ...filters };
      delete newFilter.isFreeShip;
      delete newFilter.isPromotion;
      delete newFilter["category.id"];
      delete newFilter.salePrice_lte;
      delete newFilter.salePrice_gte;

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
