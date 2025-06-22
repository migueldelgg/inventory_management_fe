import type { Products } from "@/http/ProductSchema";

export async function deleteProductById(id: string) {
  try {
    const res = await fetch(`/api/products/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      throw new Error("Erro ao excluir o produto");
    }
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function updateProductById(id: string, data: Partial<Products>) {
  try {
    const res = await fetch(`/api/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error("Erro ao atualizar o produto");
  } catch (err) {
    console.error(err);
    throw err;
  }
}
