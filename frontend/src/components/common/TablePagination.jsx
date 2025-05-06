import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function TablePagination({ table, currentPage, setCurrentPage, perPage, setPerPage }) {
  return (
        <div className="flex justify-between items-center py-1 my-3 mx-5 ">
          {/* 1. Showing results */}
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
          {/* 2. Per page selection */}
          <Select
            value={perPage.toString()}
            onValueChange={(value) => {
              setPerPage(parseInt(value));
              setCurrentPage(1);
            }}
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
          {/* 3. Pagination controls */}
          <div className="w-auto bgcolor-none">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => {
                      if (currentPage > 1) {
                        setCurrentPage((prev) => prev - 1);
                        table.setPageIndex(currentPage - 2); // Adjust because pageIndex is 0-based
                      }
                    }}
                    disabled={currentPage === 1}
                  />
                </PaginationItem>
    
                {Array.from({ length: table.getPageCount() }, (_, i) => (
                  <PaginationItem key={i}>
                    <PaginationLink
                      isActive={i + 1 === currentPage}
                      onClick={() => {
                        setCurrentPage(i + 1);
                        table.setPageIndex(i);
                      }}
                    >
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
    
                <PaginationItem>
                  <PaginationNext
                    onClick={() => {
                      if (currentPage < table.getPageCount()) {
                        setCurrentPage((prev) => prev + 1);
                        table.setPageIndex(currentPage);
                      }
                    }}
                    disabled={currentPage === table.getPageCount()}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
  )
}
