import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { Book, Sprout } from "lucide-react";
import { ModeToggle } from "./ModeToggle";

function Navbar() {
  return (
    <nav className="flex items-center justify-between px-5 gap-2 sticky top-0 z-50 h-[50px] border-b">
      <Link href="/" className="text-2xl font-bold">
        Plantventory 🌱
      </Link>

      <div className="flex items-center gap-2">
        <Button variant="outline">
          <Sprout className="w-4 h-4" />
          Plants
        </Button>
        <Button variant="outline">
          <Book className="w-4 h-4" />
          About
        </Button>
        <ModeToggle />
      </div>
    </nav>
  );
}

export default Navbar;
