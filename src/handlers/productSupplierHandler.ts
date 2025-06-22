/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from "@/lib/axios";

export async function linkSupplierToProduct(
  productId: string,
  supplierId: string
) {
  try {
    console.log("linkSupplierToProduct - product ID", productId);
    console.log("linkSupplierToProduct - supplier ID", supplierId);
    const response = await api.post(
      `/products/${productId}/suppliers/${supplierId}`
    );
    console.log("linkSupplierToProduct - response data:", response.data);
    return response.data;
  } catch (error: any) {
    console.error(
      "Erro ao criar linkSupplierToProduct:",
      error?.response || error
    );
    alert(
      `Erro ao linkar fornecedor a produto:\n${JSON.stringify(
        error?.response?.data || error,
        null,
        2
      )}`
    );
    throw error;
  }
}

export async function unlinkSupplierFromProduct(
  productId: string,
  supplierId: string
) {
  try {
    console.log("linkSupplierToProduct - product ID", productId);
    console.log("linkSupplierToProduct - supplier ID", supplierId);
    const response = await api.delete(
      `/products/${productId}/suppliers/${supplierId}`
    );
    console.log("linkSupplierToProduct - response data:", response.data);
    return response.data;
  } catch (error: any) {
    console.error(
      "Erro ao criar linkSupplierToProduct:",
      error?.response || error
    );
    alert(
      `Erro ao desvincular fornecedor a produto:\n${JSON.stringify(
        error?.response?.data || error,
        null,
        2
      )}`
    );
    throw error;
  }
}

export async function getSuppliersFromProductId(productId: string) {
  try {
    console.log("getSuppliersFromProductId - productId:", productId);
    const response = await api.get(`/products/${productId}/suppliers`);
    console.log("getSuppliersFromProductId - response data:", response.data);
    return response.data;
  } catch (error: any) {
    console.error(
      `Erro ao buscar fornecedores associados ao produto ${productId} produto:`,
      error?.response || error
    );
    alert(
      `Erro ao buscar fornecedores associados ao produto:\n${JSON.stringify(
        error?.response?.data || error,
        null,
        2
      )}`
    );
    throw error;
  }
}
