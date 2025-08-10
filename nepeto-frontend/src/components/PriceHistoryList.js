import HistoryIcon from "@mui/icons-material/History";
import {
  Avatar,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";
import { Fragment } from "react";
import { parseDate } from "../utils/dateUtils";
import PaginatedList from "./PaginatedList";

const PriceHistoryList = (props) => {
  const { prices } = props;

  if (prices.length === 0) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        py={2}
        color="text.secondary"
      >
        <HistoryIcon fontSize="large" sx={{ mb: 1 }} />
        <Typography variant="body1">No price history found</Typography>
      </Box>
    );
  }

  return (
    <List dense={true}>
      <PaginatedList itemsPerPage={5}>
        {prices.map((price, index) => (
          <Fragment key={index}>
            <ListItem key={price.id}>
              <ListItemAvatar>
                <Avatar>
                  <HistoryIcon fontSize="small" />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography variant="body2">{price.old_price}</Typography>
                }
                secondary={
                  <Typography variant="caption" color="text.secondary">
                    Changed at {parseDate(price.changed_at)}
                  </Typography>
                }
              />
            </ListItem>
          </Fragment>
        ))}
      </PaginatedList>
    </List>
  );
};

export default PriceHistoryList;

PriceHistoryList.propTypes = {
  prices: PropTypes.array.isRequired,
};
