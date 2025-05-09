import React from "react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { ExternalLink, Pencil } from "lucide-react";
import { fetchLinks } from "../../api/linksApi";
import { Table } from "@/components/ui/table";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { deleteLink } from "../../api/linksApi";
import { useState, useEffect } from "react";
export default function LinksTable() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const {
        data: links,
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ["links"],
        queryFn: fetchLinks,
    });

    // delete
    const [selectedIds, setSelectedIds] = useState([]);
    const [showActions, setShowActions] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    
    const deleteLinkMutation = useMutation({
        mutationFn: (id) => deleteLink(id),
        onSuccess: () => {
            toast.success("Selected links deleted");
            queryClient.invalidateQueries(["links"]);
        },
        onError: () => toast.error("Error deleting links"),
    });
    useEffect(() => {
        setShowActions(false);
    }, [selectedIds]);

    const toggleSelectAll = () => {
        if (selectedIds.length === links.length) {
            setSelectedIds([]);
        } else {
            setSelectedIds(links.map((link) => link.id));
        }
        setDeleteOpen(false);
    };

    const handleCheckboxChange = (id) => {
        setSelectedIds((prev) =>
            prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
        );
        setDeleteOpen(false);
    };

    const handleBulkDelete = () => {
        if (selectedIds.length === 0) return;
        selectedIds.forEach((id) => deleteLinkMutation.mutate(id));
        setSelectedIds([]);
    };

    if (isLoading) return <div>Loading Links...</div>;
    if (isError) return <div>Error: {error.message}</div>;

    return (
        <div className="p-4">
            <div className="rounded-md border bg-white p-5">
                <div className="flex justify-between items-center mb-4">
                    {/* Top-left select all checkbox */}
                    <div className="flex items-center gap-2">
                        <Checkbox
                            checked={selectedIds.length === links.length}
                            onCheckedChange={toggleSelectAll}
                        />
                    </div>

                    {/* Show bulk actions & count only if any checkbox is selected */}
                    {selectedIds.length > 0 && (
                        <div className="flex items-center gap-4">
                            <span className="text-sm text-gray-700">
                                {selectedIds.length} selected
                            </span>
                            <Button
                                variant="ghost"
                                className="text-orange-600"
                                onClick={toggleSelectAll}
                            >
                                {selectedIds.length === links.length
                                    ? "Deselect all"
                                    : `Select all ${links.length}`}
                            </Button>
                            <div className="relative">
                                <Button
                                    variant="outline"
                                    onClick={() =>
                                        setShowActions((prev) => !prev)
                                    }
                                >
                                    Bulk actions
                                </Button>
                                {showActions && (
                                    <div className="absolute top-full mt-2 right-0 w-40 rounded-md border bg-white shadow-md z-10">
                                        <button
                                            onClick={() => {
                                                handleBulkDelete();
                                                setShowActions(false);
                                            }}
                                            className="w-full px-4 py-2 text-sm text-left text-red-600 hover:bg-red-50"
                                        >
                                            🗑 Delete selected
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {links.map((link) => (
                        <Card key={link.id} className="relative group">
                            <CardContent className="p-0">
                                <div className="mx-10 mt-5">
                                    <img
                                        src={link.image}
                                        alt={link.title}
                                        className="w-full h-50 object-cover"
                                        onClick={() => {
                                            navigate(`/links/edit/${link.id}`);
                                            toast("Edit clicked for " + link.title,{
                                                duration: 800,
                                            });
                                        }}
                                    />
                                    <Checkbox
                                        className="absolute top-2 left-2 bg-white rounded shadow-sm"
                                        checked={selectedIds.includes(link.id)}
                                        onCheckedChange={() =>
                                            handleCheckboxChange(link.id)
                                        }
                                    />
                                </div>
                                <div className="p-4">
                                    <h3 className="text-base font-semibold mx-5">
                                        {link.title}
                                    </h3>
                                    <p className="text-sm text-gray-500 truncate mx-5">
                                        {link.description}
                                    </p>
                                    <div className="flex gap-4 mx-5 text-sm items-center">
                                        <Button
                                            variant="link"
                                            size="sm"
                                            className="p-0 text-muted-foreground"
                                            asChild
                                        >
                                            <a
                                                href={link.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <ExternalLink
                                                    size={14}
                                                    className="mr-1"
                                                />
                                                Visit link
                                            </a>
                                        </Button>
                                        <Button
                                            variant="link"
                                            size="sm"
                                            className="p-0 text-orange-500 hover:text-orange-600"
                                            onClick={() => {
                                                navigate(`/links/edit/${link.id}`);
                                                toast("Edit clicked for " + link.title);
                                            }}
                                        >
                                            <Pencil
                                                size={14}
                                                className="mr-1"
                                            />
                                            Edit
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}
