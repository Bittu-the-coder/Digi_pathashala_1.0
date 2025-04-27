import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  ArrowRight,
  Sparkles,
  Menu,
  X,
  ChevronDown,
  Search,
} from "lucide-react";
import { motion } from "framer-motion";
import image from "../assets/diamond.png";

// Animation variants
const rotatingAnimation = {
  animate: {
    rotate: 360,
    transition: {
      duration: 20,
      repeat: Infinity,
      ease: "linear",
    },
  },
};

const floatingAnimation = {
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

// Navbar component
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

  // Simplified navigation items focused on e-learning platform
  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Courses", href: "/courses" },
    { name: "Teachers", href: "/teachers" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 ${
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
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-purple-600 hover:to-blue-600 text-white px-5 py-2 rounded-lg shadow-md hover:shadow-lg transition-all">
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

// Improved Hero Component
function Hero() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-50 via-white to-pink-50 overflow-hidden pt-24">
      {/* Background Decorative Elements - simplified */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          variants={rotatingAnimation}
          animate="animate"
          className="absolute -top-20 -left-20 hidden md:block"
        >
          <img
            src={image}
            alt="Diamond"
            className="opacity-50 w-[150px] h-[150px] md:w-[200px] md:h-[200px]"
          />
        </motion.div>

        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1559251606-c623743a6d76?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] opacity-5" />
      </div>

      <div className="container mx-auto px-4 flex flex-col lg:flex-row w-full min-h-screen relative z-10">
        {/* Left Content Section */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="left w-full lg:w-1/2 flex justify-center items-start flex-col lg:pr-12 py-0 lg:py-0 lg:mt-0"
        >
          {/* Welcome Badge */}
          <motion.div
            variants={floatingAnimation}
            animate="animate"
            className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-blue-100 mb-6 shadow-lg"
          >
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-900">
              Welcome to Digi Pathshala
            </span>
          </motion.div>

          <div className="title mb-8 relative ">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="relative z-10"
            >
              <h3 className="text-gray-900 text-3xl font-bold mb-4">
                Learn from the Best
              </h3>
              <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 font-bold text-5xl lg:text-6xl mb-6 leading-tight">
                Connect with Expert Teachers
              </h1>
            </motion.div>
            <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-blue-600 to-purple-600 rounded-full" />
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-8 leading-relaxed text-lg text-gray-600 max-w-2xl"
          >
            Digi Pathshala connects students with expert teachers. Find courses
            that match your interests and learning goals, or sign up as a
            teacher and share your knowledge with eager students.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-6"
          >
            <Link to="/student-signin">
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-purple-600 hover:to-blue-600 text-white px-8 py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 group">
                Join as Student
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
            <Link to="/admin-signin">
              <button className="bg-white hover:bg-gray-50 text-gray-900 px-8 py-4 text-lg rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 hover:border-blue-200">
                Join as Teacher
              </button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Right Content Section */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="right w-full lg:w-1/2 flex flex-col justify-center items-center py-12 lg:py-0 lg:mt-0"
        >
          <div className="w-full max-w-2xl relative lg:mt-0 mt-10">
            <motion.div
              variants={floatingAnimation}
              animate="animate"
              className="rounded-2xl overflow-hidden shadow-2xl"
            >
              <img
                src="https://media.istockphoto.com/id/1352605843/photo/young-woman-working-at-home-stock-photo.webp?a=1&b=1&s=612x612&w=0&k=20&c=9jhWI0bO8yF2jcWGxCLsPSYTE2vAaa1taXIWGo4XRMM="
                alt="Digital Education"
                className="w-full h-auto"
              />
            </motion.div>
            {/* Decorative Corner Elements */}
            <div className="absolute -top-4 -left-4 w-8 h-8 border-t-2 border-l-2 border-blue-600 rounded-tl-lg" />
            <div className="absolute -top-4 -right-4 w-8 h-8 border-t-2 border-r-2 border-blue-600 rounded-tr-lg" />
            <div className="absolute -bottom-4 -left-4 w-8 h-8 border-b-2 border-l-2 border-blue-600 rounded-bl-lg" />
            <div className="absolute -bottom-4 -right-4 w-8 h-8 border-b-2 border-r-2 border-blue-600 rounded-br-lg" />
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// Teacher Search Section - NEW COMPONENT
const TeacherSearch = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Find Your Perfect Teacher
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Search for teachers by subject, expertise, or name to find the
            perfect match for your learning needs.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="relative flex items-center">
            <input
              type="text"
              placeholder="Search for teachers or courses..."
              className="w-full py-4 px-6 pr-12 rounded-full border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
            />
            <button className="absolute right-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full p-2">
              <Search className="w-6 h-6 text-white" />
            </button>
          </div>

          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <button className="py-2 px-4 rounded-full bg-blue-100 text-blue-700 hover:bg-blue-200 transition-colors">
              Mathematics
            </button>
            <button className="py-2 px-4 rounded-full bg-green-100 text-green-700 hover:bg-green-200 transition-colors">
              Science
            </button>
            <button className="py-2 px-4 rounded-full bg-yellow-100 text-yellow-700 hover:bg-yellow-200 transition-colors">
              Programming
            </button>
            <button className="py-2 px-4 rounded-full bg-purple-100 text-purple-700 hover:bg-purple-200 transition-colors">
              Languages
            </button>
            <button className="py-2 px-4 rounded-full bg-red-100 text-red-700 hover:bg-red-200 transition-colors">
              Arts
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

// Features Section - Simplified
const Features = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            How Digi Pathshala Works
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our platform connects students with teachers in a seamless digital
            learning environment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            {
              icon: "👨‍🏫",
              title: "Find Expert Teachers",
              description:
                "Search for teachers based on subject matter, expertise, and availability.",
            },
            {
              icon: "📚",
              title: "Enroll in Courses",
              description:
                "Browse and enroll in courses that match your learning goals and schedule.",
            },
            {
              icon: "🎓",
              title: "Track Your Progress",
              description:
                "Monitor your learning journey with detailed progress tracking and performance metrics.",
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 group border border-gray-100"
            >
              <div className="mb-5 text-4xl">{feature.icon}</div>
              <h4 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                {feature.title}
              </h4>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Testimonials Section - Updated for relevance
const Testimonials = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-pink-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            What Our Users Say
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Hear from students and teachers about their experiences with Digi
            Pathshala.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              quote:
                "Digi Pathshala helped me find the perfect math tutor. My grades have improved significantly after just a few sessions!",
              author: "Priya Sharma",
              role: "Student",
            },
            {
              quote:
                "As a teacher, I can now reach students worldwide. The platform makes it easy to create and manage my courses.",
              author: "Rajiv Kumar",
              role: "Teacher",
            },
            {
              quote:
                "The interactive learning tools and regular assessments keep me engaged and help track my progress in real-time.",
              author: "Aditya Patel",
              role: "Student",
            },
          ].map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-xl shadow-lg relative"
            >
              <div className="text-5xl text-blue-100 absolute top-4 right-4">
                "
              </div>
              <p className="text-gray-700 mb-6 relative z-10">
                {testimonial.quote}
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                  {testimonial.author.charAt(0)}
                </div>
                <div className="ml-4">
                  <h4 className="font-bold text-gray-900">
                    {testimonial.author}
                  </h4>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Call to Action Section - Simplified
const CallToAction = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Begin Your Journey?
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/student-signin">
              <button className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 w-full sm:w-auto">
                Join as Student
              </button>
            </Link>
            <Link to="/admin-signin">
              <button className="bg-transparent border-2 border-white text-white hover:bg-white/10 px-8 py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 w-full sm:w-auto">
                Sign In as Teacher
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

// Footer Component - Simplified
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-8">
          {/* Platform Info */}
          <div>
            <h3 className="text-xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
              Digi Pathshala
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
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { name: "Find Teachers", link: "/teachers" },
                { name: "Browse Courses", link: "/courses" },
                { name: "Become a Teacher", link: "/admin-register" },
                { name: "Student Resources", link: "/resources" },
                { name: "Contact Us", link: "/contact" },
              ].map((item, index) => (
                <li key={index}>
                  <Link
                    to={item.link}
                    className="text-gray-400 hover:text-white transition-colors duration-200"
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
              <li>support@digiPathshala.edu</li>
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
            © {new Date().getFullYear()} Digi Pathshala. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

// Main HomePage Component
function HomePage() {
  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      <Navbar />
      <Hero />
      <TeacherSearch />
      <Features />
      <Testimonials />
      <CallToAction />
      <Footer />
    </div>
  );
}

export default HomePage;
