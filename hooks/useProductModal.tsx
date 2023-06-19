import { create } from 'zustand';

interface useProductModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useProductModal = create<useProductModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
