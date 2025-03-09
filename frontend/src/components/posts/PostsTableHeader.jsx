// PostsTableHeader.jsx
import { FunnelIcon, ViewColumnsIcon } from "@heroicons/react/24/solid";
import { Input } from "@/components/ui/input";
import { Menubar, MenubarContent, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

const PostsTableHeader = ({
  table,
  searchTerm,
  setSearchTerm,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  rowSelection,
  setRowSelection,
}) => {
  const selectedRowCount = Object.keys(rowSelection).length;
  const hasSelectedRows = selectedRowCount > 0;

  const handleSelectAll = () => {
    table.toggleAllPageRowsSelected(true);
  };

  const handleDeselectAll = () => {
    table.toggleAllPageRowsSelected(false);
  };

  return (
    <div className="border-b">
      <div className="flex justify-end items-center py-1 my-3 mx-5 space-x-2 ">
        <Input
          placeholder="Search"
          className="w-[300px]"
          onChange={(e) => setSearchTerm(e.target.value)}
          value={searchTerm}
        />
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
  );
};

export default PostsTableHeader;