import type { Products } from "@/http/ProductSchema";
import { api } from "@/lib/axios";

export async function createProduct(product: Omit<Products, "id">) {
  console.log("createProduct - request payload:", product);
  const response = await api.post("/products", product);
  console.log("createProduct - response data:", response.data);
  return response.data;
}

export async function deleteProductById(id: string) {
  console.log("deleteProductById - request id:", id);
  const response = await api.delete(`/products/${id}`);
  console.log("deleteProductById - response data:", response.data);
  return response.data;
}

export async function updateProductById(id: string, data: Partial<Products>) {
  console.log("updateProductById - request id:", id);
  console.log("updateProductById - request data:", data);
  const response = await api.put(`/products/${id}`, data);
  console.log("updateProductById - response data:", response.data);
  return response.data;
}
