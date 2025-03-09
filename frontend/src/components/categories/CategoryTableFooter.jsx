import React from "react";
import { TableRow, TableCell } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const CategoryTableFooter = ({
  start,
  end,
  filteredData,
  rowsPerPage,
  handleRowsPerPageChange,
  page,
  totalPages,
  handlePageChange,
}) => {
  return (
    <TableRow>
      <TableCell colSpan={8}>
        <div className="flex justify-between">
          <div className="flex justify-between items-center ml-6 p-3 w-full">
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
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button disabled={page === 1} onClick={() => handlePageChange(page - 1)}>
              Previous
            </Button>
            <Button disabled={page === totalPages} onClick={() => handlePageChange(page + 1)}>
              Next
            </Button>
          </div>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default CategoryTableFooter;