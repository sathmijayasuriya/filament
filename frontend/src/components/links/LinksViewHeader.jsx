import React from "react";
import { Button } from "@/components/ui/button";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
export default function LinksViewHeader() {
    const navigate = useNavigate();
    const { id } = useParams();
    return (
        <>
            <div className="p-6">
                <Breadcrumb>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/links">Links</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink href="#">View</BreadcrumbLink>
                    </BreadcrumbItem>
                </Breadcrumb>
                <div className="flex justify-between items-center mt-4">
                    <h2 className="text-2xl font-bold">View Link </h2>
                    <div className="flex gap-4">
                        <Button
                            className="bg-red-600 hover:bg-red-500 text-white"
                            type="submit"
                            onClick={() => navigate(`/links/edit/${id}`)}
                        >
                            Edit
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
}
