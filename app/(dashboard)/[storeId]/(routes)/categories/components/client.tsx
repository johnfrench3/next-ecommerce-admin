"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { ApiAlert } from "@/components/ui/api-alert";

import { columns, CategoryColumn } from "./columns";

interface CategoriesClientProps {
  data: CategoryColumn[];
}

export const CategoriesClient: React.FC<CategoriesClientProps> = ({
  data
}) => {
  const params = useParams();
  const router = useRouter();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={`Categories (${data.length})`} description="Manage categories for your store" />
        <Button onClick={() => router.push(`/${params.storeId}/categories/new`)}>
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data} />
      <Heading title="API" description="API Calls for Categories" />
      <Separator />
      <ApiAlert title="GET" variant="public" description={`/api/${params.storeId}/categories`} />
      <ApiAlert title="GET" variant="public" description={`/api/${params.storeId}/categories/{categoryId}`} />
      <ApiAlert title="POST" variant="admin" description={`/api/${params.storeId}/categories`} />
      <ApiAlert title="PATCH" variant="admin" description={`/api/${params.storeId}/categories/{categoryId}`} />
      <ApiAlert title="DELETE" variant="admin" description={`/api/${params.storeId}/categories/{categoryId}`} />
    </>
  );
};
