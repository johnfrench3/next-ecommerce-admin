"use client";

import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { useProductModal } from "@/hooks/use-product-modal";

import { ProductColumn, columns } from "./columns";

interface ProductsClientProps {
  data: ProductColumn[];
};

export const ProductsClient: React.FC<ProductsClientProps> = ({
  data
}) => {
  const productModal = useProductModal();

  return (
    <> 
      <div className="flex items-center justify-between">
        <Heading title="Products" description="Manage products for your store" />
        <Button onClick={productModal.onOpen}>
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>
      <DataTable searchKey="name" columns={columns} data={data} />
    </>
  );
};
