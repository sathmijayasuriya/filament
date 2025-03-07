import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { TrashIcon } from "@heroicons/react/24/outline";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function DeleteMessageDialog({ open, onOpenChange, onConfirm, onCancel, title, description, slug, onPostDeleted }) {
    const navigate = useNavigate();

    const handleConfirmDelete = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/posts/delete/${slug}`, {
                method: "DELETE",
            });

            if (response.ok) {
                toast.success("Post deleted successfully!");
                onOpenChange(false); // Close the dialog
                if (onPostDeleted) {
                    onPostDeleted(); // Refresh post list if the prop is provided
                }
                navigate("/posts");
            } else {
                const errorData = await response.json();
                toast.error(errorData.error || "Failed to delete post.");
            }
        } catch (error) {
            console.error("Error deleting post:", error);
            toast.error("An error occurred while deleting the post.");
        }
    };

    return (
        <div>
            <Dialog open={open} onOpenChange={onOpenChange}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader className="flex flex-col items-center">
                        <TrashIcon className="h-8 w-8 text-red-500 mb-2" />
                        <DialogTitle>{title || "Delete Item"}</DialogTitle>
                        <DialogDescription className="text-sm text-gray-500">
                            {description || "Are you sure you would like to do this?"}
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="mt-4">
                        <Button className="w-1/2" variant="outline" onClick={onCancel}>
                            Cancel
                        </Button>
                        <Button className="w-1/2" variant="destructive" onClick={handleConfirmDelete}>
                            Confirm
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default DeleteMessageDialog;