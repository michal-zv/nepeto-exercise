import { Box, Grid } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "./Loader";
import PaginatedList from "./PaginatedList";
import ProductCard from "./ProductCard";

export default function ProductGrid() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // todo maybe api folder
  // todo try/catch & success/error toast
  const fetchAllProducts = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}products`
    );
    setProducts(response.data);
    setLoading(false); // maybe take out?
  };

  // todo maybe api folder
  // todo try/catch & success/error toast
  const deleteProducts = async (id) => {
    const response = await axios.delete(
      `${process.env.REACT_APP_API_URL}products/${id}`
    );
    console.log(response);
    const updatedArray = products.filter((product) => product.id !== id);
    setProducts(updatedArray);
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
          <ProductCard
            key={product.id}
            product={product}
            deleteFunc={deleteProducts}
          />
        ))}
      </PaginatedList>
    </Box>
  );
}
