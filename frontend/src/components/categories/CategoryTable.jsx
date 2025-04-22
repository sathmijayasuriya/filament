import React, { useState, useEffect, useCallback, useMemo } from "react";
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
import DeleteMessageDialog from "../posts/DeleteMessageDialog";
import ViewCategoryDialog from "./ViewCategoryDialog";
import { format } from "date-fns";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import EditCategoryDialog from "./EditCategoryDialog";
import CategoryTableBody from "./CategoryTableBody";
import CategoryTableFooter from "./CategoryTableFooter";
import { Configuration } from "../../../Configure";

const CategoryTable = ({ categoryCreated }) => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const fetchData = async () => {
    try {
      const response = await axios.get(`${Configuration.BASE_URL}/categories`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("RAW RESPONSE:", response);

      if (Array.isArray(response.data)) {
        setData(response.data);
      } else {
        console.warn("Expected an array but got:", response.data);
        setData([]);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      setData([]);
    }
  };
  useEffect(() => {
    fetchData();
  }, [categoryCreated, token]);

  // Filter based on the search term
  const filteredData = useMemo(() => {
    if (!Array.isArray(data)) return [];
    return data.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [data, searchTerm]);

  const totalPages = useMemo(
    () => Math.ceil(filteredData.length / rowsPerPage),
    [filteredData, rowsPerPage]
  );
  const start = useMemo(() => (page - 1) * rowsPerPage, [page, rowsPerPage]);
  const end = useMemo(() => start + rowsPerPage, [start, rowsPerPage]);
  const pageData = useMemo(
    () => filteredData.slice(start, end),
    [filteredData, start, end]
  );

  const handlePageChange = useCallback((newPage) => setPage(newPage), []);

  const handleRowsPerPageChange = useCallback((value) => {
    setRowsPerPage(parseInt(value, 10));
    setPage(1);
  }, []);

  const handleSelectAll = useCallback(() => {
    setSelectAll((prev) => !prev);
    setSelectedRows((prev) =>
      prev.length === pageData.length ? [] : pageData.map((item) => item.slug)
    );
  }, [pageData]);

  const handleRowSelect = useCallback((slug) => {
    setSelectedRows((prev) =>
      prev.includes(slug) ? prev.filter((id) => id !== slug) : [...prev, slug]
    );
  }, []);

  //delete
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedCategorySlug, setSelectedCategorySlug] = useState(null);

  const handleDeleteClick = useCallback((slug) => {
    setSelectedCategorySlug(slug);
    setDeleteDialogOpen(true);
  }, []);

  const handleConfirmDelete = useCallback(async () => {
    try {
      await axios.delete(
        `${Configuration.BASE_URL}/categories/delete/${selectedCategorySlug}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const response = await axios.get(`${Configuration.BASE_URL}/categories`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData(response.data);
      navigate("/categories");
      setDeleteDialogOpen(false);
      setSelectedCategorySlug(null);
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  }, [selectedCategorySlug, navigate, token]);

  const handleCancelDelete = () => {
    setDeleteDialogOpen(false);
    setSelectedCategorySlug(null);
  };
  //view
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleViewClick = useCallback(
    async (slug) => {
      try {
        const response = await axios.get(
          `${Configuration.BASE_URL}/categories/${slug}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setSelectedCategory(response.data);
        setViewDialogOpen(true);
      } catch (error) {
        console.error("Error fetching category details:", error);
      }
    },
    [token]
  );

  const handleCloseView = useCallback(() => {
    setViewDialogOpen(false);
    setSelectedCategory(null);
  }, []);

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
              className="w-[300px]"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell className="font-medium text-sm py-4 ">
                <div className="ml-10">
                  <Checkbox
                    checked={selectAll}
                    onCheckedChange={handleSelectAll}
                  />
                </div>
              </TableCell>
              <TableCell className="font-medium text-sm py-4">Name</TableCell>
              <TableCell className="font-medium text-sm py-4">Slug</TableCell>
              <TableCell className="font-medium text-sm py-4">
                Visibility
              </TableCell>
              <TableCell className="font-medium text-sm py-4">
                Last Updated
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            <CategoryTableBody
              pageData={pageData}
              selectedRows={selectedRows}
              handleRowSelect={handleRowSelect}
              handleViewClick={handleViewClick}
              handleDeleteClick={handleDeleteClick}
              setSelectedCategoryToEdit={setSelectedCategoryToEdit}
              setEditDialogOpen={setEditDialogOpen}
            />
          </TableBody>
          <TableFooter>
            <CategoryTableFooter
              start={start}
              end={end}
              filteredData={filteredData}
              rowsPerPage={rowsPerPage}
              handleRowsPerPageChange={handleRowsPerPageChange}
              page={page}
              totalPages={totalPages}
              handlePageChange={handlePageChange}
            />
          </TableFooter>
        </Table>
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
          onCategoryUpdated={fetchData} // Refresh category list after editing
        />
      </div>
    </div>
  );
};

export default CategoryTable;
