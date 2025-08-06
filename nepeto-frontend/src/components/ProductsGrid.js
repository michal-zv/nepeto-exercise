import { Grid } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "./Loader";
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

  console.log(products);
  return (
    <Grid
      container
      spacing={2}
      sx={{ display: "flex", justifyContent: "center" }}
    >
      {loading ? (
        <Loader />
      ) : (
        products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))
      )}
    </Grid>
  );
}
