import ClearIcon from "@mui/icons-material/Clear";
import LaunchIcon from "@mui/icons-material/Launch";
import SearchIcon from "@mui/icons-material/Search";
import { IconButton, InputBase, Paper, Tooltip } from "@mui/material";
import PropTypes from "prop-types";

const SearchBar = (props) => {
  const { query, setQuery, externalSearch } = props;

  return (
    <Paper sx={{ p: "2px 4px", display: "flex", alignItems: "center" }}>
      <SearchIcon sx={{ ml: 1 }} />
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search..."
        onChange={(e) => {
          setQuery(e.target.value);
        }}
        value={query}
      />
      {query && (
        <Tooltip title="Clear">
          <IconButton onClick={() => setQuery("")}>
            <ClearIcon />
          </IconButton>
        </Tooltip>
      )}
      <Tooltip title="Search on Walmart">
        <IconButton onClick={() => externalSearch(query)}>
          <LaunchIcon />
        </IconButton>
      </Tooltip>
    </Paper>
  );
};

export default SearchBar;

SearchBar.propTypes = {
  query: PropTypes.string.isRequired,
  setQuery: PropTypes.func.isRequired,
  externalSearch: PropTypes.func.isRequired,
};
