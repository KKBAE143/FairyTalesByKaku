"use client"

import Link from 'next/link';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { Sun, Moon, ShoppingCart } from 'lucide-react';

const Header = () => {
  const { theme, setTheme } = useTheme();

  return (
    <header className="bg-background shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-primary">
          FairyTalesByKaku
        </Link>
        <nav>
          <ul className="flex space-x-4">
            <li><Link href="/" className="text-foreground hover:text-primary">Home</Link></li>
            <li><Link href="/services" className="text-foreground hover:text-primary">Services</Link></li>
            <li><Link href="/about" className="text-foreground hover:text-primary">About</Link></li>
            <li><Link href="/gallery" className="text-foreground hover:text-primary">Gallery</Link></li>
            <li><Link href="/contact" className="text-foreground hover:text-primary">Contact</Link></li>
          </ul>
        </nav>
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          <Link href="/cart">
            <Button variant="outline" size="icon">
              <ShoppingCart className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;