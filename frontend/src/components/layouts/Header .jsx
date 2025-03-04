import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";

export default function Header() {
  return (
    <header className="flex items-center justify-between p-4 border-b">
      <Input placeholder="Search" className="w-1/3" />
      <Avatar>
        <AvatarImage src="https://via.placeholder.com/40" />
        <AvatarFallback>DU</AvatarFallback>
      </Avatar>
    </header>
  );
}
