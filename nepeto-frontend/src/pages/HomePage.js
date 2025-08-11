import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import { Box, Grid } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  deleteProductById,
  getAllProducts,
  scrapeProductsByQuery,
  updatePriceById,
} from "../api/product";
import Loader from "../components/Loader";
import PaginatedList from "../components/PaginatedList";
import ProductCard from "../components/ProductCard";
import SearchBar from "../components/SearchBar";
import { handleErrorToast } from "../utils/toastUtils";

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
      handleErrorToast(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id) => {
    try {
      await deleteProductById(id);
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== id)
      );
      toast.success("Successfully deleted!");
    } catch (error) {
      handleErrorToast(error);
    }
  };

  const refreshPrice = async (id) => {
    setLoading(true);
    try {
      const data = await updatePriceById(id);
      setProducts((prevProducts) =>
        prevProducts.map((product) => (product.id === data.id ? data : product))
      );
      toast.success("Successfully updated!");
    } catch (error) {
      handleErrorToast(error);
    } finally {
      setLoading(false);
    }
  };

  const scrapeProducts = async (query) => {
    setLoading(true);
    try {
      const data = (await scrapeProductsByQuery(query)) || {
        products: [],
        created: 0,
        updated: 0,
      };
      setProducts((prevProducts) => {
        const combined = [...data.products, ...prevProducts];
        const uniqueMap = new Map();
        combined.forEach((product) => uniqueMap.set(product.id, product));
        return Array.from(uniqueMap.values());
      });
      toast.success(
        `Successfully added ${data.created} new products and updated ${data.updated} existing products.`
      );
    } catch (error) {
      handleErrorToast(error);
    } finally {
      setLoading(false);
    }
  };

  const searchInGrid = useCallback(
    (query) => {
      const lower = query.toLowerCase();
      const updatedArray = products.filter(
        (product) =>
          product.title.toLowerCase().includes(lower) ||
          product.product_id.includes(query)
      );
      setFilteredProducts(updatedArray);
    },
    [products]
  );

  useEffect(() => {
    fetchAllProducts();
  }, []);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (!query) {
        setFilteredProducts(products);
      } else {
        searchInGrid(query);
      }
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [query, products, searchInGrid]);

  return (
    <Box>
      <SearchBar
        query={query}
        setQuery={setQuery}
        externalSearch={scrapeProducts}
      />
      <Loader isOpen={loading} />
      {filteredProducts.length === 0 ? (
        <Box
          sx={{
            mt: 4,
            textAlign: "center",
            color: "text.secondary",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 1,
          }}
        >
          <ProductionQuantityLimitsIcon fontSize="large" />
          No products found. Try a different search or add new products.
        </Box>
      ) : (
        <PaginatedList
          itemsPerPage={8}
          containerProps={{
            component: Grid,
            container: true,
            spacing: 3,
            display: "flex",
            justifyContent: "center",
            columns: { xs: 12, sm: 6, md: 4, lg: 3 },
            sx: {
              padding: 2,
              margin: "0 auto",
            },
          }}
        >
          {filteredProducts.map((product) => (
            <Grid key={product.id}>
              <ProductCard
                product={product}
                deleteFunc={deleteProduct}
                refreshFunc={refreshPrice}
              />
            </Grid>
          ))}
        </PaginatedList>
      )}
    </Box>
  );
};

export default HomePage;
