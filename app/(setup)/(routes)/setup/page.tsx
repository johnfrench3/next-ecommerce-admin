"use client";

import { useEffect } from "react";

import { useStoreModal } from "@/hooks/useStoreModal";

const SetupPage = () => {
  const onOpen = useStoreModal((state) => state.onOpen);

  useEffect(() => {
    onOpen();
  }, [onOpen]);

  return null;
};
 
export default SetupPage;
