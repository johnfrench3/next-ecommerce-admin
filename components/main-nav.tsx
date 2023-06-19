"use client";

import Link from "next/link"
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils"

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname();

  const routes = [
    {
      href: '/',
      label: 'Overview',
      active: pathname === '/',
    },
    {
      href: '/categories',
      label: 'Categories',
      active: pathname === '/categories',
    },
    {
      href: '/products',
      label: 'Products',
      active: pathname === '/products',
    },
    {
      href: '/settings',
      label: 'Settings',
      active: pathname === '/settings',
    },
  ]

  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            'text-sm font-medium transition-colors hover:text-primary',
            route.active ? 'text-black' : 'text-muted-foreground'
          )}
        >
          {route.label}
      </Link>
      ))}
    </nav>
  )
};
