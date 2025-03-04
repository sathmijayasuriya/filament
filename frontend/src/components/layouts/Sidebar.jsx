import { NavLink } from "react-router-dom";
import { useState } from "react";
import { 
  Home, ShoppingBag, ShoppingCart, Users, FileText, Folder, User, Link as LinkIcon, 
  ChevronDown, LayoutDashboard 
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";

const Sidebar = () => {
  const [shopOpen, setShopOpen] = useState(false);
  const [blogOpen, setBlogOpen] = useState(false);

  return (
    <div className="h-screen w-64 bg-white border-r p-4 flex flex-col">
      {/* Dashboard */}
      <NavLink to="/dashboard">
        {({ isActive }) => (
          <Button
            variant="default"
            className={cn(
              "w-full justify-start gap-3 px-4 py-2 rounded-lg",
              isActive && "bg-muted text-primary"
            )}
          >
            <LayoutDashboard className="w-5 h-5" />
            Dashboard
          </Button>
        )}
      </NavLink>

      {/* Shop Section */}
      <Collapsible open={shopOpen} onOpenChange={setShopOpen}>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" className="w-full justify-between px-4 py-2 rounded-lg">
            <span className="flex items-center gap-3">
              <ShoppingBag className="w-5 h-5" />
              Shop
            </span>
            <ChevronDown className={`w-4 h-4 transition-transform ${shopOpen ? "rotate-180" : ""}`} />
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="pl-6 space-y-2">
          <NavLink to="/products">
            {({ isActive }) => (
              <Button variant="ghost" className={cn("w-full justify-start px-4 py-2", isActive && "bg-muted text-primary")}>
                <ShoppingCart className="w-5 h-5" />
                Products
              </Button>
            )}
          </NavLink>
          <NavLink to="/orders">
            {({ isActive }) => (
              <Button variant="ghost" className={cn("w-full justify-start px-4 py-2", isActive && "bg-muted text-primary")}>
                <ShoppingCart className="w-5 h-5" />
                Orders
                <Badge className="ml-auto bg-orange-200 text-orange-800">205</Badge>
              </Button>
            )}
          </NavLink>
          <NavLink to="/customers">
            {({ isActive }) => (
              <Button variant="ghost" className={cn("w-full justify-start px-4 py-2", isActive && "bg-muted text-primary")}>
                <Users className="w-5 h-5" />
                Customers
              </Button>
            )}
          </NavLink>
        </CollapsibleContent>
      </Collapsible>

      {/* Blog Section */}
      <Collapsible open={blogOpen} onOpenChange={setBlogOpen}>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" className="w-full justify-between px-4 py-2 mt-3 rounded-lg">
            <span className="flex items-center gap-3">
              <Folder className="w-5 h-5" />
              Blog
            </span>
            <ChevronDown className={`w-4 h-4 transition-transform ${blogOpen ? "rotate-180" : ""}`} />
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="pl-6 space-y-2">
          <NavLink to="/posts">
            {({ isActive }) => (
              <Button variant="ghost" className={cn("w-full justify-start px-4 py-2 text-orange-600 bg-orange-50", isActive && "bg-muted text-primary")}>
                <FileText className="w-5 h-5" />
                Posts
              </Button>
            )}
          </NavLink>
          <NavLink to="/categories">
            {({ isActive }) => (
              <Button variant="ghost" className={cn("w-full justify-start px-4 py-2", isActive && "bg-muted text-primary")}>
                <Folder className="w-5 h-5" />
                Categories
              </Button>
            )}
          </NavLink>
          <NavLink to="/authors">
            {({ isActive }) => (
              <Button variant="ghost" className={cn("w-full justify-start px-4 py-2", isActive && "bg-muted text-primary")}>
                <User className="w-5 h-5" />
                Authors
              </Button>
            )}
          </NavLink>
          <NavLink to="/links">
            {({ isActive }) => (
              <Button variant="ghost" className={cn("w-full justify-start px-4 py-2", isActive && "bg-muted text-primary")}>
                <LinkIcon className="w-5 h-5" />
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
