import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
// import Logo from '../../assets/logo.png';
import { useState } from "react";
import Logo from "@/assets/logo.png";
import { BellIcon ,MagnifyingGlassIcon} from "@heroicons/react/24/outline";
import { Badge } from "@/components/ui/badge";
import {
  Command,
  CommandInput,
} from "@/components/ui/command"
import { useNavigate } from "react-router-dom";
import { Bars3Icon } from '@heroicons/react/24/solid';


export default function Header({toggleSidebar }) {
  // const [searchValue, setSearchValue] = useState("");
    const navigate = useNavigate();
    const handleNavigationImageClick = () => {
      navigate("/posts"); 
    };
  
  return (
    <header className="bg-white border-b p-4 flex items-center justify-between">
      {/* Logo fliament */}
      
      <div className="sm:hidden">
        <button onClick={toggleSidebar}>
          <Bars3Icon className="h-6 w-6" />
        </button>
      </div>

      <img onClick={()=>handleNavigationImageClick()}  src={Logo} alt="Logo" className="h-13 cursor-pointer" />
      <div className="flex items-center w-2/3 justify-end gap-4">
        <div className="relative w-auto">
          <Command className="w-auto mr-5 px-1 py-0 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300">
            <CommandInput
              placeholder="Search"
              // value={searchValue || ""}  // Ensure it's always a string
              // onValueChange={setSearchValue}
              // autoFocus
            />
          </Command>
        </div>

        <div className="relative">
          <BellIcon className="!w-6 !h-16 text-gray-400 hover:text-gray-700 transition-colors duration-200 cursor-pointer" />
          <Badge className="absolute top-0 left-5 flex items-center justify-center border-[rgb(251,238,213)] bg-[rgb(255,251,235)] h-5 w-5 text-xs text-[rgb(217,119,6)]">
            0
          </Badge>
        </div>

        <Avatar className="cursor-pointer">
          <AvatarImage src="https://via.placeholder.com/40" />
          <AvatarFallback>DU</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
