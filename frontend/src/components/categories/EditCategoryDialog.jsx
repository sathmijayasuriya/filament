import React, { useState, useEffect, useCallback,useMemo } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Configuration } from "../../../Configure";
export default function EditCategoryDialog({ open, onOpenChange, category, onCategoryUpdated }) {
  const [isVisible, setIsVisible] = useState(true);
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (category) {
      setName(category.name || "");
        const visibility =
        category.visibility === 1 ||
        category.visibility === "1" ||
        category.visibility === true;
  
      setIsVisible(visibility);
    }
  }, [category]);
  

  const handleUpdate = useCallback(async () => {
    if (!name) {
      toast.error("Please enter a category name.");
      return;
    }
    try {
      await axios.put(`${Configuration.BASE_URL}/categories/${category.slug}`, 
        {
          name,
          visibility: isVisible ? 1 : 0,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
        toast.success("Category updated successfully!");
        onOpenChange(false); // Close the dialog
        onCategoryUpdated(); // Refresh category list
        navigate("/categories");

    } catch (error) {
      console.error("Error updating category:", error);
      toast.error("An error occurred while updating the category.");
    }
  }, [name, isVisible, category, onOpenChange, onCategoryUpdated, navigate,token]);

  const handleCancel = useCallback(() => {
    onOpenChange(false);
  }, [onOpenChange]);


  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Edit Category</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4">
          <div>
            <Label htmlFor="name">
              Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="name"
              placeholder="Enter category name"
              className="mt-1"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <Switch id="visibility" checked={isVisible} onCheckedChange={setIsVisible} />
            <Label htmlFor="visibility">Visible to customers.</Label>
          </div>
          <div className="flex justify-end gap-2">
            <Button
              className="bg-orange-400 hover:bg-orange-500 text-white"
              variant="primary"
              onClick={handleUpdate}
            >
              Update
            </Button>
            <Button variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}