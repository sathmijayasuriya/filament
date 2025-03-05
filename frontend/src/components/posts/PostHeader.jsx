import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { FunnelIcon,ViewColumnsIcon } from "@heroicons/react/24/solid";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import {
  // ColumnDef,
  // ColumnFiltersState,
  // SortingState,
  // VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


export default function PostHeader() {
  return (
    <div className="p-6">
      {/* Breadcrumb Navigation */}
      <Breadcrumb>
        <BreadcrumbItem>
          <BreadcrumbLink href="/posts">Posts</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="#">List</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <div className="flex justify-between items-center mt-4">
        <h2 className="text-2xl font-bold">Posts</h2>
        <Button className="bg-orange-400 hover:bg-orange-300 text-white">
          New post
        </Button>
      </div>

      {/* post table */}
      
    </div>
  );
}
