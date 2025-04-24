import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-8">
          {/* Platform Info */}
          <div>
            <h3 className="text-xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
              Digi Pathashala
            </h3>
            <p className="text-gray-400 mb-4">
              Connecting students with expert teachers for quality online
              education.
            </p>
            <div className="flex space-x-4">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="bg-gray-800 p-2 rounded-full hover:bg-blue-600 transition-colors duration-300"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {[
                { name: "Find Teachers", link: "/teachers" },
                { name: "Browse Courses", link: "/courses" },
                { name: "Study Resources", link: "/resources" },
                { name: "Become a Teacher", link: "/admin-signin" },
                { name: "Help Center", link: "/help" },
              ].map((item, index) => (
                <li key={index}>
                  <Link
                    to={item.link}
                    className="text-gray-400 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-blue-400 hover:to-purple-400 transition-colors duration-200"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2 text-gray-400">
              <li>support@digipathashala.edu</li>
              <li>+91 123 456 7890</li>
              <li>
                <Link
                  to="/contact"
                  className="text-blue-400 hover:text-blue-300"
                >
                  Send us a message
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6">
          <p className="text-gray-500 text-sm text-center">
            © {new Date().getFullYear()} Digi Pathashala. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
