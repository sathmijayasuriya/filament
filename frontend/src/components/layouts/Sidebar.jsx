import { NavLink } from "react-router-dom";
import { useState } from "react";
// import {
//   Home, ShoppingBag, ShoppingCart, Users, FileText, Folder, User, Link as LinkIcon,
//   ChevronDown, LayoutDashboard
// } from "lucide-react";
import {
  HomeIcon,
  Squares2X2Icon,
  ShoppingBagIcon,
  UserGroupIcon,
  DocumentTextIcon,
  RectangleStackIcon,
  UsersIcon,
  LinkIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";

const Sidebar = () => {
  const [shopOpen, setShopOpen] = useState(false);
  const [blogOpen, setBlogOpen] = useState(false);

  return (
    <div className="h-screen w-80 bg-white p-4 mt-6 flex flex-col">
      {/* Dashboard */}
      <NavLink to="/">
        {({ isActive }) => (
          <Button
            variant="default"
            className={cn(
              "text-[#3F3F46] w-full justify-start gap-3 px-4 py-2 rounded-lg",
              isActive && "bg-orange-50 text-orange-600" // active styling
            )}
          >
            <HomeIcon className={cn("text-[#A2A2AB] !w-6 !h-16", isActive && "text-orange-600")} />
            Dashboard
          </Button>
        )}
      </NavLink>

      {/* Shop Section */}
      <Collapsible open={shopOpen} onOpenChange={setShopOpen}>
        <CollapsibleTrigger asChild>
          <Button
            variant="secondary"
            className="text-[#3F3F46] w-full justify-between px-4 py-2 rounded-lg"
          >
            <span className="flex items-center gap-3">Shop</span>
            <ChevronDownIcon
              className={`w-4 h-4 transition-transform ${
                shopOpen ? "rotate-180" : ""
              }`}
            />
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className=" space-y-2">
          <NavLink to="/products">
            {({ isActive }) => (
              <Button
                variant="secondary"
                className={cn(
                  "text-[#3F3F46] w-full justify-start px-4 py-1",
                  isActive && "bg-muted text-primary"
                )}
              >
                <Squares2X2Icon className={cn("text-[#A2A2AB] !w-6 !h-16", isActive && "text-orange-600")} />
                Products
              </Button>
            )}
          </NavLink>
          <NavLink to="/orders">
            {({ isActive }) => (
              <Button
                variant="secondary"
                className={cn(
                  "text-[#3F3F46] w-full justify-start px-4 py-1",
                  isActive && "bg-muted text-primary"
                )}
              >
                <ShoppingBagIcon className={cn("text-[#A2A2AB] !w-6 !h-16", isActive && "text-orange-600")} />
                Orders
                <Badge className="ml-auto border border-[rgb(251,238,213)] bg-[rgb(255,251,235)] text-[rgb(217,119,6)]">
                  206
                </Badge>
              </Button>
            )}
          </NavLink>
          <NavLink to="/customers">
            {({ isActive }) => (
              <Button
                variant="secondary"
                className={cn(
                  "text-[#3F3F46] w-full justify-start px-4 py-1",
                  isActive && "bg-muted text-primary"
                )}
              >
                <UserGroupIcon className={cn("text-[#A2A2AB] !w-6 !h-16", isActive && "text-orange-600")} />
                Customers
              </Button>
            )}
          </NavLink>
        </CollapsibleContent>
      </Collapsible>

      {/* Blog Section */}
      <Collapsible open={blogOpen} onOpenChange={setBlogOpen}>
        <CollapsibleTrigger asChild>
          <Button
            variant="secondary"
            className="text-[#3F3F46] w-full justify-between px-4 py-2 mt-3 rounded-lg"
          > 
            <span className="flex items-center gap-3">
              {/* <Folder className="w-5 h-5" /> */}
              Blog
            </span>
            <ChevronDownIcon
              className={`w-4 h-4 transition-transform ${
                blogOpen ? "rotate-180" : ""
              }`}
            />
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-2">
          <NavLink to="/posts">
          {({ isActive }) => (
              <Button
                variant="secondary"
                className={cn(
                  "text-[#3F3F46] w-full justify-start px-4 py-1",
                  isActive && "bg-orange-50 text-orange-600"
                )}
              >
                <DocumentTextIcon className={cn("text-[#A2A2AB] !w-6 !h-16", isActive && "text-orange-600")} />
                Posts
              </Button>
            )}
          </NavLink>
          <NavLink to="/categories">
          {({ isActive }) => (
              <Button
                variant="secondary"
                className={cn(
                  "text-[#3F3F46] w-full justify-start px-4 py-1",
                  isActive && "bg-orange-50 text-orange-600"
                )}
              >
                <RectangleStackIcon className={cn("text-[#A2A2AB] !w-6 !h-16", isActive && "text-orange-600")} />
                Categories
              </Button>
            )}
          </NavLink>
          <NavLink to="/authors">
            {({ isActive }) => (
              <Button
                variant="secondary"
                className={cn(
                  "text-[#3F3F46] w-full justify-start px-4 py-1",
                  isActive && "bg-muted text-primary"
                )}
              >
                <UsersIcon className={cn("text-[#A2A2AB] !w-6 !h-16", isActive && "text-orange-600")} />
                Authors
              </Button>
            )}
          </NavLink>
          <NavLink to="/links">
            {({ isActive }) => (
              <Button
                variant="secondary "
                className={cn(
                  "text-[#3F3F46] w-full justify-start px-4 py-2",
                  isActive && "bg-muted text-primary"
                )}
              >
                <LinkIcon className={cn("text-[#A2A2AB] !w-6 !h-16", isActive && "text-orange-600")} />
                Links
              </Button>
            )}
          </NavLink>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default Sidebar;
