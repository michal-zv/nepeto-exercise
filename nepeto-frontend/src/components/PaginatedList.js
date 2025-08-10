import { Box, Pagination } from "@mui/material";
import PropTypes from "prop-types";
import React, { useState } from "react";

const PaginatedList = (props) => {
  const { children, itemsPerPage, containerProps = {} } = props;

  const [page, setPage] = useState(1);
  const count = React.Children.count(children);

  const pageCount = Math.ceil(count / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const visibleChildren = React.Children.toArray(children).slice(
    startIndex,
    endIndex
  );

  const handleChange = (e, value) => {
    setPage(value);
  };

  return (
    <Box>
      <Box {...containerProps}>{visibleChildren}</Box>
      <Box display="flex" justifyContent="center" mt={2}>
        <Pagination
          count={pageCount}
          page={page}
          onChange={handleChange}
          color="primary"
          size="small"
        />
      </Box>
    </Box>
  );
};

export default PaginatedList;

PaginatedList.propTypes = {
  children: PropTypes.node.isRequired,
  itemsPerPage: PropTypes.number.isRequired,
  containerProps: PropTypes.object,
};
