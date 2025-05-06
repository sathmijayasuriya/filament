import React from "react";
import { Button } from "@/components/ui/button";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Link } from "react-router-dom";
import CreateAuthorDialog from "./CreateAuthorDialog";

export default function AuthorsTableHeader() {
    const [createDialogOpen, setCreateDialogOpen] = React.useState(false);
    const handleClickAdd = () => {
        setCreateDialogOpen(true);
    };
    const handleCloseDialog = () => {
        setCreateDialogOpen(false);
    };
    const handleConfirm = () => {
        console.log("Author created!");
        handleCloseDialog();
    };
    return (
        <div className="p-6">
            <Breadcrumb>
                <BreadcrumbItem>
                    <BreadcrumbLink href="/posts">Authors</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                    <BreadcrumbLink href="#">List</BreadcrumbLink>
                </BreadcrumbItem>
            </Breadcrumb>
            <div className="flex justify-between items-center mt-4">
                <h2 className="text-3xl text-black font-bold">Authors</h2>
                <Button
                    onClick={handleClickAdd}
                    className="bg-orange-400 hover:bg-orange-500 text-white"
                >
                    New Author
                </Button>
            </div>
            <CreateAuthorDialog
                open={createDialogOpen}
                onOpenChange={setCreateDialogOpen}
                onConfirm={handleConfirm}
                onCancel={handleCloseDialog}
            />
        </div>
    );
}
