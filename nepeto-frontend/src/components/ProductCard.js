import DeleteIcon from "@mui/icons-material/Delete";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import RefreshIcon from "@mui/icons-material/Refresh";
import { Box, Card, CardActions, IconButton } from "@mui/material";
import { useState } from "react";
import ProductInfo from "./ProductInfo";
import ProductModal from "./ProductModal";

export default function ProductCard(props) {
  const { product } = props;
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <Box>
      <Card
        key={product.id}
        variant="outlined"
        sx={{ minWidth: 275, maxWidth: 400 }}
      >
        <ProductInfo product={product} />
        <CardActions disableSpacing>
          <IconButton>
            <RefreshIcon />
          </IconButton>
          <IconButton aria-label="delete">
            <DeleteIcon />
          </IconButton>
          <IconButton aria-label="info" onClick={handleOpen}>
            <ReadMoreIcon />
          </IconButton>
        </CardActions>
      </Card>
      <ProductModal product={product} isOpen={open} handleOpen={handleOpen} />
    </Box>
  );
}
