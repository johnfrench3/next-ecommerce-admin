"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { ApiAlert } from "@/components/ui/api-alert";

import { columns, SizeColumn } from "./columns";

interface SizesClientProps {
  data: SizeColumn[];
}

export const SizesClient: React.FC<SizesClientProps> = ({
  data
}) => {
  const params = useParams();
  const router = useRouter();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={`Sizes (${data.length})`} description="Manage sizes for your products" />
        <Button onClick={() => router.push(`/${params.storeId}/sizes/new`)}>
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data} />
      <Heading title="API" description="API Calls for Sizes" />
      <Separator />
      <ApiAlert title="GET" variant="public" description={`${window.location.origin}/api/${params.storeId}/sizes`} />
      <ApiAlert title="GET" variant="public" description={`${window.location.origin}/api/${params.storeId}/sizes/{sizeId}`} />
      <ApiAlert title="POST" variant="admin" description={`${window.location.origin}/api/${params.storeId}/sizes`} />
      <ApiAlert title="PATCH" variant="admin" description={`${window.location.origin}/api/${params.storeId}/sizes/{sizeId}`} />
      <ApiAlert title="DELETE" variant="admin" description={`${window.location.origin}/api/${params.storeId}/sizes/{sizeId}`} />
    </>
  );
};
