/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Products } from "@/http/ProductSchema";
import { api } from "@/lib/axios";

export async function createProduct(product: Omit<Products, "id">) {
  try {
    console.log("createProduct - request payload:", product);
    const response = await api.post("/products", product);
    console.log("createProduct - response data:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("Erro ao criar produto:", error?.response || error);
    alert(
      `Erro ao criar produto:\n${JSON.stringify(
        error?.response?.data || error,
        null,
        2
      )}`
    );
    throw error;
  }
}

export async function deleteProductById(id: string) {
  try {
    console.log("deleteProductById - request id:", id);
    const response = await api.delete(`/products/${id}`);
    console.log("deleteProductById - response data:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("Erro ao deletar produto:", error?.response || error);
    alert(
      `Erro ao deletar produto:\n${JSON.stringify(
        error?.response?.data || error,
        null,
        2
      )}`
    );
    throw error;
  }
}

export async function updateProductById(id: string, data: Partial<Products>) {
  try {
    console.log("updateProductById - request id:", id);
    console.log("updateProductById - request data:", data);
    const response = await api.put(`/products/${id}`, data);
    console.log("updateProductById - response data:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("Erro ao atualizar produto:", error?.response || error);
    alert(
      `Erro ao atualizar produto:\n${JSON.stringify(
        error?.response?.data || error,
        null,
        2
      )}`
    );
    throw error;
  }
}
