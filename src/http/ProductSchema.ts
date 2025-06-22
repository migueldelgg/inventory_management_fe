export type Products = {
  id: string;
  name: string;
  barCode: string;
  description: string;
  stockQuantity: number;
  category: string;
  isActive: boolean;
  productValidity: string;
  imgUrl: string;
};

export const products: Products[] = [
  {
    id: "1a2b3c4d",
    name: "7891000055123",
    barCode: "7891000055123",
    description: "Arroz Branco Tipo 1 - 5kg",
    stockQuantity: 120,
    category: "Alimentos",
    isActive: true,
    productValidity: "2025-03-10",
    imgUrl: "https://example.com/images/arroz.jpg",
  },
  {
    id: "2b3c4d5e",
    name: "7891000055123",
    barCode: "7891000023445",
    description: "Detergente Líquido Neutro - 500ml",
    stockQuantity: 85,
    category: "Limpeza",
    isActive: true,
    productValidity: "2026-01-15",
    imgUrl: "https://example.com/images/detergente.jpg",
  },
  {
    id: "3c4d5e6f",
    name: "7891000055123",
    barCode: "7891000076543",
    description: "Chocolate ao Leite 90g",
    stockQuantity: 45,
    category: "Doces",
    isActive: false,
    productValidity: "2024-10-20",
    imgUrl: "https://example.com/images/chocolate.jpg",
  },
  {
    id: "4d5e6f7g",
    name: "7891000055123",
    barCode: "7891000088888",
    description: "Leite Integral 1L",
    stockQuantity: 200,
    category: "Bebidas",
    isActive: true,
    productValidity: "2025-01-01",
    imgUrl: "https://example.com/images/leite.jpg",
  },
  {
    id: "5e6f7g8h",
    name: "7891000055123",
    barCode: "7891000032123",
    description: "Sabonete em Barra Neutro - 90g",
    stockQuantity: 300,
    category: "Higiene",
    isActive: true,
    productValidity: "2026-06-30",
    imgUrl: "https://example.com/images/sabonete.jpg",
  },
];
