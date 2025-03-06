import { NavLink } from "react-router-dom";
import { Menubar, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";
import { EyeIcon, PencilSquareIcon, ChatBubbleLeftEllipsisIcon } from "@heroicons/react/24/outline";

const MenuBarComponent = () => {
  return (
    <div className="flex justify-center h-screen mt-4">
      <Menubar className="flex gap-4 border-1 border-gray-300 rounded-lg px-3 py-7 bg-white">
        <MenubarMenu>
          <NavLink
            to="/posts/:id"
            className={({ isActive }) =>
              `flex items-center gap-2 px-2 py-1 ${
                isActive ? "text-orange-500" : "text-gray-700 hover:text-gray-600"
              }`
            }
          >
            <EyeIcon className="h-4 w-4" />
            <MenubarTrigger>View Post</MenubarTrigger>
          </NavLink>
        </MenubarMenu>
        <MenubarMenu>
          <NavLink
            to="/edit-post"
            className={({ isActive }) =>
              `flex items-center gap-2 px-2 py-1 ${
                isActive ? "text-orange-500" : "text-gray-700 hover:text-gray-600"
              }`
            }
          >
            <PencilSquareIcon className="h-4 w-4" />
            <MenubarTrigger>Edit Post</MenubarTrigger>
          </NavLink>
        </MenubarMenu>
        <MenubarMenu>
          <NavLink
            to="/manage-comments"
            className={({ isActive }) =>
              `flex items-center gap-2 px-2 py-1 ${
                isActive ? "text-orange-500" : "text-gray-700 hover:text-gray-600"
              }`
            }
          >
            <ChatBubbleLeftEllipsisIcon className="h-4 w-4" />
            <MenubarTrigger>Manage Comments</MenubarTrigger>
          </NavLink>
        </MenubarMenu>
      </Menubar>
    </div>
  );
};

export default MenuBarComponent;
