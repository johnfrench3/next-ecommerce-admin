"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";

import { ProductColumn, columns } from "./columns";
import { Separator } from "@/components/ui/separator";
import { ApiAlert } from "@/components/ui/api-alert";

interface ProductsClientProps {
  data: ProductColumn[];
};

export const ProductsClient: React.FC<ProductsClientProps> = ({
  data
}) => {
  const params = useParams();
  const router = useRouter();

  return (
    <> 
      <div className="flex items-center justify-between">
        <Heading title={`Products (${data.length})`} description="Manage products for your store" />
        <Button onClick={() => router.push(`/${params.storeId}/products/new`)}>
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data} />
      <Heading title="API" description="API Calls for Products" />
      <Separator />
      <ApiAlert title="GET" description={`${window.location.origin}/api/${params.storeId}/products`} />
      <ApiAlert title="POST" description={`${window.location.origin}/api/${params.storeId}/products`} />
      <ApiAlert title="PATCH" description={`${window.location.origin}/api/${params.storeId}/products/{productId}`} />
      <ApiAlert title="DELETE" description={`${window.location.origin}/api/${params.storeId}/products/{productId}`} />
    </>
  );
};
