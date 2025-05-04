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

export default function EditAuthorDialog({
    open,
    onOpenChange,
    author,
    onClose,
    isLoading,
    onSave,
}) {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        github_handle: "",
        twitter_handle: "",
        bio: "",
    });
    useEffect(() => {
        if (author) {
            setFormData({
                name: author.name || "",
                email: author.email || "",
                github_handle: author.github_handle || "",
                twitter_handle: author.twitter_handle || "",
                bio: author.bio || "",
            });
        }
    }, [author]);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };
    const isValidEmail = (email) => {
        // Basic email regex (can be made more strict if needed)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleSubmit = () => {
        if (!formData.name || !formData.email) {
            toast.error("Name and email are required fields.");
            return;
        }
        if (!isValidEmail(formData.email)) {
            toast.error("Please enter a valid email address");
            return;
        }
        onSave(formData);
    };
    if (!author) return null;
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-xl">
                <DialogHeader>
                    <DialogTitle>Edit Author</DialogTitle>
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
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="grid gap-4">
                        <div>
                            <Label htmlFor="name">
                                Email <span className="text-red-500">*</span>
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
                                placeholder="Enter category description"
                                className="mt-1 h-25"
                                value={formData.bio}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="grid gap-4">
                        <div>
                            <Label htmlFor="github_handle">GitHub</Label>
                            <Input
                                id="github_handle"
                                value={formData.github_handle}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="grid gap-4">
                        <div>
                            <Label htmlFor="twitter_handle">Twitter</Label>
                            <Input
                                id="twitter_handle"
                                value={formData.twitter_handle}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="flex justify-end gap-2">
                        <Button
                            className="bg-orange-400 hover:bg-orange-500 text-white"
                            variant="primary"
                            onClick={handleSubmit}
                            disabled={isLoading} // Disable button during API call
                        >
                            {isLoading ? "Updating..." : "Update"}
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
