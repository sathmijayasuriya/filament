import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { LogOut } from "lucide-react"; // icon for sign out
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import Logo from "@/assets/logo.png";
import { BellIcon, MagnifyingGlassIcon, Bars3Icon } from "@heroicons/react/24/outline";
import { Badge } from "@/components/ui/badge";
import { Command, CommandInput } from "@/components/ui/command";

export default function Header({ toggleSidebar }) {
    const navigate = useNavigate();

    const handleSignOut = () => {
        // Clear tokens or session data
        localStorage.clear(); // or sessionStorage.clear();
        navigate("/login");
    };

    const handleNavigationImageClick = () => {
        navigate("/posts");
    };

    return (
        <header className="bg-white border-b p-4 flex items-center justify-between ">
            <div className="sm:hidden">
                <button onClick={toggleSidebar}>
                    <Bars3Icon className="h-6 w-6" />
                </button>
            </div>

            <img
                onClick={handleNavigationImageClick}
                src={Logo}
                alt="Logo"
                className="h-13 cursor-pointer"
            />

            <div className="flex items-center w-2/3 justify-end gap-4 mr-5">
                <div className="relative w-auto">
                    <Command className="w-auto mr-5 px-1 py-0 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300">
                        <CommandInput placeholder="Search" />
                    </Command>
                </div>

                <div className="relative">
                    <BellIcon className="!w-6 !h-16 text-gray-400 hover:text-gray-700 transition-colors duration-200 cursor-pointer" />
                    <Badge className="absolute top-0 left-5 flex items-center justify-center border-[rgb(251,238,213)] bg-[rgb(255,251,235)] h-5 w-5 text-xs text-[rgb(217,119,6)]">
                        0
                    </Badge>
                </div>

                <DropdownMenu.Root cl>
                    <DropdownMenu.Trigger asChild>
                        <Avatar className="cursor-pointer">
                            <AvatarImage src="https://via.placeholder.com/40" />
                            <AvatarFallback>U</AvatarFallback>
                        </Avatar>
                    </DropdownMenu.Trigger>

                    <DropdownMenu.Content
                        sideOffset={5}
                        side="bottom" 
                        align="start" // aligns content to the left side of the trigger
                        className="z-50 min-w-[150px] bg-white shadow-md rounded-md border p-1 mr-10"
                    >
                        <DropdownMenu.Item
                            onClick={handleSignOut}
                            className="flex items-center gap-2 px-2 py-2 text-sm cursor-pointer rounded"
                        >
                            <LogOut className="h-4 w-4 text-gray-500" />
                            <span>Sign out</span>
                        </DropdownMenu.Item>
                    </DropdownMenu.Content>
                </DropdownMenu.Root>
            </div>
        </header>
    );
}
