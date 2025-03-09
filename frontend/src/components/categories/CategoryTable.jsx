import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  EyeIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableFooter,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import DeleteMessageDialog from "../posts/DeleteMessageDialog";
import ViewCategoryDialog from "./ViewCategoryDialog";
import { format } from 'date-fns'; 
import axios from 'axios'; 
import { useNavigate } from 'react-router-dom';
import EditCategoryDialog from "./EditCategoryDialog";

const CategoryTable = ({categoryCreated }) => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [searchTerm, setSearchTerm] = useState(''); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/categories");
        if (response.ok) {
          const result = await response.json();
          setData(result);
        } else {
          console.error("Failed to fetch categories");
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchData();
  }, [categoryCreated]);

   // Filter based on the search term
  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );


  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const start = (page - 1) * rowsPerPage;
  const end = start + rowsPerPage;
  const pageData = filteredData.slice(start, end);

  const handlePageChange = (newPage) => setPage(newPage);

  const handleRowsPerPageChange = (value) => {
    setRowsPerPage(parseInt(value, 10));
    setPage(1);
  };

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    setSelectedRows(selectAll ? [] : pageData.map((item) => item.slug));
  };

  const handleRowSelect = (slug) => {
    setSelectedRows((prev) =>
      prev.includes(slug) ? prev.filter((id) => id !== slug) : [...prev, slug]
    );
  };

  //delete
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedCategorySlug, setSelectedCategorySlug] = useState(null); 

  const handleDeleteClick = (slug) => {
    setSelectedCategorySlug(slug);
    setDeleteDialogOpen(true);
};

