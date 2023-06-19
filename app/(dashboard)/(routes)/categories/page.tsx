import { Category } from "./components/columns"
import { CategoriesClient } from "./components/client";

async function getData(): Promise<Category[]> {
  return [
    {
      id: "728ed52f",
      name: "Men",
      createdAt: "June 13th, 2023",
    },
    {
      id: "728ed52f",
      name: "Women",
      createdAt: "June 13th, 2023",
    },
    {
      id: "728ed52f",
      name: "Beauty",
      createdAt: "June 13th, 2023",
    },
  ];
};

const CategoriesPage = async () => {
  const data = await getData()

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoriesClient data={data} />
      </div>
    </div>
  );
};

export default CategoriesPage;

