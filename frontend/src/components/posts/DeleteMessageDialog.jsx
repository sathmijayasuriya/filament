import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { TrashIcon } from "@heroicons/react/24/outline";

function DeleteMessageDialog({open, onOpenChange, onConfirm, onCancel }) {
  return (
    <div>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader className="flex flex-col items-center">
            <TrashIcon className="h-8 w-8 text-red-500 mb-2" />
            <DialogTitle >Delete Consequuntur tenetur aut quas.</DialogTitle>
            <DialogDescription className="text-sm text-gray-500">
              Are you sure you would like to do this?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className=" mt-4">
            <Button className="w-1/2" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button className="w-1/2" variant="destructive" onClick={onConfirm}>
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default DeleteMessageDialog;