import DeleteIcon from "@mui/icons-material/Delete";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import RefreshIcon from "@mui/icons-material/Refresh";
import { Box, Card, CardActions, IconButton, Tooltip } from "@mui/material";
import PropTypes from "prop-types";
import { Fragment, useState } from "react";
import ProductInfo from "./ProductInfo";
import ProductModal from "./ProductModal";

const ProductCard = (props) => {
  const { product, deleteFunc, refreshFunc } = props;
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <Fragment>
      <Card
        key={product.id}
        variant="outlined"
        sx={{
          minWidth: 300,
          maxWidth: 570,
          minHeight: 300,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <CardActions sx={{ justifyContent: "space-between" }}>
          <Tooltip title="Refresh Price">
            <IconButton onClick={() => refreshFunc(product.id)}>
              <RefreshIcon />
            </IconButton>
          </Tooltip>
          <Box>
            <Tooltip title="More Info">
              <IconButton onClick={handleOpen}>
                <ReadMoreIcon />
              </IconButton>
            </Tooltip>

            <Tooltip title="Delete">
              <IconButton onClick={() => deleteFunc(product.id)}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </CardActions>
        <Box sx={{ flexGrow: 1, overflow: "auto", px: 2 }}>
          <ProductInfo product={product} />
        </Box>
      </Card>
      <ProductModal product={product} isOpen={open} handleOpen={handleOpen} />
    </Fragment>
  );
};

export default ProductCard;

ProductCard.propTypes = {
  product: PropTypes.object.isRequired,
  deleteFunc: PropTypes.func.isRequired,
  refreshFunc: PropTypes.func.isRequired,
};
