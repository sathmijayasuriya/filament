import React from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogClose,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { GitHubLogoIcon, TwitterLogoIcon } from "@radix-ui/react-icons";

export default function ViewAuthorDialog({ open, onOpenChange, author }) {
    console.log("author details", author);
    if(!author) return null;
    const { name, email, github_handle, twitter_handle, bio } = author;
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
            <DialogTitle>Author :  {name}</DialogTitle>
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
                <div className="col-span-3">{name}</div>
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
                <Label htmlFor="slug" className="text-right">
                    Email
                </Label>
                <div className="col-span-3">{email}</div>
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
                <Label htmlFor="description" className="text-right">
                    Bio
                </Label>
                <div className="col-span-3">{bio}</div>
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
                <Label htmlFor="visibility" className="text-right">
                    <GitHubLogoIcon className="w-4 h-4 mr-2" />
                    Github
                </Label>
                <div className="col-span-3">
                  {github_handle}
                </div>
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
                <Label htmlFor="updatedAt" className="text-right">
                    <TwitterLogoIcon className="w-4 h-4 mr-2" />
                    Twitter
                </Label>
                <div className="col-span-3">
                    {twitter_handle}
                </div>
            </div>
        </div>
        <div className="flex justify-start">
            <Button
                variant="outline"
                onClick={() => onOpenChange(false)}
            >
                Close
            </Button>
        </div>
    </DialogContent>
</Dialog>
  )
}
