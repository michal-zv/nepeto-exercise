import CategoryIcon from "@mui/icons-material/Category";
import {
  Box,
  CardContent,
  CardMedia,
  Chip,
  Rating,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";

const ProductInfo = (props) => {
  const { product } = props;

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <CardContent
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          minHeight: 200,
        }}
      >
        <Typography variant="overline" sx={{ color: "text.secondary" }}>
          item id: {product.product_id}
        </Typography>
        <Typography variant="h6">{product.title}</Typography>
        {product.category != null && (
          <Chip
            icon={<CategoryIcon />}
            label={product.category}
            size="small"
            sx={{ mb: 1, alignSelf: "start" }}
          />
        )}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
          <Rating
            size="small"
            defaultValue={product.rating}
            precision={0.1}
            readOnly
          />
          <Typography variant="caption" sx={{ color: "text.secondary" }}>
            {product.rating}
          </Typography>
        </Box>
        <Typography variant="subtitle1" sx={{ marginTop: "auto" }}>
          Current Price: {product.current_price}
        </Typography>
      </CardContent>
      <CardMedia
        component="img"
        sx={{ width: 150 }}
        image={product.image_url}
        alt={product.title}
      />
    </Box>
  );
};

export default ProductInfo;

ProductInfo.propTypes = {
  product: PropTypes.object.isRequired,
};
