import React, { useState, useEffect } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Bold,
    Italic,
    Link,
    Heading,
    Code2,
    ListOrdered,
    List,
    Image,
    Undo,
    Redo,
} from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAuthor } from "../../api/authorsApi";
export default function CreateAuthorDialog({
    open,
    onOpenChange,
    onConfirm,
    onClose,
}) {
    const queryClient = useQueryClient();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        github_handle: "",
        twitter_handle: "",
        bio: "",
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };
    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };
    const resetForm = () => {
        setFormData({
            name: "",
            email: "",
            github_handle: "",
            twitter_handle: "",
            bio: "",
        });
    };
    const { mutate: createMutation, isLoading } = useMutation({
        mutationFn: createAuthor,
        onSuccess: () => {
            onConfirm();
            resetForm();
            queryClient.invalidateQueries(["authors"]);
            toast.success("Author created successfully!");
        },
        onError: (error) => {
            toast.error(error.message || "Failed to create author");
        },
    });
    const handleSubmit = async () => {
        if (!formData.name || !formData.email) {
            toast.error("Name and email are required fields.");
            return;
        }
        if (!isValidEmail(formData.email)) {
            toast.error("Please enter a valid email address");
            return;
        }
        const payload = {
            name: formData.name,
            email: formData.email,
            bio: formData.bio,
            github_handle: formData.github_handle,
            twitter_handle: formData.twitter_handle,
        };
        createMutation(payload);
    };
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-3xl">
                <DialogHeader>
                    <DialogTitle>Create Author</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="name">
                                Name <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="name"
                                placeholder="Enter author name"
                                className="mt-1"
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="grid gap-4">
                            <div>
                                <Label htmlFor="name">
                                    Email{" "}
                                    <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="email"
                                    placeholder="Enter email"
                                    className="mt-1"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>
                    <div>
                        <Label htmlFor="description">Bio</Label>
                        <div className="border rounded-md p-2">
                            <div className="flex items-center space-x-2 mb-2">
                                <Button variant="outline" size="icon">
                                    <Bold size={16} />
                                </Button>
                                <Button variant="outline" size="icon">
                                    <Italic size={16} />
                                </Button>
                                <Button variant="outline" size="icon">
                                    <Link size={16} />
                                </Button>
                                <Button variant="outline" size="icon">
                                    <Heading size={16} />
                                </Button>
                                <Button variant="outline" size="icon">
                                    <Code2 size={16} />
                                </Button>
                                <Button variant="outline" size="icon">
                                    <ListOrdered size={16} />
                                </Button>
                                <Button variant="outline" size="icon">
                                    <List size={16} />
                                </Button>
                                <Button variant="outline" size="icon">
                                    <Image size={16} />
                                </Button>
                                <Button variant="outline" size="icon">
                                    <Undo size={16} />
                                </Button>
                                <Button variant="outline" size="icon">
                                    <Redo size={16} />
                                </Button>
                            </div>
                            <Textarea
                                id="bio"
                                placeholder="Bio"
                                className="mt-1 h-40"
                                value={formData.bio}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="grid gap-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="github_handle">GitHub</Label>
                                <Input
                                    id="github_handle"
                                    value={formData.github_handle}
                                    onChange={handleChange}
                                    className="mt-1"
                                />
                            </div>
                            <div>
                                <Label htmlFor="twitter_handle">Twitter</Label>
                                <Input
                                    id="twitter_handle"
                                    value={formData.twitter_handle}
                                    onChange={handleChange}
                                    className="mt-1"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end gap-2">
                        <Button
                            className="bg-orange-400 hover:bg-orange-500 text-white"
                            variant="primary"
                            onClick={handleSubmit}
                            disabled={isLoading}
                        >
                            {isLoading ? "Creating..." : "Create"}
                        </Button>
                        <Button variant="outline" onClick={onClose}>
                            {" "}
                            Cancel
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
