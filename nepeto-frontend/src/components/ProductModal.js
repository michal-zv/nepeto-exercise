import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { Box, Button, Divider, Modal, Typography } from "@mui/material";
import PriceHistoryList from "./PriceHistoryList";
import ProductInfo from "./ProductInfo";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 450,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 2,
};

export default function ProductModal(props) {
  const { product, isOpen, handleOpen } = props;

  // todo util
  const openInNewTab = (url) => {
    window.open(url, "_blank", "noreferrer");
  };

  // todo util
  const parseDate = (rawDate) => {
    return new Date(rawDate).toLocaleString();
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
          }}
        >
          Last Updated: {parseDate(product.last_update)}
        </Typography>
        <Divider textAlign="left">MORE INFO</Divider>
        <ProductInfo product={product} />

        <Divider textAlign="left">PRICE HISTORY</Divider>
        <PriceHistoryList prices={product.price_history} />
        <Divider textAlign="left">ACTIONS</Divider>
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
}
