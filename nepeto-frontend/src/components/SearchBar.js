import ClearIcon from "@mui/icons-material/Clear";
import LaunchIcon from "@mui/icons-material/Launch";
import SearchIcon from "@mui/icons-material/Search";
import { IconButton, InputBase, Paper, Tooltip } from "@mui/material";
import PropTypes from "prop-types";

const SearchBar = (props) => {
  const { query, setQuery, externalSearch } = props;

  return (
    <Paper
      sx={{
        p: "4px 8px",
        display: "flex",
        alignItems: "center",
        borderRadius: 2,
        maxWidth: 600,
        margin: "auto",
      }}
    >
      <SearchIcon color="action" sx={{ mx: 1 }} />
      <InputBase
        sx={{ ml: 1, flex: 1, fontSize: 16 }}
        placeholder="Search..."
        onChange={(e) => {
          setQuery(e.target.value);
        }}
        value={query}
      />
      {query && (
        <Tooltip title="Clear">
          <IconButton onClick={() => setQuery("")} size="small" color="inherit">
            <ClearIcon />
          </IconButton>
        </Tooltip>
      )}
      <Tooltip title="Search on Walmart">
        <IconButton
          onClick={() => externalSearch(query.trim())}
          size="small"
          color="primary"
          sx={{ ml: 1 }}
          disabled={!query.trim()}
        >
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
