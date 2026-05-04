import { useQuery } from "@tanstack/react-query";
import api from "../services/api";

const fetchProducts = async () => {
  const { data } = await api.get("/products");
  return data;
};

export const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });
};