import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { ChevronRight, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

function Breadcrumb({ className, ...props }) {
  return (
    <nav
      aria-label="breadcrumb"
      className={cn("flex items-center gap-x-1.5", className)}
      {...props}
    />
  );
}

function BreadcrumbList({ className, ...props }) {
  return (
    <ol
      className={cn("flex items-center gap-x-1.5 text-sm text-muted-foreground", className)}
      {...props}
    />
  );
}

function BreadcrumbItem({ className, ...props }) {
  return (
    <li className={cn("flex items-center", className)} {...props} />
  );
}

function BreadcrumbLink({ asChild, className, ...props }) {
  const Comp = asChild ? Slot : "a";
  return (
    <Comp className={cn("hover:text-foreground transition-colors", className)} {...props} />
  );
}

function BreadcrumbPage({ className, ...props }) {
  return (
    <span
      role="link"
      aria-disabled="true"
      aria-current="page"
      className={cn("text-foreground font-normal", className)}
      {...props}
    />
  );
}

function BreadcrumbSeparator({ className, ...props }) {
  return (
    <span
      role="presentation"
      aria-hidden="true"
      className={cn("flex items-center", className)}
      {...props}
    >
      <ChevronRight className="w-4 h-4" />
    </span>
  );
}

function BreadcrumbEllipsis({ className, ...props }) {
  return (
    <span role="presentation" aria-hidden="true" className={cn("flex size-9 items-center justify-center", className)} {...props}>
      <MoreHorizontal className="size-4" />
      <span className="sr-only">More</span>
    </span>
  );
}

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
};
