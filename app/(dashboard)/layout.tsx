import { redirect } from 'next/navigation';

import Navbar from '@/components/navbar'
import prismadb from '@/lib/prismadb';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const store = await prismadb.store.findFirst();

  if (!store) {
    redirect('/setup');
  }

  return (
    <>
      <Navbar />
      {children}
    </>
  );
};
