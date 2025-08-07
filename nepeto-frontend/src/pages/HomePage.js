import { Box, Grid } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import PaginatedList from "../components/PaginatedList";
import ProductCard from "../components/ProductCard";
import SearchBar from "../components/SearchBar";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [filteredProducts, setFilteredProducts] = useState([]);
  const [query, setQuery] = useState("");

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
    setFilteredProducts(updatedArray);
  };

  const searchInGrid = async (q) => {
    const updatedArray = products.filter(
      (product) =>
        product.title.toLowerCase().includes(q.toLowerCase()) ||
        product.product_id.includes(q)
    );
    setFilteredProducts(updatedArray);
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  // todo maybe add timeout to setQuery
  useEffect(() => {
    if (!query) {
      setFilteredProducts(products);
    } else {
      searchInGrid(query);
    }
  }, [query, products]);

  if (loading) {
    return <Loader />;
  }

  return (
    <Box>
      <SearchBar setQuery={setQuery} />
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
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            deleteFunc={deleteProducts}
          />
        ))}
      </PaginatedList>
    </Box>
  );
};

export default HomePage;
