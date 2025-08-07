import { Box, Grid } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
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
  const fetchAllProducts = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}products`
      );
      setProducts(response.data);
    } catch (error) {
      toast.error(
        error.response?.data.error ?? error.message ?? "An error occurred"
      );
    } finally {
      setLoading(false); // maybe take out?
    }
  };

  // todo maybe api folder
  const deleteProducts = async (id) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API_URL}products/${id}`
      );
      const updatedArray = products.filter((product) => product.id !== id);
      setProducts(updatedArray);
      toast.success("Successfully deleted!");
    } catch (error) {
      toast.error(
        error.response?.data.error ?? error.message ?? "An error occurred"
      );
    }
  };

  // todo maybe api folder
  const scrapeProducts = async (q) => {
    setLoading(true); // maybe take out?
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}search/${q}`
      );
      setProducts((prev) => [...response.data, ...prev]);
      toast.success("Successfully added!");
    } catch (error) {
      toast.error(
        error.response?.data.error ?? error.message ?? "An error occurred"
      );
    } finally {
      setLoading(false); // maybe take out?
    }
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
      <SearchBar
        query={query}
        setQuery={setQuery}
        externalSearch={scrapeProducts}
      />
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
