import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { Box, Button, Divider, Modal, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { parseDate } from "../utils/dateUtils";
import { openInNewTab } from "../utils/windowUtils";
import PriceHistoryList from "./PriceHistoryList";
import ProductInfo from "./ProductInfo";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 450,
  maxHeight: "80vh",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 3,
  overflowY: "auto",
};

const ProductModal = (props) => {
  const { product, isOpen, handleOpen } = props;

  const titleDivider = (title) => {
    return (
      <Divider textAlign="left" sx={{ color: "text.secondary", my: 2 }}>
        {title}
      </Divider>
    );
  };

  return (
    <Modal open={isOpen} onClose={handleOpen}>
      <Box sx={style}>
        <Typography
          variant="caption"
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            color: "text.secondary",
            mb: 1,
          }}
        >
          Last Updated: {parseDate(product.last_update)}
        </Typography>
        {titleDivider("More Info")}
        <ProductInfo product={product} />
        {titleDivider("Price History")}
        <PriceHistoryList prices={product.price_history} />
        {titleDivider("Actions")}
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
          <Button
            variant="contained"
            startIcon={<OpenInNewIcon />}
            onClick={() => openInNewTab(product.product_url)}
          >
            Open In Walmart
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ProductModal;

ProductModal.propTypes = {
  product: PropTypes.object.isRequired,
  isOpen: PropTypes.bool.isRequired,
  handleOpen: PropTypes.func.isRequired,
};
