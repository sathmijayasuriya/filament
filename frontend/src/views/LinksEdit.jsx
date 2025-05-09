import React from "react";
import { Button } from "@/components/ui/button";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import LinksEditForm from "../components/links/LinksEditForm";
export default function LinksEdit() {
    return (
        <div className="m-1 mx-40">
            <LinksEditForm />
        </div>
    );
}
