import { Search, ShoppingCart, Heart, User, Menu, X } from "lucide-react";
import { RxCross1 } from "react-icons/rx";

import { Button } from "./ui/button";

import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import SearchByInput from "./SearchByInput";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { useState } from "react";

const navigationItems = [
  { name: "Electronics", href: "/electronics" },
  { name: "Fashion", href: "/fashion" },
  { name: "jewellery", href: "/jewellery" },
];

export default function EcommerceHeader() {
  const navigate = useNavigate();

  const { cart, wish } = useSelector((state: RootState) => state.products);

  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
  };
  const isLoggedIn = false;
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        {/* Top bar with contact info or announcements */}
        <div className="hidden md:flex items-center justify-between py-2 text-sm text-muted-foreground border-b">
          <div className="flex items-center space-x-4">
            <span>Free shipping on orders over $50</span>
            <span>•</span>
            <span>24/7 Customer Support</span>
          </div>
          <div className="flex items-center space-x-4">
            <span>Track Your Order</span>
            <span>•</span>
            <span>Help & FAQ</span>
          </div>
        </div>

        {/* Main header */}
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <div className="flex items-center">
            <Link to={"/home"}>
              <h1 className="text-2xl font-bold text-primary">ShopHub</h1>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigationItems.map((item) =>
              item.name === "Fashion" ? (
                <DropdownMenu key={item.name}>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="text-sm font-medium">
                      {item.name}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>
                      <Link to="/fashion/mens-cloth" className="w-full">
                        Men's Cloth
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link to="/fashion/womens-cloth" className="w-full">
                        Women's Cloth
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link
                  key={item.name}
                  to={item.href}
                  className="text-sm font-medium transition-colors hover:text-primary"
                >
                  {item.name}
                </Link>
              )
            )}
          </nav>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <form onSubmit={handleSearch} className="flex relative w-full">
              {/* <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" /> */}
              <SearchByInput />
            </form>
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-2">
            {/* Mobile Search */}
            <Button variant="ghost" size="icon" className="md:hidden">
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>

            {/* User Account */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                  <span className="sr-only">Account</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                {isLoggedIn ? (
                  <>
                    <DropdownMenuItem>My Account</DropdownMenuItem>
                    <DropdownMenuItem>Order History</DropdownMenuItem>
                    <DropdownMenuItem>Settings</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Sign Out</DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <DropdownMenuItem>Sign In</DropdownMenuItem>
                    <DropdownMenuItem>Create Account</DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Wishlist */}
            <Button
              onClick={() => navigate("/wish")}
              variant="ghost"
              size="icon"
              className="relative"
            >
              <Heart className="h-5 w-5" />
              {wish.length > 0 && (
                <span
                  variant="destructive"
                  className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-sm"
                >
                  {wish.length}
                </span>
              )}
              <span className="sr-only">Wishlist</span>
            </Button>

            {/* Shopping Cart */}
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              onClick={() => navigate("/cart")}
            >
              <ShoppingCart className="h-5 w-5" />
              {cart.length > 0 && (
                <span
                  variant="destructive"
                  className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-sm"
                >
                  {cart.length}
                </span>
              )}
            </Button>

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold">Menu</h2>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsOpen(false)}
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>

                {/* Mobile Search */}
                <div className="mb-6 md:hidden">
                  <form onSubmit={handleSearch} className="relative">
                    {/* <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" /> */}
                    <SearchByInput />
                  </form>
                </div>

                {/* Mobile Navigation */}
                <nav className="space-y-4">
                  {navigationItems.map((item) =>
                    item.name === "Fashion" ? (
                      <div key={item.name}>
                        <p className="py-2 text-lg font-medium">Fashion</p>
                        <div className="ml-4 space-y-2">
                          <Link
                            to="/fashion/mens-cloth"
                            className="block text-base text-muted-foreground hover:text-primary"
                            onClick={() => setIsOpen(false)}
                          >
                            Men's Cloth
                          </Link>
                          <Link
                            to="/fashion/womens-cloth"
                            className="block text-base text-muted-foreground hover:text-primary"
                            onClick={() => setIsOpen(false)}
                          >
                            Women's Cloth
                          </Link>
                        </div>
                      </div>
                    ) : (
                      <Link
                        key={item.name}
                        to={item.href}
                        className="block py-2 text-lg font-medium transition-colors hover:text-primary"
                        onClick={() => setIsOpen(false)}
                      >
                        {item.name}
                      </Link>
                    )
                  )}
                </nav>

                {/* Mobile User Actions */}
                <div className="mt-8 pt-8 border-t space-y-4">
                  {isLoggedIn ? (
                    <>
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                      >
                        <User className="mr-2 h-4 w-4" />
                        My Account
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                      >
                        Order History
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button className="w-full">Sign In</Button>
                      <Button variant="outline" className="w-full">
                        Create Account
                      </Button>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