const handleConfirmDelete = async () => {
    try {
      console.log("Deleting slug:", selectedCategorySlug);
      await axios.delete(`http://localhost:5000/api/categories/delete/${selectedCategorySlug}`);
      const response = await fetch("http://localhost:5000/api/categories");
      if (response.ok) {
        const result = await response.json();
        setData(result);
        navigate('/categories'); 
      } else {
          const errorData = await response.json();
          console.error(errorData.error ||"Failed to refresh categories after deletion");
      }
      setDeleteDialogOpen(false);
      setSelectedCategorySlug(null);
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

const handleCancelDelete = () => {
    setDeleteDialogOpen(false);
    setSelectedCategorySlug(null);
};
//view
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleViewClick = async (slug) => { // Make handleViewClick async
    try {
        const response = await axios.get(`http://localhost:5000/api/categories/${slug}`);
        setSelectedCategory(response.data);
        setViewDialogOpen(true);
    } catch (error) {
        console.error("Error fetching category details:", error);
    }
};

const handleCloseView = () => {
    setViewDialogOpen(false);
    setSelectedCategory(null); // Reset selectedCategory
};
//edit
const [editDialogOpen, setEditDialogOpen] = useState(false);
const [selectedCategoryToEdit, setSelectedCategoryToEdit] = useState(null);


  return (
<div className="p-4">
  <div className="rounded-md border bg-white">
    <div className=" border-b">
      <div className="flex justify-end items-center my-3 mx-5">
        <Input
          placeholder="Search"
          className="w-full sm:w-[300px]"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </div>
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableCell className="font-medium text-sm py-4 whitespace-nowrap">
              <div className="ml-2 sm:ml-10">
                <Checkbox
                  checked={selectAll}
                  onCheckedChange={handleSelectAll}
                />
              </div>
            </TableCell>
            <TableCell className="font-medium text-sm py-4 whitespace-nowrap">
              Name
            </TableCell>
            <TableCell className="font-medium text-sm py-4 whitespace-nowrap">
              Slug
            </TableCell>
            <TableCell className="font-medium text-sm py-4 whitespace-nowrap">
              Visibility
            </TableCell>
            <TableCell className="font-medium text-sm py-4 whitespace-nowrap">
              Last Updated
            </TableCell>
            <TableCell className="whitespace-nowrap"></TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {pageData.map((item) => (
            <TableRow
              key={item.slug}
              noBorder={true}
              className={`hover:bg-gray-100 ${
                selectedRows.includes(item.slug)
                  ? "border-l-2 border-orange-400"
                  : ""
              }`}
            >
              <TableCell>
                <div className="ml-2 sm:ml-10">
                  <Checkbox
                    checked={selectedRows.includes(item.slug)}
                    onCheckedChange={() => handleRowSelect(item.slug)}
                  />
                </div>
              </TableCell>
              <TableCell className="whitespace-nowrap">{item.name}</TableCell>
              <TableCell className="whitespace-nowrap">{item.slug}</TableCell>
              <TableCell className="whitespace-nowrap">
                {item.visibility ? (
                  <span className="text-green-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        fillRule="evenodd"
                        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                ) : (
                  <span className="text-red-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L12 12.75l-2.78 2.78a.75.75 0 1 0 1.06 1.06L13.06 13.8l2.78 2.78a.75.75 0 1 0 1.06-1.06L14.1 12.75l2.78-2.78a.75.75 0 1 0-1.06-1.06L13.06 11.7l-2.78-2.78z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                )}
              </TableCell>
              <TableCell className="whitespace-nowrap">
                {format(new Date(item.updated_at), "yyyy-MM-dd")}
              </TableCell>
              <TableCell className="flex space-x-2 whitespace-nowrap">
                <div className="flex space-x-2">
                  <div className="flex items-center space-x-[-10px]">
                    <EyeIcon className="text-[#A2A2AB] h-4 w-4" />
                    <Button
                      onClick={() => handleViewClick(item.slug)}
                      className="text-[#A2A2AB]"
                      variant="link"
                      size="sm"
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
                      onClick={() => {
                        setSelectedCategoryToEdit(item);
                        setEditDialogOpen(true);
                      }}
                    >
                      Edit
                    </Button>
                  </div>
                  <div className="flex items-center space-x-[-10px]">
                    <TrashIcon className="text-red-500 h-4 w-4" />
                    <Button
                      className="text-red-500"
                      variant="link"
                      size="sm"
                      onClick={() => handleDeleteClick(item.slug)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={8}>
              <div className="flex flex-col sm:flex-row justify-between items-center">
                <div className="flex justify-between items-center ml-2 sm:ml-6 p-3 w-full">
                  <div>
                    Showing {start + 1} to {Math.min(end, filteredData.length)} of{" "}
                    {filteredData.length} results
                  </div>
                  <div className="flex items-center space-x-4">
                    <Select
                      value={rowsPerPage.toString()}
                      onValueChange={handleRowsPerPageChange}
                    >
                      <SelectTrigger className="w-[100px]">
                        <SelectValue placeholder="Per page" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="5">5</SelectItem>
                        <SelectItem value="10">10</SelectItem>
                        <SelectItem value="20">20</SelectItem>
                      </SelectContent>
                    </Select>
                    <Pagination
                      count={totalPages}
                      page={page}
                      onPageChange={handlePageChange}
                    />
                  </div>
                </div>
                <div className="flex items-center space-x-4 p-3">
                  <Button
                    disabled={page === 1}
                    onClick={() => handlePageChange(page - 1)}
                  >
                    Previous
                  </Button>
                  <Button
                    disabled={page === totalPages}
                    onClick={() => handlePageChange(page + 1)}
                  >
                    Next
                  </Button>
                  </div>
              </div>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
    <DeleteMessageDialog
      open={deleteDialogOpen}
      onOpenChange={setDeleteDialogOpen}
      onConfirm={handleConfirmDelete}
      onCancel={handleCancelDelete}
      title="Delete Category"
      slug={selectedCategorySlug}
      description="Are you sure you want to delete this category?"
    />
    <ViewCategoryDialog
      open={viewDialogOpen}
      onOpenChange={setViewDialogOpen}
      category={selectedCategory}
      onClose={handleCloseView}
    />
    <EditCategoryDialog
      open={editDialogOpen}
      onOpenChange={setEditDialogOpen}
      category={selectedCategoryToEdit}
      onCategoryUpdated={() => {
        fetch("http://localhost:5000/api/categories")
          .then((response) => response.json())
          .then((result) => setData(result));
      }}
    />
  </div>
</div>

  );
};

export default CategoryTable;