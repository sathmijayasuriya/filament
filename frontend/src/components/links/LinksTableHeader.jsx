import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Link } from "react-router-dom";
import { Loader2 } from "lucide-react";
export default function LinksTableHeader() {
  return (
    <div className="p-6">
    <Breadcrumb>
      <BreadcrumbItem>
        <BreadcrumbLink href="/links">Links</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbLink href="#">List</BreadcrumbLink>
      </BreadcrumbItem>
    </Breadcrumb>
    <div className="flex justify-between items-center mt-4">
      <h2 className="text-3xl text-black font-bold">Links</h2>
      <Link to="/links/create">
        <Button className="bg-orange-400 hover:bg-orange-500 text-white">
          New Link
        </Button>
      </Link>
    </div>
  </div>
  )
}
