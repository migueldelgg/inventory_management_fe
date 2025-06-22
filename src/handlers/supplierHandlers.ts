/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Suppliers } from "@/http/SuppliersSchema";
import { api } from "@/lib/axios";

export async function createSupplier(supplier: Omit<Suppliers, "id">) {
  try {
    console.log("createSupplier - request payload:", supplier);
    const response = await api.post("/suppliers", supplier);
    console.log("createSupplier - response data:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("Erro ao criar fornecedor:", error?.response || error);
    alert(
      `Erro ao criar fornecedor:\n${JSON.stringify(
        error?.response?.data || error,
        null,
        2
      )}`
    );
    throw error;
  }
}

export async function deleteSupplierById(id: string) {
  try {
    console.log("deleteSupplierById - request id:", id);
    const response = await api.delete(`/suppliers/${id}`);
    console.log("deleteSupplierById - response data:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("Erro ao deletar fornecedor:", error?.response || error);
    alert(
      `Erro ao deletar fornecedor:\n${JSON.stringify(
        error?.response?.data || error,
        null,
        2
      )}`
    );
    throw error;
  }
}

export async function updateSupplierById(id: string, data: Partial<Suppliers>) {
  try {
    console.log("updateSupplierById - request id:", id);
    console.log("updateSupplierById - request data:", data);
    const response = await api.put(`/suppliers/${id}`, data);
    console.log("updateSupplierById - response data:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("Erro ao atualizar fornecedor:", error?.response || error);
    alert(
      `Erro ao atualizar fornecedor:\n${JSON.stringify(
        error?.response?.data || error,
        null,
        2
      )}`
    );
    throw error;
  }
}
