"use client";

import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { useCategoryModal } from "@/hooks/useCategoryModal";

import { Category, columns } from "./columns";

interface CategoriesClientProps {
  data: Category[];
}

export const CategoriesClient: React.FC<CategoriesClientProps> = ({
  data
}) => {
  const categoryModal = useCategoryModal();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title="Categories" description="Manage categories for your store" />
        <Button onClick={categoryModal.onOpen}>
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>
      <DataTable searchKey="name" columns={columns} data={data} />
    </>
  );
};
