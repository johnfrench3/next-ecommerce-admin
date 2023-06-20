"use client";

import { useRef } from "react";

import { useActiveStore } from "@/hooks/use-active-store";

interface ActiveStoreInitProps {
  id: string;
};

export const ActiveStoreInit: React.FC<ActiveStoreInitProps> = ({ 
  id
}) => {
  const initialized = useRef(false);

  if (!initialized.current) {
    useActiveStore.setState({ id: id });
    initialized.current = true;
  }

  return null;
}
