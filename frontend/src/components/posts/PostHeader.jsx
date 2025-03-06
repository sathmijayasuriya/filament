import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Link } from "react-router-dom";

export default function PostHeader() {
  return (
    <div className="p-6">
      <Breadcrumb>
        <BreadcrumbItem>
          <BreadcrumbLink href="/posts">Posts</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="#">List</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <div className="flex justify-between items-center mt-4">
        <h2 className="text-3xl font-bold">Posts</h2>
        <Link to="/posts/create">
          <Button className="bg-orange-400 hover:bg-orange-500 text-white">
            New post
          </Button>
        </Link>
      </div>
    </div>
  );
}
