import { Product } from "./components/columns"
import { ProductsClient } from "./components/client";

async function getData(): Promise<Product[]> {
  return [
    {
      id: "728ed52f",
      name: "Zip Tote Basket",
      price: "$10.99",
      category: "Men",
      createdAt: "June 13th, 2023",
    },
  ];
};

const ProductsPage = async () => {
  const data = await getData()

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductsClient data={data} />
      </div>
    </div>
  );
};

export default ProductsPage;

