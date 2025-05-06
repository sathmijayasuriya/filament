import React, { useState, useMemo, useCallback } from "react";
import {
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
    flexRender,
} from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import {
    EyeIcon,
    PencilSquareIcon,
    TrashIcon,
} from "@heroicons/react/24/solid";
import { Button } from "@/components/ui/button";
import { GitHubLogoIcon, TwitterLogoIcon } from "@radix-ui/react-icons";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableRow, TableCell } from "@/components/ui/table";
import { toast } from "react-hot-toast";
import TablePagination from "../common/TablePagination";
import ViewAuthorDialog from "./ViewAuthorDialog";
import DeleteDialog from "../common/DeleteDialog";
import EditAuthorDialog from "./EditAuthorDialog";
import {
    fetchAuthors,
    fetchAuthorById,
    deleteAuthor,
    editAuthor,
} from "../../api/authorsApi";
import { Loader2 } from "lucide-react";

export default function AuthorsTable() {
    const queryClient = useQueryClient();
    const [sorting, setSorting] = useState([]);
    const [rowSelection, setRowSelection] = useState({});
    const [perPage, setPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");

    const {
        data: authors = [],
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ["authors"],
        queryFn: fetchAuthors,
        staleTime: 1000 * 60 * 5,
        onError: (error) => {
            console.error("Error fetching authors:", error);
            toast.error("Error fetching authors");
        },
    });

    const selectedRowCount = Object.keys(rowSelection).length;

    // Dialog states for loading indicators
    const [selectedAuthor, setSelectedAuthor] = useState(null);
    const [viewDialogOpen, setViewDialogOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);

    const [loadingViewId, setLoadingViewId] = useState(null);
    const [loadingEditId, setLoadingEditId] = useState(null);
    const [loadingDeleteId, setLoadingDeleteId] = useState(null);

    //view author data
    const { data: selectedAuthorData } = useQuery({
        queryKey: ["authorData", selectedAuthor],
        queryFn: () => fetchAuthorById(selectedAuthor),
        enabled: !!selectedAuthor,
        onError: () => toast.error("Error fetching author data"),
    });

    const handleViewClick = useCallback((id) => {
        setLoadingViewId(id);
        setTimeout(() => {
            setSelectedAuthor(id);
            setViewDialogOpen(true);
            setLoadingViewId(null);
        }, 2000);
    }, []);

    const handleCloseView = useCallback(() => {
        setViewDialogOpen(false);
        setSelectedAuthor(null);
    }, []);

    //delete
    const handleDeleteClick = useCallback((id) => {
        setLoadingDeleteId(id);
        setTimeout(() => {
            setSelectedAuthor(id);
            setDeleteDialogOpen(true);
            setLoadingDeleteId(null);
        }, 1000);
    }, []);

    const { mutate: deleteMutation } = useMutation({
        mutationFn: deleteAuthor,
        onSuccess: () => {
            queryClient.invalidateQueries(["authors"]);
            setDeleteDialogOpen(false);
            toast.success("Author deleted successfully");
        },
        onError: () => toast.error("Error deleting author"),
    });

    const handleConfirmDelete = useCallback(() => {
        if (!selectedAuthor) return;
        setConfirmLoading(true);
        setTimeout(() => {
            deleteMutation(selectedAuthor, {
                onSettled: () => {
                    setConfirmLoading(false);
                },
            });
        }, 1000);
        }, [selectedAuthor, deleteMutation]);

    const handleCancelDelete = useCallback(() => {
        setDeleteDialogOpen(false);
        setSelectedAuthor(null);
    }, []);

    //edit
    const handleEditClick = useCallback((id) => {
        setLoadingEditId(id);
        setTimeout(() => {
            setSelectedAuthor(id);
            setEditDialogOpen(true);
            setLoadingEditId(null);
        }, 1000);
    }, []);

    const handleCloseEdit = useCallback(() => {
        setEditDialogOpen(false);
        setSelectedAuthor(null);
    }, []);

    const { mutate: editMutation, isLoading: isLoadingEdit } = useMutation({
        mutationFn: ({ id, data }) => editAuthor(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries(["authors"]);
            setEditDialogOpen(false);
            toast.success("Author edited successfully");
        },
        onError: () => toast.error("Error editing author"),
    });

    const handleConfirmEdit = useCallback((updatedData) => {
        if (!updatedData.name) return toast.error("Please enter a name");
        if (!updatedData.email) return toast.error("Please enter an email");
        editMutation({ id: selectedAuthor, data: updatedData });
    }, [selectedAuthor, editMutation]);

    const filteredData = useMemo(() => {
        if (!Array.isArray(authors)) return [];
        return authors.filter((item) =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [authors, searchTerm]);

    const columns = useMemo(() => [
        {
            id: "select",
            header: ({ table }) => (
                <div className="flex items-center justify-center">
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
                    <Checkbox
                        checked={row.getIsSelected()}
                        onCheckedChange={(value) =>
                            row.toggleSelected(!!value)
                        }
                        aria-label="Select row"
                    />
                </div>
            ),
            enableSorting: false,
            enableHiding: false,
        },
        {
            accessorKey: "nameEmail",
            cell: ({ row }) => (
                <div className="flex flex-col">
                    <span className="font-semibold">{row.original.name}</span>
                    <span className="text-gray-500 text-sm">{row.original.email}</span>
                </div>
            ),
            sortingFn: (a, b) => {
                const nameA = a.original.name.toLowerCase();
                const nameB = b.original.name.toLowerCase();
                return nameA.localeCompare(nameB);
            },
        },
        {
            accessorKey: "socialHandles",
            cell: ({ row }) => (
                <div className="flex flex-col">
                    <span className="font-semibold">
                        <GitHubLogoIcon className="text-gray-500 h-4 w-4 inline-block mr-1" />
                        {row.original.github_handle}
                    </span>
                    <span className="text-gray-500 text-sm">
                        <TwitterLogoIcon className="text-gray-500 h-4 w-4 inline-block mr-1" />
                        {row.original.twitter_handle}
                    </span>
                </div>
            ),
        },
        {
            id: "actions",
            header: "",
            cell: ({ row }) => {
                const isViewLoading = loadingViewId === row.original.id;
                const isEditLoading = loadingEditId === row.original.id;
                const isDeleteLoading = loadingDeleteId === row.original.id;

                return (
                    <div className="flex space-x-5 justify-end">
                        {/* View */}
                        <div className="flex items-center space-x-[-10px]">
                            {isViewLoading ? (
                                <Loader2 className="h-4 w-4 animate-spin text-gray-500" />
                            ) : (
                                <EyeIcon className="text-[#A2A2AB] h-4 w-4" />
                            )}
                            <Button
                                className="text-[#A2A2AB]"
                                variant="link"
                                size="sm"
                                onClick={() => handleViewClick(row.original.id)}
                                disabled={isViewLoading}
                            >
                                View
                            </Button>
                        </div>
                        {/* Edit */}
                        <div className="flex items-center space-x-[-10px]">
                            {isEditLoading ? (
                                <Loader2 className="h-4 w-4 animate-spin text-orange-500" />
                            ) : (
                                <PencilSquareIcon className="text-orange-500 h-4 w-4" />
                            )}
                            <Button
                                className="text-orange-500"
                                variant="link"
                                size="sm"
                                onClick={() => handleEditClick(row.original.id)}
                                disabled={isEditLoading}
                            >
                                Edit
                            </Button>
                        </div>
                        {/* Delete */}
                        <div className="flex items-center space-x-[-10px]">
                            {isDeleteLoading ? (
                                <Loader2 className="h-4 w-4 animate-spin text-red-500" />
                            ) : (
                                <TrashIcon className="text-red-500 h-4 w-4" />
                            )}
                            <Button
                                className="text-red-500"
                                variant="link"
                                size="sm"
                                onClick={() => handleDeleteClick(row.original.id)}
                                disabled={isDeleteLoading}
                            >
                                Delete
                            </Button>
                        </div>
                    </div>
                );
            },
        },
    ], [loadingViewId, loadingEditId, loadingDeleteId]);

    const table = useReactTable({
        data: filteredData,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        state: {
            sorting,
            pagination: {
                pageIndex: currentPage - 1,
                pageSize: perPage,
            },
            rowSelection,
        },
        onSortingChange: setSorting,
        onRowSelectionChange: setRowSelection,
    });

    if (isLoading) return <div>Loading Authors...</div>;
    if (isError) return <div>Error: {error.message}</div>;

    return (
        <div className="p-4">
            <div className="rounded-md border bg-white">
                <div className="border-b">
                    <div className="flex justify-end items-center my-3 mx-5">
                        <Input
                            placeholder="Search"
                            className="w-[300px]"
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
                <Table>
                    <TableBody>
                        {table.getRowModel().rows.map((row) => (
                            <TableRow
                                noBorder
                                key={row.id}
                                className={`hover:bg-gray-100 ${
                                    row.getIsSelected() ? "border-l-2 border-orange-400" : ""
                                } cursor-pointer`}
                            >
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell
                                        key={cell.id}
                                        className={`px-6 py-6 border-b ${
                                            cell.column.id === "actions"
                                                ? "text-right"
                                                : "text-left justify-end"
                                        }`}
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
                <TablePagination
                    table={table}
                    data={filteredData}
                    perPage={perPage}
                    setPerPage={setPerPage}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    selectedRowCount={selectedRowCount}
                />
                <ViewAuthorDialog
                    open={viewDialogOpen}
                    onOpenChange={setViewDialogOpen}
                    author={selectedAuthorData}
                    onClose={handleCloseView}
                />
                <DeleteDialog
                    open={deleteDialogOpen}
                    onOpenChange={setDeleteDialogOpen}
                    onConfirm={handleConfirmDelete}
                    onCancel={handleCancelDelete}
                    title="Delete Author"
                    message="Are you sure you want to delete this author?"
                    slug={selectedAuthor}
                    loading={confirmLoading}
                    
                />
                <EditAuthorDialog
                    open={editDialogOpen}
                    onOpenChange={setEditDialogOpen}
                    onClose={handleCloseEdit}
                    author={selectedAuthorData}
                    onSave={handleConfirmEdit}
                    isLoading={isLoadingEdit}
                />
            </div>
        </div>
    );
}
