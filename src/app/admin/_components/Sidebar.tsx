import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  FaChartBar, 
  FaShoppingBag, 
  FaBoxOpen, 
  FaUsers, 
  FaTags, 
  FaCog, 
  FaSignOutAlt,
  FaChevronDown,
  FaChevronRight
} from 'react-icons/fa';
import { useState } from 'react';

interface NavItemProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  children?: {
    href: string;
    label: string;
  }[];
  pathname: string | null;
}

const NavItem = ({ href, icon, label, active, children, pathname }: NavItemProps) => {
  const [expanded, setExpanded] = useState(false);
  const hasChildren = children && children.length > 0;
  
  const toggleExpanded = (e: React.MouseEvent) => {
    if (hasChildren) {
      e.preventDefault();
      setExpanded(!expanded);
    }
  };
  
  return (
    <div className={`mb-1 ${hasChildren ? 'relative' : ''}`}>
      <Link
        href={hasChildren ? '#' : href}
        onClick={toggleExpanded}
        className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
          active
            ? 'bg-primary-100 text-primary-900'
            : 'text-gray-600 hover:text-primary-900 hover:bg-gray-100'
        }`}
      >
        <span className="mr-3">{icon}</span>
        <span>{label}</span>
        {hasChildren && (
          <span className="ml-auto">
            {expanded ? <FaChevronDown size={12} /> : <FaChevronRight size={12} />}
          </span>
        )}
      </Link>
      
      {hasChildren && expanded && (
        <div className="mt-1 ml-6 space-y-1">
          {children.map((child) => (
            <Link
              key={child.href}
              href={child.href}
              className={`block px-4 py-2 text-sm rounded-lg ${
                pathname === child.href
                  ? 'text-primary-900 bg-primary-50'
                  : 'text-gray-600 hover:text-primary-900 hover:bg-gray-100'
              }`}
            >
              {child.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default function Sidebar() {
  const pathname = usePathname();
  
  const navItems = [
    {
      href: '/admin',
      icon: <FaChartBar />,
      label: 'Dashboard',
    },
    {
      href: '/admin/orders',
      icon: <FaShoppingBag />,
      label: 'Orders',
    },
    {
      href: '/admin/products',
      icon: <FaBoxOpen />,
      label: 'Products',
      children: [
        {
          href: '/admin/products',
          label: 'All Products',
        },
        {
          href: '/admin/products/categories',
          label: 'Categories',
        },
        {
          href: '/admin/products/inventory',
          label: 'Inventory',
        },
      ]
    },
    {
      href: '/admin/customers',
      icon: <FaUsers />,
      label: 'Customers',
      children: [
        {
          href: '/admin/customers',
          label: 'All Customers',
        },
        {
          href: '/admin/customers/new',
          label: 'Add Customer',
        }
      ]
    },
    {
      href: '/admin/marketing',
      icon: <FaTags />,
      label: 'Marketing',
    },
    {
      href: '/admin/settings',
      icon: <FaCog />,
      label: 'Settings',
    },
  ];

  return (
    <div className="bg-white h-full w-64 border-r border-gray-200 flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <h1 className="text-xl font-bold text-primary-900">
          Darkness Store
        </h1>
        <p className="text-sm text-gray-500">Admin Panel</p>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4">
        <nav className="space-y-1">
          {navItems.map((item) => (
            <NavItem 
              key={item.href}
              href={item.href}
              icon={item.icon}
              label={item.label}
              active={pathname === item.href || pathname?.startsWith(item.href + '/')}
              children={item.children}
              pathname={pathname}
            />
          ))}
        </nav>
      </div>
      
      <div className="p-4 border-t border-gray-200">
        <button className="flex items-center w-full px-4 py-2 text-sm font-medium text-red-600 rounded-lg hover:bg-red-50 transition-colors">
          <FaSignOutAlt className="mr-3" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
} 