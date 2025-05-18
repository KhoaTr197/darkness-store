"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { FaAngleRight } from "react-icons/fa";
import { createPortal } from "react-dom";
// -----------------------

type Category = {
  name: string;
  link: string;
  subcategories?: Category[];
}

const categories: Category[] = [
  {
    name: "Built-in PC",
    link: "/category/built-in-pc",
  },
  {
    name: "Components",
    link: "/category/components",
    subcategories: [
      { name: "CPU", link: "/category/components/cpu" },
      { name: "GPU", link: "/category/components/gpu" },
      { name: "Mainboard", link: "/category/components/mainboard" },
      { name: "RAM", link: "/category/components/ram" },
      { name: "Power Supply", link: "/category/components/power-supply" },
      { name: "Computer Case", link: "/category/components/computer-case" },
    ]
  },
  {
    name: "Storage",
    link: "/category/storage",
    subcategories: [
      { name: "HDD", link: "/category/storage/hdd" },
      { name: "SSD", link: "/category/storage/ssd" },
    ]
  },
  {
    name: "Laptop",
    link: "/category/laptop",
  },
  {
    name: "Laptop Gaming",
    link: "/category/laptop-gaming",
  },
  {
    name: "Monitor",
    link: "/category/monitor",
  },
  {
    name: "Keyboard",
    link: "/category/keyboard",
  },
  {
    name: "Mouse",
    link: "/category/mouse",
  },
  {
    name: "Gaming",
    link: "/category/gaming",
  },
  {
    name: "Networking",
    link: "/category/networking",
  },
  {
    name: "Software",
    link: "/category/software",
    subcategories: [
      { name: "Windows", link: "/category/software/windows" },
      { name: "Office", link: "/category/software/office" },
    ]
  },
  {
    name: "Audio",
    link: "/category/audio",
    subcategories: [
      { name: "Headphones", link: "/category/audio/headphones" },
      { name: "Speakers", link: "/category/audio/speakers" },
    ]
  },
  {
    name: "Accessories",
    link: "/category/accessories",
    subcategories: [
      { name: "Cables", link: "/category/accessories/cables" },
      { name: "Tools", link: "/category/accessories/tools" },
    ]
  },
];

const CategoryNavbar = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [menuPosition, setMenuPosition] = useState({
    top: 0,
    left: 0
  });
  const navRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  // Track if component is mounted to safely use portals
  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  const handleMouseEnter = (categoryName: string, element: HTMLElement) => {
    setActiveCategory(categoryName);
    
    // Calculate position for submenu
    if (element && navRef.current) {
      const rect = element.getBoundingClientRect();
      setMenuPosition({
        top: rect.top,
        left: rect.right
      });
    }
  };

  const handleMouseLeave = () => {
    setActiveCategory(null);
  };

  // Function to find the active category's subcategories
  const getActiveSubcategories = () => {
    if (!activeCategory) return null;
    const category = categories.find(category => category.name === activeCategory);
    return category?.subcategories || null;
  };
  
  const activeSubcategories = getActiveSubcategories();

  return (
    <div 
      className="relative bg-white rounded-lg"
      onMouseLeave={handleMouseLeave}
      ref={navRef}
    >
      <div className="w-full">
        <ul className="flex flex-col w-full">
          {categories.map((category) => (
            <li 
              key={category.name}
              onMouseEnter={(e) => handleMouseEnter(category.name, e.currentTarget)}
              className={`relative hover:bg-primary-400 text-black hover:text-white transition-colors duration-200 ${activeCategory === category.name ? 'bg-primary-400 text-white' : ''}`}
            >
              <Link 
                href={category.link}
                className="flex items-center justify-between px-4 py-2"
              >
                <span>{category.name}</span>
                {category.subcategories && (
                  <FaAngleRight className="text-sm" />
                )}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {isMounted && activeSubcategories && createPortal(
        <div 
          className="overflow-hidden fixed min-w-40 bg-white shadow-xl rounded-e-lg z-9999"
          style={{ 
            top: `${menuPosition.top}px`, 
            left: `${menuPosition.left}px`,
          }}
          onMouseEnter={() => setActiveCategory(activeCategory)}
          onMouseLeave={handleMouseLeave}
        >
          <ul>
            {activeSubcategories.map((subcat) => (
              <li 
                key={subcat.name}
                className="text-gray-700 hover:bg-primary-400 hover:text-white transition-colors duration-200"
              >
                <Link 
                  href={subcat.link}
                  className="flex px-4 py-2"
                >
                  {subcat.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>,
        document.body
      )}
    </div>
  );
};

export default CategoryNavbar; 