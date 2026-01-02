import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../api/productClient";

export const PRODUCTS_QUERY_KEY = ["products"] as const;

export function useProductsList() {
  return useQuery({
    queryKey: PRODUCTS_QUERY_KEY,
    queryFn: fetchProducts,
    staleTime: 60_000,
	  refetchOnWindowFocus: false,
  });
}
