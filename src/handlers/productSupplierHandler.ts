/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ProductSupplierAssociation } from "@/http/SuppliersSchema copy";
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
      `Erro ao buscar fornecedores associados ao produto ${productId}`,
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

export async function getAllProductsWithSuppliers(): Promise<
  ProductSupplierAssociation[]
> {
  try {
    console.log("getAllProductsWithSuppliers");
    const response = await api.get("/products/suppliers");
    const rawData = response.data as any[];

    // Transforma o response em múltiplos ProductSupplierAssociation
    const mapped: ProductSupplierAssociation[] = rawData.flatMap((product) =>
      product.suppliers.map((supplier: any) => ({
        productId: product.id,
        productName: product.name,
        category: product.category,
        isActive: true, // se quiser vir do backend depois, troque por product.isActive
        supplierId: supplier.id,
        supplierName: supplier.companyName,
      }))
    );

    return mapped;
  } catch (error: any) {
    console.error(
      `Erro ao buscar fornecedores associados ao produto:`,
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
