"use client";

import { Edit, MoreHorizontal, Trash } from "lucide-react";

import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { useProductModal } from "@/hooks/use-product-modal";

import { Product } from "./columns";

interface CellActionProps {
  data: Product;
}

export const CellAction: React.FC<CellActionProps> = ({
  data,
}) => {
  const productModal = useProductModal();

  return ( 
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem
          onClick={() => productModal.onEdit(data.id)}
        >
          <Edit className="mr-2 h-4 w-4" /> Update
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => navigator.clipboard.writeText(data.id)}
        >
          <Trash className="mr-2 h-4 w-4" /> Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
