/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from "@/lib/axios";

export async function getProductsFromSupplierId(supplierId: string) {
  try {
    console.log("getProductsFromSupplierId - supplierId:", supplierId);
    const response = await api.get(`/products/${supplierId}/suppliers`);
    console.log("getProductsFromSupplierId - response data:", response.data);
    return response.data;
  } catch (error: any) {
    console.error(
      `Erro ao buscar fornecedores associados ao fornecedor ${supplierId} produto:`,
      error?.response || error
    );
    alert(
      `Erro ao buscar produtos associados ao fornecedor:\n${JSON.stringify(
        error?.response?.data || error,
        null,
        2
      )}`
    );
    throw error;
  }
}
