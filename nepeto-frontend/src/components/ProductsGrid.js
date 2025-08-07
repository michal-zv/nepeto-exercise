import { Box, Grid } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "./Loader";
import PaginatedList from "./PaginatedList";
import ProductCard from "./ProductCard";

export default function ProductGrid() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAllProducts = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}products`
    );
    setProducts(response.data);
    setLoading(false); // maybe take out?
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <Box>
      <PaginatedList
        itemsPerPage={12}
        containerProps={{
          component: Grid,
          container: true,
          spacing: 2,
          display: "flex",
          justifyContent: "center",
        }}
      >
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </PaginatedList>
    </Box>
  );
}
