import CloseIcon from "@mui/icons-material/Close";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import {
  Box,
  Button,
  Card,
  IconButton,
  Modal,
  Typography,
} from "@mui/material";
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

  const openInNewTab = (url) => {
    window.open(url, "_blank", "noreferrer");
  };

  const parseDate = (rawDate) => {
    return new Date(rawDate).toLocaleString();
  };

  return (
    <Modal open={isOpen} onClose={handleOpen}>
      <Box sx={style}>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <IconButton onClick={handleOpen}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Card key={product.id} variant="outlined" sx={{ mx: "auto", mt: 2 }}>
          <ProductInfo product={product} />
        </Card>
        <Typography
          variant="caption"
          sx={{ color: "text.secondary", mt: 2, textAlign: "right" }}
        >
          Last Updated: {parseDate(product.last_update)}
        </Typography>
        <PriceHistoryList />
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
