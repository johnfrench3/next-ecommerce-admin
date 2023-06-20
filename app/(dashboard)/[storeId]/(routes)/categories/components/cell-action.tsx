"use client";

import { useState } from "react";
import { Edit, MoreHorizontal, Trash } from "lucide-react";

import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { useCategoryModal } from "@/hooks/use-category-modal";
import { AlertModal } from "@/components/modals/alert-modal";

import { CategoryColumn } from "./columns";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";

interface CellActionProps {
  data: CategoryColumn;
}

export const CellAction: React.FC<CellActionProps> = ({
  data,
}) => {
  const router = useRouter();
  const params = useParams();
  const categoryModal = useCategoryModal();
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const onConfirm = async () => {
    setLoading(true);
    await axios.delete(`/api/${params.storeId}/categories/${data.id}`);
    toast.success('Category deleted.');
    router.refresh();
    setIsOpen(false);
    setLoading(false);
  };

  return (
    <>
      <AlertModal 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)}
        onConfirm={onConfirm}
        loading={loading}
      />
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
            onClick={() => categoryModal.onEdit(data.id)}
          >
            <Edit className="mr-2 h-4 w-4" /> Update
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setIsOpen(true)}
          >
            <Trash className="mr-2 h-4 w-4" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
