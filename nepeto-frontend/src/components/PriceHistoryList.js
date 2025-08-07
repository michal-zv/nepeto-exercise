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
import { Fragment } from "react";
import PaginatedList from "./PaginatedList";

export default function PriceHistoryList(props) {
  const { prices } = props;

  // todo util
  const parseDate = (rawDate) => {
    return new Date(rawDate).toLocaleString();
  };

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
}
