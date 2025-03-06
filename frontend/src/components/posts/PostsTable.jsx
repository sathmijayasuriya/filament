import { Button } from "@/components/ui/button";
import { FunnelIcon, ViewColumnsIcon, EyeIcon,PencilSquareIcon,TrashIcon} from "@heroicons/react/24/solid";
import {Pagination,PaginationContent,PaginationEllipsis,PaginationItem,PaginationLink,PaginationNext,PaginationPrevious,} from "@/components/ui/pagination";
import {flexRender,getCoreRowModel,getFilteredRowModel,getPaginationRowModel,getSortedRowModel,useReactTable,} from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import {Select,SelectContent,SelectItem,SelectTrigger,SelectValue,} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar"; 
import { CalendarIcon } from "lucide-react"
import { Popover, PopoverContent,PopoverTrigger,} from "@/components/ui/popover"
import {Menubar,MenubarContent,MenubarItem,MenubarMenu,MenubarSeparator,MenubarShortcut,MenubarTrigger,} from "@/components/ui/menubar"
import { NavLink } from "react-router-dom";  
import DeleteMessageDialog from "./DeleteMessageDialog";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableFooter,
} from "@/components/ui/table";

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

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  //delete 
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState(null);
  const handleDeleteClick = (rowId) => {
    setSelectedRowId(rowId);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    // Perform delete action here using selectedRowId
    console.log("Deleting row with ID:", selectedRowId);
    setDeleteDialogOpen(false);
    setSelectedRowId(null);
  };

  const handleCancelDelete = () => {
    setDeleteDialogOpen(false);
    setSelectedRowId(null);
  };


  const columns = [
    {
      id: "select",
      header: ({ table }) => (
        <div className="flex items-center justify-center">
          {" "}
          {/* added flex items center justify center */}
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) =>
              table.toggleAllPageRowsSelected(!!value)
            }
            aria-label="Select all rows"
          />
        </div>
      ),
      cell: ({ row }) => (
        <div className="flex items-center justify-center">
          {" "}
          {/* added flex items center justify center */}
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
      cell: ({ row }) =>
        row.original.image ? (
          <img
            src={row.original.image}
            alt="Post"
            className="h-8 w-8 rounded"
          />
        ) : null,
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
        return <Badge className={`${badgeColor}`}>{status}</Badge>;
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
            <Button variant="link" size="sm">
              View
            </Button>
          </div>
          <div className="flex items-center space-x-[-10px]">
            <PencilSquareIcon className="text-orange-500 h-4 w-4" />
            <Button className="text-orange-500" variant="link" size="sm">
              Edit
            </Button>
          </div>
          <div className="flex items-center space-x-[-10px]">
            <TrashIcon className="text-red-500 h-4 w-4" />
            <Button  className="text-red-500" variant="link" size="sm" onClick={() => handleDeleteClick(row.original.id)}>Delete</Button>
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
  const filteredData = data.filter((post) => {
    const postDate = new Date(post.publishedDate);
    if (startDate && postDate < new Date(startDate)) return false;
    if (endDate && postDate > new Date(endDate)) return false;
    return true;
  });

  //row count 
  const selectedRowCount = Object.keys(rowSelection).length;
  const hasSelectedRows = selectedRowCount > 0;

  const handleSelectAll = () => {
    table.toggleAllPageRowsSelected(true);
  };

  const handleDeselectAll = () => {
    table.toggleAllPageRowsSelected(false);
  };

  return (
    <div className="p-4">
      <div className="rounded-md border bg-white">
        <div className=" border-b">
          <div className="flex justify-end items-center py-1 my-3 mx-5 space-x-2 ">
            <Input placeholder="Search" className="w-[300px]" />
            <Menubar>
              <MenubarMenu>
                <MenubarTrigger>
                  <FunnelIcon className="text-[#A2A2AB] h-6 w-6 hover:text-gray-500" />
                </MenubarTrigger>
                <MenubarContent align="start" side="bottom">
                  <div className="p-4 space-y-4">
                    <div className="flex flex-col">
                      <label>From</label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className="w-[240px] justify-start text-left font-normal"
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {startDate ? (
                              startDate.toLocaleDateString()
                            ) : (
                              <span>Pick a date</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            selectedDate={startDate}
                            onDateChange={setStartDate}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div className="flex flex-col">
                      <label>Until</label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className="w-[240px] justify-start text-left font-normal"
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {endDate ? (
                              endDate.toLocaleDateString()
                            ) : (
                              <span>Pick a date</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            selectedDate={endDate}
                            onDateChange={setEndDate}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
            <ViewColumnsIcon className="text-[#A2A2AB] h-6 w-6 hover:text-gray-500" />
          </div>
          {/*row count */}
          {hasSelectedRows && (
            <div className="border-t">
              <div className="flex justify-between items-center mx-3 py-1 my-3 space-x-2">
                <span className="text-gray-600 font-semibold">
                  {selectedRowCount} records selected
                </span>
                <div>
                  <Button
                    className="text-orange-500"
                    variant="link"
                    size="sm"
                    onClick={handleSelectAll}
                  >
                    Select all
                  </Button>
                  <Button
                    className="text-red-500"
                    variant="link"
                    size="sm"
                    onClick={handleDeselectAll}
                  >
                    Deselect all
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
        <Table>
        <thead className="border-b">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableCell key={header.id} className="px-4 py-2 text-left font-medium">
                  {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </thead>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow
              noBorder = {true}
              key={row.id}
              className={`hover:bg-gray-100 ${row.getIsSelected() ? "border-l-2 border-orange-400" : ""}`}
            >
              {row.getVisibleCells().map((cell,) => (
                <TableCell
                key={cell.id}
                className="px-4 py-6 text-left"
                      >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>

        <DeleteMessageDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />

        <div className="flex justify-between items-center  py-1 my-3 mx-5 ">
          {/* 1 */}
          <div>
            <p className="w-[max-content]">
              Showing{" "}
              {table.getState().pagination.pageIndex *
                table.getState().pagination.pageSize +
                1}{" "}
              to{" "}
              {Math.min(
                (table.getState().pagination.pageIndex + 1) *
                  table.getState().pagination.pageSize,
                table.getRowModel().rows.length
              )}{" "}
              of {table.getRowModel().rows.length} results
            </p>
          </div>
          {/* 2 */}
          <Select
            value={perPage.toString()}
            onValueChange={(value) => setPerPage(parseInt(value))}
          >
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
          <div className="w-auto bgcolor-none">
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
                <PaginationItem
                  page={table.getState().pagination.pageIndex + 1}
                  active
                />
                <PaginationItem
                  page={table.getState().pagination.pageIndex + 2}
                />
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