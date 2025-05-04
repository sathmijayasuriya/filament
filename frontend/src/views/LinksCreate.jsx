import React from "react";
import { Button } from "@/components/ui/button";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import LinksCreateForm from "../components/links/LinksCreateForm.jsx";
export default function LinksCreate() {
    return (
        <div className="m-1 mx-40">
            <div className="p-6">
                <Breadcrumb>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/links">Links</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink href="#">Create</BreadcrumbLink>
                    </BreadcrumbItem>
                </Breadcrumb>
                <div className="flex justify-between items-center mt-4">
                    <h2 className="text-2xl font-bold">Create Link </h2>
                </div>
            </div>
            <LinksCreateForm />
        </div>
    );
}
