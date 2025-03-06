import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Link } from "react-router-dom";

export default function CategoryHeader() {
    return (
      <div className="p-6">
        <div className="flex justify-between items-center mt-4">
          <h2 className="text-3xl font-bold">Categories</h2>
          <div className="flex justify-end gap-2"> 
          <Link to="/Categories/import">
            <Button className="text-black">
              Import Category
            </Button>
          </Link>
          <Link to="/Categories/create">
            <Button className="bg-orange-500 hover:bg-orange-400 text-white">
              New Category
            </Button>
          </Link>
          </div>   
        </div>
      </div>
    );
  }
  