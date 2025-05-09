import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getLinkById, editLink } from "../../api/linksApi";
import toast from "react-hot-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";
import ImageUpload from "../posts/ImageUpload ";
import LinksEditHeader from "./LinksEditHeader";
import { deleteLink } from "../../api/linksApi";
export default function LinksEditForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const colorInputRef = useRef(null);

    const {
        data: link,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["link", id],
        queryFn: () => getLinkById(id),
        refetchOnWindowFocus: false,
        onError: () => {
            toast.error("Failed to load link data");
            navigate("/links");
        },
    });

    const [title, setTitle] = useState("");
    const [color, setColor] = useState("");
    const [description, setDescription] = useState("");
    const [url, setUrl] = useState("");
    const [image, setImage] = useState(null);
    const [existingImagePath, setExistingImagePath] = useState(null);

    useEffect(() => {
        if (link) {
            setTitle(link.title);
            const normalized = link.color.startsWith("#")
                ? link.color
                : `#${link.color}`;
            setColor(normalized);
            setDescription(link.description);
            setUrl(link.url);
            setExistingImagePath(link.image || null); // <-- this is important
        }
    }, [link]);
    const mutation = useMutation({
        mutationFn: async (formData) => {
            return editLink(id, formData);
        },
        onSuccess: () => {
            toast.success("Link updated successfully!");
            queryClient.invalidateQueries(["links"]);
            navigate("/links");
        },
        onError: () => {
            toast.error("Failed to update link");
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title || !color || !description) {
            toast.error("Please fill in all required fields.");
            return;
        }
        const formData = new FormData();
        formData.append("title", title);
        formData.append("color", color);
        formData.append("description", description);
        formData.append("url", url);

        if (image) {
            formData.append("image", image);
        } else if (existingImagePath) {
            formData.append("image", existingImagePath); 
        }

        mutation.mutate(formData);
    };
    const getImageName = () => {
        if (image) return image.name;
        if (existingImagePath) return existingImagePath.split("/").pop(); // Get filename from path
        return null;
    };

    // delete functionality
    const mutate = useMutation({
        mutationFn: async () => {
            return deleteLink(id);
        },
        onSuccess: () => {
            toast.success("Link deleted successfully!");
            queryClient.invalidateQueries(["links"]);
            navigate("/links");
        },
        onError: () => {
            toast.error("Failed to delete link");
        },
    })
    const handleDelete = () => {
        if (window.confirm("Are you sure you want to delete this link?")) {
            mutate.mutate();
        }
    }

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error loading link</div>;

    return (
        <div>
            <LinksEditHeader
            onDelete={handleDelete}
            />
            <form className="p-4" onSubmit={handleSubmit}>
                <div className="w-full p-5 rounded-lg border bg-white">
                    <div className="grid grid-cols-2 gap-4 mt-4">
                        <div className="mt-4">
                            <Label htmlFor="title">Title</Label>
                            <Input
                                id="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mt-4">
                            <Label htmlFor="color">Color</Label>
                            <div className="relative">
                                <Input
                                    value={color}
                                    onChange={(e) => setColor(e.target.value)}
                                    onBlur={() => {
                                        if (!/^#[0-9A-Fa-f]{6}$/.test(color)) {
                                            toast.error("Invalid hex color");
                                        }
                                    }}
                                    maxLength={7}
                                />
                                <input
                                    ref={colorInputRef}
                                    type="color"
                                    value={color}
                                    onChange={(e) => setColor(e.target.value)}
                                    className="absolute right-2 top-1/2 transform -translate-y-1/2 w-6 h-6 opacity-0"
                                    style={{ zIndex: 2 }}
                                />
                                <div
                                    className="absolute right-2 top-1/2 transform -translate-y-1/2 w-6 h-6 rounded-full border cursor-pointer"
                                    style={{ backgroundColor: color }}
                                    onClick={() =>
                                        colorInputRef.current?.click()
                                    }
                                />
                            </div>
                        </div>
                    </div>
                    <div className="mt-4">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="h-40"
                        />
                    </div>
                    <div className="mt-4">
                        <Label htmlFor="url">URL</Label>
                        <Input
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                        />
                    </div>
                    <div className="bg-white w-full p-5 mt-7 rounded-lg border">
                        <Label htmlFor="image">Image</Label>
                        <ImageUpload
                            onImageChange={(file) => {
                                setImage(file);
                                if (file) setExistingImagePath(null); // clear old image path when a new image is chosen
                            }}
                        />   {existingImagePath && !image && (
                               <img
                                    src={existingImagePath}
                                    alt="Current"
                                    className="mb-4 h-32 object-contain rounded"
                                  />
                               )}
                            
                            {getImageName() && (
                                <div className="mt-2 flex items-center gap-2">
                                    <p className="text-sm text-gray-700">
                                        Selected file: {getImageName()}
                                    </p>
                                    {image && (
                                        <button
                                            type="button"
                                            onClick={() => setImage(null)}
                                            className="text-red-500 hover:text-red-700"
                                        >
                                            <X size={16} />
                                        </button>
                                    )}
                                </div>
                            )}
                    </div>
                    <div className="mt-6 flex gap-4">
                        <Button
                            className="bg-orange-400 hover:bg-orange-500 text-white"
                            type="submit"
                            disabled={mutation.isLoading}
                        >
                            {mutation.isLoading ? "Updating..." : "Update"}
                        </Button>
                        <Button
                            onClick={() => navigate("/links")}
                            type="button"
                            variant="outline"
                        >
                            Cancel
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
}
