"use client";

import { Modal } from "@/components/ui/modal";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useCategoryModal } from "@/hooks/useCategoryModal";

export const CategoryModal = () => {
  const categoryModal = useCategoryModal();

  return (
    <Modal
      title="Create category"
      description="Add a new category."
      isOpen={categoryModal.isOpen} 
      onClose={categoryModal.onClose}
    >
      <div>
        <div className="space-y-4 py-2 pb-4">
          <div className="space-y-2">
            <Label htmlFor="name">Category name</Label>
            <Input id="name" placeholder="T-Shirts" />
          </div>
        </div>
      </div>
    </Modal>
  );
};
