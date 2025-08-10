import { Box, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  deleteProductById,
  getAllProducts,
  scrapeProductsByQuery,
} from "../api/product";
import Loader from "../components/Loader";
import PaginatedList from "../components/PaginatedList";
import ProductCard from "../components/ProductCard";
import SearchBar from "../components/SearchBar";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [filteredProducts, setFilteredProducts] = useState([]);
  const [query, setQuery] = useState("");

  const fetchAllProducts = async () => {
    try {
      const data = await getAllProducts();
      setProducts(data);
    } catch (error) {
      toast.error(
        error.response?.data.error ?? error.message ?? "An error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id) => {
    try {
      const data = await deleteProductById(id);
      setProducts(products.filter((product) => product.id !== id));
      toast.success("Successfully deleted!");
    } catch (error) {
      toast.error(
        error.response?.data.error ?? error.message ?? "An error occurred"
      );
    }
  };

  const scrapeProducts = async (q) => {
    setLoading(true); // maybe take out?
    try {
      const data = await scrapeProductsByQuery(q);
      setProducts((prev) => [...data, ...prev]);
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
            deleteFunc={deleteProduct}
          />
        ))}
      </PaginatedList>
    </Box>
  );
};

export default HomePage;
