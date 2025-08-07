import { Search } from "@mui/icons-material";
import { InputBase, Paper } from "@mui/material";

const SearchBar = (props) => {
  const { setQuery } = props;

  return (
    <Paper sx={{ p: "2px 4px", display: "flex", alignItems: "center" }}>
      <Search />
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search..."
        onChange={(e) => {
          if (e.target.value.length !== 1) {
            setQuery(e.target.value);
          }
        }}
      />
    </Paper>
  );
};

export default SearchBar;
