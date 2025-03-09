import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";
import Logo from "@/assets/logo.png";
import { BellIcon, MagnifyingGlassIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Badge } from "@/components/ui/badge";
import { Command, CommandInput } from "@/components/ui/command";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavigationImageClick = () => {
    navigate("/posts");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="flex items-center justify-between py-1 border-b bg-white px-4 sm:px-7">
      {/* Logo fliament */}
      <img
        onClick={() => handleNavigationImageClick()}
        src={Logo}
        alt="Logo"
        className="h-13 cursor-pointer"
      />

      {/* Responsive Menu Button */}
      <div className="sm:hidden">
        <button onClick={toggleMenu} className="text-gray-600 focus:outline-none">
          {isMenuOpen ? (
            <XMarkIcon className="h-6 w-6" />
          ) : (
            <Bars3Icon className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Desktop Menu */}
      <div className={`flex items-center w-full sm:w-2/3 justify-end gap-4 ${isMenuOpen ? 'flex flex-col absolute top-full left-0 bg-white w-full border-b py-4 px-4' : 'hidden sm:flex'}`}>
        <div className="relative w-full sm:w-auto">
          <Command className="w-full sm:w-auto mr-5 px-1 py-0 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300">
            <CommandInput placeholder="Search" />
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