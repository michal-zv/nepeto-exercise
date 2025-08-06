import { List, ListItem, ListItemText, Typography } from "@mui/material";

export default function PriceHistoryList() {
  // const { product } = props;

  const prices = [
    {
      price: "20.22$",
      date: "8/5/2025, 1:30:50 PM",
    },
    {
      price: "80.27$",
      date: "8/5/2025, 1:30:50 PM",
    },
    {
      price: "5.50$",
      date: "8/5/2025, 1:30:50 PM",
    },
    {
      price: "24.27$",
      date: "8/5/2025, 1:30:50 PM",
    },
  ];

  return (
    <List dense={true}>
      {prices.map((price) => (
        <ListItem>
          <ListItemText
            primary={<Typography variant="body2">{price.price}</Typography>}
            secondary={
              <Typography variant="caption" color="text.secondary">
                {price.date}
              </Typography>
            }
          />
        </ListItem>
      ))}
    </List>
  );
}
