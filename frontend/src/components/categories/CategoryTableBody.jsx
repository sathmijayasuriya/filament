import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { TableRow, TableCell } from "@/components/ui/table";
import { EyeIcon, PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";

const CategoryTableBody = ({
  pageData,
  selectedRows,
  handleRowSelect,
  handleViewClick,
  handleDeleteClick,
  setSelectedCategoryToEdit,
  setEditDialogOpen,
}) => {
  return (
    <>
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
          <TableCell className="border-b">
            <div className="ml-10">
              <Checkbox
                checked={selectedRows.includes(item.slug)}
                onCheckedChange={() => handleRowSelect(item.slug)}
              />
            </div>
          </TableCell>
          <TableCell className="border-b">{item.name}</TableCell>
          <TableCell className="border-b">{item.slug}</TableCell>
          <TableCell className="border-b">
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
          <TableCell className="border-b">
            {format(new Date(item.updated_at), "yyyy-MM-dd")}
          </TableCell>
          <TableCell className="flex space-x-2 border-b justify-end">
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
    </>
  );
};

export default CategoryTableBody;