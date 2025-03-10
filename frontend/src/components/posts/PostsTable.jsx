  import { Button } from "@/components/ui/button";
  import { EyeIcon, PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
  import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
  import { flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
  import { ArrowUpDown } from "lucide-react";
  import { Checkbox } from "@/components/ui/checkbox";
  import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
  import { useState, useEffect,useMemo,useCallback } from "react";
  import { Badge } from "@/components/ui/badge";
  import DeleteMessageDialog from "./DeleteMessageDialog";
  import {
    Table,
    TableBody,
    TableRow,
    TableCell,
  } from "@/components/ui/table";
  import { getStorage, ref, getDownloadURL } from "firebase/storage";
  import { app } from "../../firebase";
  import { useNavigate } from "react-router-dom"; 
  import { toast } from "react-hot-toast";
  import PostsTableHeader from "./PostsTableHeader";
  import PostsTablePagination from "./PostsTablePagination ";

  const PostsTable = () => {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [sorting, setSorting] = useState([]);
    const [columnFilters, setColumnFilters] = useState([]);
    const [columnVisibility, setColumnVisibility] = useState({});
    const [rowSelection, setRowSelection] = useState({});
    const [perPage, setPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(1); 
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const navigate = useNavigate();   

    const formatLocalDate = (date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };
        
    useEffect(() => {
      setCurrentPage(1); // Reset to the first page
      const fetchData = async () => {
        try {
          const url = new URL("http://localhost:5000/api/posts/posts");
          if (startDate) {
            const formattedStartDate = formatLocalDate(startDate);
            console.log("Formatted Start Date:", formattedStartDate);
            url.searchParams.append('from', formattedStartDate);
          }
          if (endDate) {
            const formattedEndDate = formatLocalDate(endDate);
            console.log("Formatted End Date:", formattedEndDate);
            url.searchParams.append('to', formattedEndDate);
          }
          const response = await fetch(url);
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
      console.log("Start Date:", startDate);
      console.log("End Date:", endDate);    
    }, [startDate, endDate]);

    //delete
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [selectedPostSlug, setSelectedPostSlug] = useState(null);
    
    const handleDeleteClick = useCallback((slug) => {
      setSelectedPostSlug(slug);
      setDeleteDialogOpen(true);
    }, []);

    const handlePostDeleted = useCallback(() => {
      fetch("http://localhost:5000/api/posts/posts")
        .then((response) => response.json())
        .then((result) => setData(result));
        
    }, []);
    
    
    const handleConfirmDelete = useCallback(async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/posts/delete/${selectedPostSlug}`, {
          method: "DELETE",
        });
        if (response.ok) {
          setData((prevData) => prevData.filter((post) => post.slug !== selectedPostSlug));
          navigate("/posts");
          toast.success("Post deleted successfully!");
        } else {
          const errorData = await response.json();
          toast.error(errorData.error || "Failed to delete post.");
        }
        setDeleteDialogOpen(false);
        setSelectedPostSlug(null);
      } catch (error) {
        console.error("Error deleting post:", error);
        toast.error("An error occurred while deleting the post.");
      }
    }, [navigate, selectedPostSlug]);


    const columns = useMemo( ()=> [
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
          let badgeColor = ""; // Initialize with an empty string
        
          if (status === "Draft") {
            badgeColor = "bg-orange-100 text-orange-600 border-orange-200"; // Use orange-500 for published
          } else if (status === "published") {
            badgeColor = "bg-green-100 text-green-600 border-green-200";
          } else {
            badgeColor = "bg-orange-100 text-orange-600 border-orange-200"; // Use orange-500 for published
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
              <Button
                className="text-orange-500"
                variant="link"
                size="sm"
                onClick={() => navigate(`/posts/edit/${row.original.slug}`)} // Navigate to the edit page
              >
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
    ], [handleDeleteClick, navigate]);
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
        pagination: {
          pageIndex: currentPage - 1,
          pageSize: perPage,
        },
        onPaginationChange: (updater) => {
          const newPagination =
            typeof updater === "function"
              ? updater(table.getState().pagination)
              : updater;
          setCurrentPage(newPagination.pageIndex + 1); 
          table.setPageIndex(newPagination.pageIndex); 
        },
      }    
    });

    const selectedRowCount = Object.keys(rowSelection).length;
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
      <div className="p-4">
        <div className="rounded-md border bg-white">

          <PostsTableHeader
            table={table}
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
            rowSelection={rowSelection}
            setRowSelection={setRowSelection}
            data={data}
          />

          <Table>
            <thead className="border-b">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableCell
                      key={header.id}
                      className="px-4 py-2 text-left font-medium"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
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
                  className={`hover:bg-gray-100 ${
                    row.getIsSelected() ? "border-l-2 border-orange-400" : ""
                  } cursor-pointer`}
                  // onClick={() => navigate(`/posts/${row.original.slug}`)} 
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="px-4 py-6 text-left border-b">
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
            onConfirm={handleConfirmDelete}
            onCancel={() => setDeleteDialogOpen(false)}
            title="Delete Post"
            description="Are you sure you want to delete this post?"
          />
          <PostsTablePagination
            table={table}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            perPage={perPage}
            setPerPage={setPerPage}
            data={data} 
            rowSelection={rowSelection}
            setRowSelection={setRowSelection}
          />

        </div>
      </div>
    );
  };

  export default PostsTable;