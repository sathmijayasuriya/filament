import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Link } from "react-router-dom";
import CreateCategoryDialog from "./CreateCategoryDialog";
import React, { useCallback, useState } from "react";

export default function CategoryHeader({onCategoryCreated }) {
  const [createDialogOpen, setCreateDialogOpen] = useState(false);

  const handleClickAdd = () => {
    setCreateDialogOpen(true);
  };

  const handleCloseDialog = useCallback( ()=> {
    setCreateDialogOpen(false);
  }, []);

  const handleConfirm = () => {
    console.log("Category created!");
    onCategoryCreated(); //notify parent
    handleCloseDialog();
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mt-4">
        <h2 className="text-3xl font-bold">Categories</h2>
        <div className="flex justify-end gap-2">
          <Link to="/Categories/import">
            <Button className="text-black">Import Category</Button>
          </Link>
          <Button
            onClick={handleClickAdd}
            className="bg-orange-500 hover:bg-orange-400 text-white"
          >
            New Category
          </Button>
        </div>
      </div>

      <CreateCategoryDialog
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
        onConfirm={handleConfirm}
        onCancel={handleCloseDialog}
        onCategoryCreated={handleConfirm} //pass the function
      />
    </div>
  );
}
