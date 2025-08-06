import { Box, CardContent, CardMedia, Rating, Typography } from "@mui/material";

export default function ProductInfo(props) {
  const { product } = props;

  return (
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
  );
}
