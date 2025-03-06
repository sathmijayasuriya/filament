import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function FormHeader() {
  return (
    <div className="p-6">
      <Breadcrumb>
        <BreadcrumbItem>
          <BreadcrumbLink href="/posts">Posts</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Create</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <div className="flex justify-between items-center mt-4">
        <h2 className="text-2xl font-bold">Create Post </h2>
      </div>
    </div>
  );
}
