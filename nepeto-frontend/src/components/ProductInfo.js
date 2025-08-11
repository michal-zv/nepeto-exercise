import CategoryIcon from "@mui/icons-material/Category";
import SellIcon from "@mui/icons-material/Sell";
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
        <Typography variant="overline" color="text.secondary">
          item id: {product.product_id}
        </Typography>
        <Typography variant="body1" fontWeight="bold">
          {product.title}
        </Typography>
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
          <Typography variant="caption" color="text.secondary">
            {product.rating}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.5,
            marginTop: "auto",
          }}
        >
          <Typography variant="body1" color="text.secondary">
            Sold now for
          </Typography>
          <Typography variant="body1" fontWeight="bold" color="primary.main">
            {product.current_price}
          </Typography>
          <SellIcon fontSize="small" sx={{ color: "primary.main" }} />
        </Box>
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
