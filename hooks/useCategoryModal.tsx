import { create } from 'zustand';

interface useCategoryModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useCategoryModal = create<useCategoryModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
