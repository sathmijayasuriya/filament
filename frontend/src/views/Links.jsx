import React from "react";
import LinksTable from "../components/links/LinksTable";
import LinksTableHeader from "../components/links/LinksTableHeader";
export default function Links() {
    return (
        <div className="m-1 mx-40 bg-gray-100 h-full">
            <LinksTableHeader />
            <LinksTable />
        </div>
    );
}
