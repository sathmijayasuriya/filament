import { Button } from "@/components/ui/button";
import { FunnelIcon, ViewColumnsIcon, EyeIcon, PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarSeparator, MenubarShortcut, MenubarTrigger } from "@/components/ui/menubar";
import DeleteMessageDialog from "./DeleteMessageDialog";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableFooter,
} from "@/components/ui/table";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { app } from "../../firebase";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const PostsTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:5000/api/posts/posts");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});
  const [perPage, setPerPage] = useState(5);

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  //delete
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedPostSlug, setSelectedPostSlug] = useState(null);
  
  const handleDeleteClick = (slug) => {
      setSelectedPostSlug(slug);
      setDeleteDialogOpen(true);
  };
  
  const handlePostDeleted = () => {
      // Refresh your post data here
      fetch("http://localhost:5000/api/posts/posts")
          .then((response) => response.json())
          .then((result) => setData(result));
  };
  
  const handleConfirmDelete = () => {
    // Perform delete action here using selectedRowId
    console.log("Deleting row with ID:", selectedPostSlug);
    setDeleteDialogOpen(false);
    selectedPostSlug(null);
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
      accessorKey: "image_path", // Use the correct column name from your MySQL table
      header: "Image",
      cell: ({ row }) => {
        const imagePath = row.original.image_path;
        if (imagePath) {
          const storage = getStorage(app);
          const imageRef = ref(storage, imagePath); // Use the image_path from your database
          return (
            <img
              src={imagePath} // initially use imagepath, then after download url is fetched, it will be updated.
              alt="Post"
              className="h-16 w-16 rounded"
              onLoad={(event) => {
                  getDownloadURL(imageRef).then((url) => {
                      event.target.src = url;
                  }).catch((error) => {
                      console.error("Error getting download URL:", error);
                  });
              }}
              onError={(error) => {
                  console.error("Error loading image:", error);
              }}
  
            />
          );
        }
        return null;
      },
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
      accessorKey: "published_at",
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
      cell: ({ row }) => {
        if (row.original.published_at) {
          const date = new Date(row.original.published_at);
          // Format the date to "YYYY-MM-DD"
          const formattedDate = date.toISOString().split('T')[0];
          return formattedDate;
        }
        return "";
      },
    },
    {
      id: "actions",
      header: "",
      cell: ({ row }) => (
        <div className="flex space-x-2">
          <div className="flex items-center space-x-[-10px]">
            <EyeIcon className="text-[#A2A2AB] h-4 w-4" />
            <Button
              className="text-[#A2A2AB]"
              variant="link"
              size="sm"
              onClick={() => navigate(`/posts/${row.original.slug}`)} // Navigate to the post view
            >
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
            <Button className="text-red-500" variant="link" size="sm" onClick={() => handleDeleteClick(row.original.slug)}>Delete</Button>
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
    if (post.published_at) {
      const postDate = new Date(post.published_at);
      if (startDate && postDate < new Date(startDate)) return false;
      if (endDate && postDate > new Date(endDate)) return false;
      return true;
    }
    return true; //if no published_at, show the post.
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
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

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
                noBorder={true}
                key={row.id}
                className={`hover:bg-gray-100 ${row.getIsSelected() ? "border-l-2 border-orange-400" : ""}`}
              >
                {row.getVisibleCells().map((cell) => (
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
    slug={selectedPostSlug}
    onPostDeleted={handlePostDeleted}
    onCancel={() => setDeleteDialogOpen(false)}
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