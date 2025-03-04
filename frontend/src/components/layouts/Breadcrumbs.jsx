import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function Breadcrumbs({ items }) {
  return (
    <nav className="flex items-center space-x-2 text-gray-600 text-sm mb-4">
      {items.map((item, index) => (
        <div key={index} className="flex items-center">
          {index > 0 && <ChevronRight className="w-4 h-4 mx-1" />}
          <Link to={item.path} className="hover:underline">
            {item.label}
          </Link>
        </div>
      ))}
    </nav>
  );
}
