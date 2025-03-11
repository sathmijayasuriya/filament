  import { Calendar } from "@/components/ui/calendar"; 
  import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"; 
  import { Button } from "@/components/ui/button"; 
  import { format } from "date-fns"; 
  import { CalendarIcon } from "@radix-ui/react-icons"; 
  import { Input } from "../ui/input";
  import {
    Menubar,
    MenubarContent,
    MenubarMenu,
    MenubarTrigger,
    MenubarItem
  } from "@/components/ui/menubar"
  import { FunnelIcon,ViewColumnsIcon } from "@heroicons/react/24/solid";
  import React, { useCallback,useMemo ,useState} from "react";
  import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";

  const PostsTableHeader = ({
    table,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    rowSelection,
    setRowSelection,    
    data
  }) => {
    // show cat and slug columns 
    const [showCategory, setShowCategory] = useState(table.getColumn("category_name")?.getIsVisible() || false);
    const [showSlug, setShowSlug] = useState(table.getColumn("post_slug")?.getIsVisible() || false);
      
    const handleToggleCategory = useCallback(() => {
      const newVisibility = !showCategory;
      setShowCategory(newVisibility);
      table.getColumn("category_name")?.toggleVisibility(newVisibility);
    }, [showCategory, table]);
  
    const handleToggleSlug = useCallback(() => {
      const newVisibility = !showSlug;
      setShowSlug(newVisibility);
      table.getColumn("post_slug")?.toggleVisibility(newVisibility);
    }, [showSlug, table]);
    
    const handleResetColumns = useCallback(() => {
      setShowCategory(false);
      setShowSlug(false);
      table.getColumn("category_name")?.toggleVisibility(false);
      table.getColumn("post_slug")?.toggleVisibility(false);
    }, [table]);
  
    const selectedRowCount = Object.keys(rowSelection).length;
    const hasSelectedRows = selectedRowCount > 0;

      const count = useMemo(() => {
        if (!startDate && !endDate) return 0; // No filters 
        return data.filter((row) => {
          const rowDate = new Date(row.published_at); 
          const isAfterStartDate = startDate ? rowDate >= startDate : true;
          const isBeforeEndDate = endDate ? rowDate <= endDate : true;
          return isAfterStartDate && isBeforeEndDate;
        }).length;
      }, [data, startDate, endDate]);
    
    const handleStartDateChange = useCallback((date) => {
      setStartDate(date);
    }, [setStartDate]);

    const handleEndDateChange = useCallback((date) => {
      setEndDate(date);
    }, [setEndDate]);
    const handleSelectAll = useCallback(() => {
      table.toggleAllPageRowsSelected(true);
    }, [table]);

    const handleDeselectAll = useCallback(() => {
      table.toggleAllPageRowsSelected(false);
    }, [table]);

    const resetfilter = useCallback(() => {
      setEndDate(null);
      setStartDate(null);
    }, [setEndDate, setStartDate]);

    return (
      <div className="border-b w-full min-w-[100px] border-collapse">
        <div className="flex justify-end items-center py-1 my-3 mx-5 space-x-2">
          <Input placeholder="Search" className="w-[300px]" />
          <Menubar>
            <MenubarMenu className="w-[200px]">
              <MenubarTrigger>
                <div className="relative">
                  <FunnelIcon className="text-[#A2A2AB] h-6 w-6 hover:text-gray-500" />
                  {count > 0 && (
                    <Badge className="absolute bottom-5 left-5 flex items-center justify-center border-[rgb(251,238,213)] bg-[rgb(255,251,235)] h-5 w-5 text-xs text-[rgb(217,119,6)]">
                      {count}
                    </Badge>
                  )}
                </div>
              </MenubarTrigger>
              <MenubarContent align="start" side="bottom">
                <div className="p-4 space-y-4">
                  <div className="flex flex-col">
                    <label>From</label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {startDate
                            ? format(startDate, "yyyy-MM-dd")
                            : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={startDate}
                          onSelect={handleStartDateChange}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="flex flex-col">
                    <label>Until</label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {endDate
                            ? format(endDate, "yyyy-MM-dd")
                            : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={endDate}
                          onSelect={handleEndDateChange}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={resetfilter}
                  >
                    Reset Dates
                  </Button>
                </div>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
          {/* // 2nd menu */}
          <Menubar>
            <MenubarMenu className="w-[200px]">
              <MenubarTrigger>
                <div className="relative">
                  <ViewColumnsIcon className="text-[#A2A2AB] h-6 w-6 hover:text-gray-500" />
                </div>
              </MenubarTrigger>
              <MenubarContent align="start" side="bottom">
                <div className="p-4 space-y-4">
                  <MenubarItem>
                    <Checkbox
                      checked={showSlug}
                      onCheckedChange={handleToggleSlug}/>
                    Slug {" "}
                  </MenubarItem>
                  <MenubarItem>
                    <Checkbox
                    checked={showCategory}
                    onCheckedChange={handleToggleCategory}
                    /> Category{ " "}
                  </MenubarItem>
                  <Button
                  variant="outline"
                  className="w-full"
                  onClick={handleResetColumns}
                >
                  Reset
                </Button>
                </div>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        </div>
        {hasSelectedRows && (
          <div className="border-t">
            <div className="flex justify-between items-center mx-3 py-1 my-3 space-x-2">
              <span className="text-gray-600 font-semibold">
                {selectedRowCount} records selected
              </span>
              <div>
                <button
                  className="text-orange-500 mr-4 cursor-pointer"
                  onClick={handleSelectAll}
                >
                  Select all
                </button>
                <button
                  className="text-red-500 cursor-pointer"
                  onClick={handleDeselectAll}
                >
                  Deselect all
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };
  export default PostsTableHeader;
