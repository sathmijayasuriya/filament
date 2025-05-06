import React from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { TrashIcon } from "@heroicons/react/24/outline";
import { Loader2 } from "lucide-react";
export default function DeleteDialog({
    open,
    onOpenChange,
    onConfirm,
    onCancel,
    title,
    description,
    slug,
    onPostDeleted,
    loading = false,
}) {
    return (
        <>
            <Dialog open={open} onOpenChange={onOpenChange}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader className="flex flex-col items-center">
                        <TrashIcon className="h-8 w-8 text-red-500 mb-2" />
                        <DialogTitle>{title || "Delete Item"}</DialogTitle>
                        <DialogDescription className="text-sm text-gray-500">
                            {description ||
                                "Are you sure you would like to do this?"}
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="mt-4">
                        <Button
                            className="w-1/2"
                            variant="outline"
                            onClick={onCancel}
                        >
                            Cancel
                        </Button>
                        <Button
                            className="w-1/2"
                            variant="destructive"
                            onClick={onConfirm}
                            disabled={loading}
                        >
                            {loading && (
                                <Loader2 className="h-4 w-4 animate-spin text-gray-500" />
                            )}
                            Confirm
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}
