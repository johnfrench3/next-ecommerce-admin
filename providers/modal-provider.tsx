"use client";

import { useEffect, useState } from "react";

import { StoreModal } from "@/components/modals/store-modal";
import { CategoryModal } from "@/components/modals/category-modal";
import { ProductModal } from "@/components/modals/product-modal";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <StoreModal />
      <CategoryModal />
      <ProductModal />
    </>
  );
}
