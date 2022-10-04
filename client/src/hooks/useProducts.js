import { useQuery } from "react-query";
import ProductRequests from "api/product.requests";

const useProducts = () => {
  const getProductsQuery = useQuery("products", ProductRequests.getMany);
  return { getProductsQuery };
};

export default useProducts;
