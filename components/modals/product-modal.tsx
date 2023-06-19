"use client";

import { Modal } from "@/components/ui/modal";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useProductModal } from "@/hooks/useProductModal";

export const ProductModal = () => {
  const productModal = useProductModal();

  return (
    <Modal
      title="Create product"
      description="Add a new product."
      isOpen={productModal.isOpen} 
      onClose={productModal.onClose}
    >
      <div>
        <div className="space-y-4 py-2 pb-4">
          <div className="space-y-2">
            <Label htmlFor="name">Product name</Label>
            <Input id="name" placeholder="Sunglasses" />
          </div>
        </div>
      </div>
    </Modal>
  );
};
