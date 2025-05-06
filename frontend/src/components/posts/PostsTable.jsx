import { Button } from "@/components/ui/button";
  import { EyeIcon, PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
  import { flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
  import { ArrowUpDown } from "lucide-react";
  import { Checkbox } from "@/components/ui/checkbox";
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
  import { useQuery ,useMutation} from "@tanstack/react-query";
  import { fetchPosts,deletePost } from "../../api/postApi";
  import { useQueryClient } from "@tanstack/react-query";

  const PostsTable = () => {

    const queryClient = useQueryClient();
    const [sorting, setSorting] = useState([]);
    const [tableData, setTableData] = useState([]);
    const [columnFilters, setColumnFilters] = useState([]);
    const [rowSelection, setRowSelection] = useState({});
    const [perPage, setPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(1); 
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const navigate = useNavigate();   
    const [columnVisibility, setColumnVisibility] = useState({
      category_name: false,
      post_slug: false,
    });  
    
    const formatLocalDate = (date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };
    const formattedStart = startDate ? formatLocalDate(startDate) : undefined;
    const formattedEnd = endDate ? formatLocalDate(endDate) : undefined;

    const { data, isLoading, isError, error, refetch } = useQuery({
      queryKey: ["posts", { from: formattedStart, to: formattedEnd }],
      queryFn: fetchPosts,
      staleTime: 5 * 60 * 1000, // 5 minutes caching
      // enabled: !!token, 
    });

    //delete
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [selectedPostSlug, setSelectedPostSlug] = useState(null);
    
        
    const {mutate: deleteMutation} = useMutation({
      mutationFn: deletePost,
      onSuccess: () => {
        toast.success("Post deleted successfully!");
        // refetch(); 
        setDeleteDialogOpen(false);        
        // setSelectedPostSlug(null);
        queryClient.invalidateQueries(["posts"]);
      },
      onError: (error) => {
        console.error("Error deleting post:", error);
        toast.error("An error occurred while deleting the post.");
      },
    })
    const handleConfirmDelete = useCallback(async () => {
      if(selectedPostSlug) {
        deleteMutation(selectedPostSlug);
      }
    }, [selectedPostSlug,deleteMutation]);

    const handleDeleteClick = useCallback((slug) => {
      setSelectedPostSlug(slug);
      setDeleteDialogOpen(true);
    }, []);

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
        accessorKey: "post_slug", 
        header: "Slug",
        cell: ({ row }) => row.original.post_slug,
      },
      {
        accessorKey: "category_name",
        header: "Category",
        cell: ({ row }) => row.original.category_name,
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
                onClick={() => navigate(`/posts/${row.original.post_slug}`)} // Navigate to the post view
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
                onClick={() => navigate(`/posts/edit/${row.original.post_slug}`)} // Navigate to the edit page
              >
                Edit
              </Button>
            </div>
            <div className="flex items-center space-x-[-10px]">
              <TrashIcon className="text-red-500 h-4 w-4" />
              <Button className="text-red-500" variant="link" size="sm" onClick={() => handleDeleteClick(row.original.post_slug)}>Delete</Button>
              </div>
          </div>
        ),
      },
    ], [handleDeleteClick, navigate]);

    const table = useReactTable({
      data: data || [],
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

    if (isLoading) return <div>Loading posts...</div>;
    if (isError) return <div>Error: {error.message}</div>;

    return (
      <div className="p-4">
        <div className="rounded-md border bg-white " >
          <PostsTableHeader
            table={table}
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
            rowSelection={rowSelection}
            setRowSelection={setRowSelection}
            data={tableData}
          />
    <div className="w-full overflow-x-auto">
    <Table className="w-full min-w-[100px] border-collapse">
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
            <TableBody >
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
                    <TableCell
                      key={cell.id}
                      className="px-4 py-6 text-left border-b"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
          </div>
          <DeleteMessageDialog
            open={deleteDialogOpen}
            onOpenChange={setDeleteDialogOpen}
            slug={selectedPostSlug}
            onPostDeleted={handleDeleteClick}
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
            data={tableData}
            rowSelection={rowSelection}
            setRowSelection={setRowSelection}
          />
        </div>
      </div>
    );
  };

  export default PostsTable;
