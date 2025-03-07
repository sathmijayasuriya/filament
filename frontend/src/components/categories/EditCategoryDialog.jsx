import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function EditCategoryDialog({ open, onOpenChange, category, onCategoryUpdated }) {
  const [isVisible, setIsVisible] = useState(true);
  const [name, setName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (category) {
      setName(category.name);
      setIsVisible(category.visibility === 1);
    }
  }, [category]);

  const handleUpdate = async () => {
    if (!name) {
      toast.error("Please enter a category name.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/categories/${category.slug}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          visibility: isVisible ? 1 : 0,
        }),
      });

      if (response.ok) {
        toast.success("Category updated successfully!");
        onOpenChange(false); // Close the dialog
        onCategoryUpdated(); // Refresh category list
        navigate("/categories");
      } else {
        const errorData = await response.json();
        toast.error(errorData.error || "Failed to update category.");
      }
    } catch (error) {
      console.error("Error updating category:", error);
      toast.error("An error occurred while updating the category.");
    }
  };

  const handleCancel = () => {
    onOpenChange(false);
  };

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