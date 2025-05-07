import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getLinkById } from "../../api/linksApi";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import LinksViewHeader from "./LinksViewHeader";

export default function LinksView() {
    const navigate = useNavigate();
    const { id } = useParams();

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

    if (isLoading) return <div className="p-6">Loading...</div>;
    if (isError || !link)
        return <div className="p-6 text-red-500">Error loading link</div>;

    return (
        <div className="max-w-6xl mx-auto p-6">
            <LinksViewHeader />

            <Card className="bg-transparent border-none shadow-none p-0">
            <CardContent className="p-6 mr-50 space-y-6">
                    <div className="flex flex-wrap justify-between items-start gap-1">
                        <div className="space-y-2 w-full md:w-1/2">
                            <Label className="text-base font-medium">
                                Title
                            </Label>
                            <div>{link.title}</div>

                            <Label className="text-base font-medium mt-4">
                                Description
                            </Label>
                            <div>{link.description}</div>

                            <Label className="text-base font-medium mt-4">
                                URL
                            </Label>
                            <a
                                href={link.url}
                                className="text-blue-600 underline break-all"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {link.url}
                            </a>

                            <Label className="text-base font-medium mt-4">
                                Image
                            </Label>
                            {link.image && (
                                <img
                                    src={link.image}
                                    alt="Link"
                                    className="w-56 rounded shadow border"
                                />
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label className="text-base font-medium">
                                Color
                            </Label>
                            <div
                                className="w-6 h-6 rounded"
                                style={{
                                    backgroundColor: link.color || "#000",
                                }}
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
