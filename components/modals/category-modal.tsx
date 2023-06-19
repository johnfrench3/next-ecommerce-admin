"use client";

import { Modal } from "@/components/ui/modal";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useCategoryModal } from "@/hooks/use-category-modal";

export const CategoryModal = () => {
  const categoryModal = useCategoryModal();

  const title = categoryModal.isEdit ? 'Edit category' : 'Create category';
  const description = categoryModal.isEdit ? 'Edit a category.' : 'Add a new category';

  return (
    <Modal
      title={title}
      description={description}
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
