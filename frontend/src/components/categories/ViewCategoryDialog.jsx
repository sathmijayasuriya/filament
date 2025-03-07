import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { XCircle, Eye } from 'lucide-react'; // Import the Eye icon
import { Button } from '@/components/ui/button';

export default function ViewCategoryDialog({ open, onOpenChange, category }) {
  if (!category) return null; // Handle case where category data is not available

  const { name, slug, description, visibility, updatedAt } = category;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>View {name}</DialogTitle>
          <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 data-[state=open]:bg-secondary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
            <span className="sr-only">Close</span>
          </DialogClose>
        </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-start gap-5">
            <Label htmlFor="name" className="text-right "> 
            Name
              </Label>
              <div className="col-span-3">
                {name}
              </div>
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="slug" className="text-right">
                Slug
              </Label>
              <div className="col-span-3">
                {slug}
              </div>
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <div className="col-span-3">
                {description}
              </div>
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="visibility" className="text-right">
                Visibility
              </Label>
              <div className="col-span-3">
                {visibility ? 'Visible' : <XCircle className="text-red-500" />}
              </div>
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="updatedAt" className="text-right">
                Updated at
              </Label>
              <div className="col-span-3">
                {new Date(updatedAt).toLocaleString()}
              </div>
            </div>
          </div>
        <div className="flex justify-start">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}