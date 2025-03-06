import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export default function CreateCategoryDialog({open, onOpenChange, onConfirm, onCancel }) {
  const [isVisible, setIsVisible] = useState(true);
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Create Category</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Name <span className="text-red-500">*</span></Label>
              <Input id="name" placeholder="Enter category name" className="mt-1" />
            </div>
            <div>
              <Label htmlFor="slug">Slug</Label>
              <Input id="slug" placeholder="Auto-generated" className="mt-1" disabled />
            </div>
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" placeholder="Enter category description" className="mt-1" />
          </div>
          <div className="flex items-center gap-2">
            <Switch id="visibility" checked={isVisible} onCheckedChange={setIsVisible} />
            <Label htmlFor="visibility">Visible to customers.</Label>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onCancel}>Cancel</Button>
            <Button variant="secondary">Create & create another</Button>
            <Button onClick={onConfirm} >Create</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
