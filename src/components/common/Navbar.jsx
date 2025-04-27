import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdown, setDropdown] = useState(null);

  const toggleDropdown = (index) => {
    if (dropdown === index) {
      setDropdown(null);
    } else {
      setDropdown(index);
    }
  };

  // Handle scrolling effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Navigation items focused on e-learning platform
  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Courses", href: "/courses" },
    { name: "Resources", href: "/resources" },
    // { name: "Teachers", href: "/teachers" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 shadow-md ${
        scrolled ? "bg-white shadow-md" : "bg-transparent"
      } transition-all duration-300`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="font-bold text-2xl text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Digi Pathshala
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <div key={index} className="relative group">
                {item.dropdown ? (
                  <div className="flex items-center cursor-pointer">
                    <button
                      className="text-gray-800 hover:text-blue-600 font-medium transition-colors duration-200"
                      onClick={() => toggleDropdown(index)}
                    >
                      {item.name}
                      <ChevronDown className="inline-block ml-1 w-4 h-4" />
                    </button>

                    {dropdown === index && (
                      <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                        {item.dropdown.map((subItem, subIndex) => (
                          <Link
                            key={subIndex}
                            to={subItem.href}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50"
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    to={item.href}
                    className="text-gray-800 hover:text-blue-600 font-medium transition-colors duration-200"
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link to="/choose-user">
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-purple-600 hover:to-blue-600 text-white px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                Get Started
              </button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-800 hover:text-blue-600 focus:outline-none"
            >
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="lg:hidden bg-white shadow-md">
          <div className="container mx-auto px-4 py-3">
            {navItems.map((item, index) => (
              <div key={index} className="py-2">
                {item.dropdown ? (
                  <div>
                    <button
                      className="w-full flex justify-between items-center text-gray-800 font-medium"
                      onClick={() => toggleDropdown(index)}
                    >
                      {item.name}
                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${
                          dropdown === index ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {dropdown === index && (
                      <div className="pl-4 mt-2 space-y-2">
                        {item.dropdown.map((subItem, subIndex) => (
                          <Link
                            key={subIndex}
                            to={subItem.href}
                            className="block text-gray-600 hover:text-blue-600"
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    to={item.href}
                    className="block text-gray-800 font-medium"
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
            <div className="pt-3 pb-2">
              <Link to="/choose-user">
                <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-purple-600 hover:to-blue-600 text-white py-2 rounded-lg">
                  Get Started
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
