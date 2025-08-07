import HistoryIcon from "@mui/icons-material/History"; // or any relevant icon
import {
  Avatar,
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
    return <Typography color="text.secondary">No price history</Typography>;
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
