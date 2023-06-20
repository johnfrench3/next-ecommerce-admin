import { redirect } from 'next/navigation';

import prismadb from '@/lib/prismadb';

export default async function SetupLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const store = await prismadb.store.findFirst();

  if (store) {
    redirect(`/${store.id}`);
  };

  return (
    <>
      {children}
    </>
  );
};

