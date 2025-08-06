import DeleteIcon from "@mui/icons-material/Delete";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import RefreshIcon from "@mui/icons-material/Refresh";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Rating,
  Typography,
} from "@mui/material";

export default function ProductCard(props) {
  const { product } = props;

  return (
    <Card
      key={product.id}
      variant="outlined"
      sx={{ minWidth: 275, maxWidth: 400 }}
    >
      <Box sx={{ display: "flex" }}>
        <CardContent>
          <Typography variant="overline" sx={{ color: "text.secondary" }}>
            item id: {product.product_id}
          </Typography>
          <Typography>{product.title}</Typography>
          <Typography variant="caption" sx={{ color: "text.secondary" }}>
            <Rating
              size="small"
              defaultValue={product.rating}
              precision={0.1}
              readOnly
            />
            {product.rating}
          </Typography>
          <Typography>Current Price: {product.current_price}</Typography>
        </CardContent>
        <CardMedia
          component="img"
          sx={{ width: 150 }}
          image={product.image_url}
          alt={product.title}
        />
      </Box>
      <CardActions disableSpacing>
        <IconButton>
          <RefreshIcon />
        </IconButton>
        <IconButton aria-label="delete">
          <DeleteIcon />
        </IconButton>
        <IconButton aria-label="delete">
          <ReadMoreIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}
