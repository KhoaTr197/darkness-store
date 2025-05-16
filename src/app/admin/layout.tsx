"use client";

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { FaHome, FaBox, FaShoppingCart, FaUsers, FaChartLine, FaCog, FaSignOutAlt } from 'react-icons/fa';

// Mock authentication - in a real app, this would use your auth system
const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate auth check - in a real app you would check session/token validity
    const checkAuth = () => {
      // Check if we have a simulated login token in localStorage
      const isLoggedIn = localStorage.getItem('adminLoggedIn') === 'true';
      setIsAuthenticated(isLoggedIn);
      setIsLoading(false);
    };
    
    checkAuth();
  }, []);

  return { 
    isAuthenticated, 
    isLoading,
    logout: () => {
      localStorage.removeItem('adminLoggedIn');
      setIsAuthenticated(false);
    }
  };
};

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: FaHome },
  { name: 'Products', href: '/admin/products', icon: FaBox },
  { name: 'Orders', href: '/admin/orders', icon: FaShoppingCart },
  { name: 'Customers', href: '/admin/customers', icon: FaUsers },
  { name: 'Analytics', href: '/admin/analytics', icon: FaChartLine },
  { name: 'Settings', href: '/admin/settings', icon: FaCog },
];

function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading, logout } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 bg-foreground text-background">
        <div className="h-16 flex items-center px-6 bg-foreground shadow">
          <h1 className="text-xl font-bold">Darkness Admin</h1>
        </div>
        <nav className="mt-6 px-4">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="group flex items-center px-3 py-3 text-sm font-medium rounded-lg hover:bg-primary/10 transition-colors"
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.name}
            </Link>
          ))}
          <button 
            onClick={logout}
            className="w-full mt-6 group flex items-center px-3 py-3 text-sm font-medium rounded-lg hover:bg-primary/10 transition-colors text-red-400"
          >
            <FaSignOutAlt className="mr-3 h-5 w-5" />
            Sign Out
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="pl-64">
        <header className="h-16 bg-foreground shadow flex items-center px-6">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search..."
              className="w-96 px-4 py-2 rounded-lg border border-primary/20 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full hover:bg-primary/10 transition-colors relative">
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-background text-xs rounded-full flex items-center justify-center">
                3
              </span>
              <svg className="w-6 h-6 text-background" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>
            <div className="flex items-center">
              <img
                src="https://ui-avatars.com/api/?name=Admin+User&background=6366f1&color=fff"
                alt="Admin User"
                className="h-8 w-8 rounded-full"
              />
              <span className="ml-2 font-medium text-background">Admin User</span>
            </div>
          </div>
        </header>

        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && !isAuthenticated && pathname !== '/admin/login') {
      router.push('/admin/login');
    }
  }, [isLoading, isAuthenticated, router, pathname]);

  // If we're on the login page, just render the children
  if (pathname === '/admin/login') {
    return children;
  }

  // For all other admin routes, use the dashboard layout
  return <AdminDashboardLayout>{children}</AdminDashboardLayout>;
} 