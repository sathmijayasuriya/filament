import { Button } from "@/components/ui/button";
import {Breadcrumb,BreadcrumbItem,BreadcrumbLink,BreadcrumbSeparator,} from "@/components/ui/breadcrumb";
import { FunnelIcon, ViewColumnsIcon, EyeIcon,PencilSquareIcon,TrashIcon} from "@heroicons/react/24/solid";
import {Pagination,PaginationContent,PaginationEllipsis,PaginationItem,PaginationLink,PaginationNext,PaginationPrevious,} from "@/components/ui/pagination";
import {flexRender,getCoreRowModel,getFilteredRowModel,getPaginationRowModel,getSortedRowModel,useReactTable,} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import {Select,SelectContent,SelectItem,SelectTrigger,SelectValue,} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";

// Sample data (replace with your actual data)
const data = [
  {
    id: 1,
    image: null, // You can add image URLs here
    title: "Id voluptatibus est qui.",
    status: "Published",
    publishedDate: "Oct 23, 2024",
    // commentAuthors: ["Monty Swift", "Miss Marisol Braun", "Show 7 more"],
  },
  {
    id: 2,
    image: null,
    title: "Odit voluptates repellat saepe.",
    status: "Published",
    publishedDate: "Feb 3, 2025",
    // commentAuthors: ["Carrie Crooks DDS", "Dr. Abe Mann II", "Show 7 more"],
  },
  {
    id: 3,
    image: null,
    title: "Vel dignissimos beatae ut.",
    status: "Draft",
    publishedDate: "Apr 3, 2025",
    // commentAuthors: ["Krystina Armstrong", "Krystina Armstrong", "Show 7 more"],
  },
  {
    id: 4,
    image: null,
    title: "Ipsum est aut quae nihil.",
    status: "Published",
    publishedDate: "Dec 24, 2024",
    // commentAuthors: [
    //   "Salvatore Romaguera",
    //   "Mr. Kristofer DuBuque DVM",
    //   "Show 7 more",
    // ],
  },
  {
    id: 5,
    image: null,
    title: "Voluptatum quis enim consequatur maiores ut.",
    status: "Draft",
    publishedDate: "Apr 1, 2025",
    // commentAuthors: ["Hubert Langosh", "Mr. Devyn Kilback IV", "Show 7 more"],
  },
  // Add more data as needed
];

const PostsTable = () => {

  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});
  const [perPage, setPerPage] = useState(5);

  const columns = [
    {
        id: "select",
        header: ({ table }) => (
            <div className="flex items-center justify-center"> {/* added flex items center justify center */}
                <Checkbox
                    checked={
                        table.getIsAllPageRowsSelected() ||
                        (table.getIsSomePageRowsSelected() && "indeterminate")
                    }
                    onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                    aria-label="Select all rows"
                />
            </div>
        ),
        cell: ({ row }) => (
            <div className="flex items-center justify-center"> {/* added flex items center justify center */}
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                    aria-label="Select row"
                />
            </div>
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
      accessorKey: "image",
      header: "Image",
      cell: ({ row }) => (
        row.original.image ? (
          <img src={row.original.image} alt="Post" className="h-8 w-8 rounded" />
        ) : null
      ),
    },
    {
      accessorKey: "title",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Title
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },    
    {
        accessorKey: "status",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Status
                    <ArrowUpDown className="h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const status = row.original.status;
            let badgeColor = "bg-green-100 text-green-800 border-green-200"; 
            
            if (status === "Draft") {
                badgeColor = "bg-orange-100 text-orange-800 border-orange-200";
            }
            return (
                <Badge className={`${badgeColor}`}>
                    {status}
                </Badge>
            );
        },
    },
    {
      accessorKey: "publishedDate",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Published Date
            <ArrowUpDown className=" h-4 w-4" />
          </Button>
        );
      },
    },
    {
      id: "actions",
      header: "",
      cell: ({ row }) => (
            <div className="flex space-x-2">
            <div className="flex items-center space-x-[-10px]">
                <EyeIcon className="text-[#A2A2AB] h-4 w-4" />
                <Button variant="link" size="sm">View</Button>
            </div>
            <div className="flex items-center space-x-[-10px]">
                <PencilSquareIcon className="text-orange-500 h-4 w-4"/> 
                <Button className="text-orange-500" variant="link" size="sm">Edit</Button>
            </div>
            <div className="flex items-center space-x-[-10px]">
                <TrashIcon className="text-red-500 h-4 w-4" />          
                <Button  className="text-red-500" variant="link" size="sm">Delete</Button>
            </div>
            </div>

      ),
    },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="p-4">

      <div className="rounded-md border">
      <div className=" border-b">
        <div className="flex justify-end items-center py-1 my-3 mx-5 space-x-2 ">
        <Input placeholder="Search" className="w-[300px]" />
            <FunnelIcon className="text-[#A2A2AB] h-6 w-6 hover:text-gray-500" />
            <ViewColumnsIcon className="text-[#A2A2AB] h-6 w-6 hover:text-gray-500" />

        </div>
      </div>
        <table className="w-full">
          <thead className="border-b">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-4 py-2 text-left font-medium"
                  >
                    {header.isPlaceholder ? null : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="border-b hover:bg-gray-100 ">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="pl-6 px-4 py-6  text-left">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-between items-center  py-1 my-3 mx-5 ">
        {/* 1 */}
        <div>
          <p className="w-[max-content]">
            Showing {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1} to{" "}
            {Math.min(
              (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
              table.getRowModel().rows.length
            )}{" "}
            of {table.getRowModel().rows.length} results
          </p>
        </div>
        {/* 2 */}
          <Select value={perPage.toString()} onValueChange={(value) => setPerPage(parseInt(value))}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Per page" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
            </SelectContent>
          </Select>
        {/* 3 */}
        <div className="w-auto">
        <Pagination
          onPageChange={(page) => table.setPageIndex(page - 1)}
          currentPage={table.getState().pagination.pageIndex + 1}
          totalPages={table.getPageCount()}
        >
          <PaginationContent>
            <PaginationPrevious>Previous</PaginationPrevious>
            <PaginationItem page={1} />
            <PaginationEllipsis />
            <PaginationItem page={table.getState().pagination.pageIndex} />
            <PaginationItem page={table.getState().pagination.pageIndex + 1} active />
            <PaginationItem page={table.getState().pagination.pageIndex + 2} />
            <PaginationEllipsis />
            <PaginationItem page={table.getPageCount()} />
            <PaginationNext>Next</PaginationNext>
          </PaginationContent>
        </Pagination>
        </div>
      </div>
      </div>



    </div>
  );
};

export default PostsTable;