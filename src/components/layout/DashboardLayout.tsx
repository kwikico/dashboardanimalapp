import React, { ReactNode } from 'react';
import Link from 'next/link';
import { FiHome, FiUsers, FiHeart, FiAward, FiLayers, FiSettings, FiLogOut } from 'react-icons/fi';

interface DashboardLayoutProps {
  children: ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const navItems = [
    { name: 'Dashboard', href: '/dashboard', icon: FiHome },
    { name: 'Dogs', href: '/dashboard/dogs', icon: FiUsers },
    { name: 'Health Records', href: '/dashboard/health', icon: FiHeart },
    { name: 'Achievements', href: '/dashboard/achievements', icon: FiAward },
    { name: 'Litters', href: '/dashboard/litters', icon: FiLayers },
    { name: 'Settings', href: '/dashboard/settings', icon: FiSettings },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 z-10 w-64 bg-white border-r border-gray-200 hidden md:block">
        <div className="flex flex-col h-full">
          <div className="flex items-center h-16 px-6 border-b border-gray-200">
            <Link href="/dashboard" className="text-xl font-bold text-blue-600">
              Dog Breeder
            </Link>
          </div>
          <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center px-2 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-100"
              >
                <item.icon className="w-5 h-5 mr-3 text-gray-500" />
                {item.name}
              </Link>
            ))}
          </nav>
          <div className="p-4 border-t border-gray-200">
            <button className="flex items-center w-full px-2 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-100">
              <FiLogOut className="w-5 h-5 mr-3 text-gray-500" />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Mobile header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-10 flex items-center h-16 px-4 bg-white border-b border-gray-200">
        <Link href="/dashboard" className="text-xl font-bold text-blue-600">
          Dog Breeder
        </Link>
      </div>

      {/* Main content */}
      <div className="md:pl-64 pt-16 md:pt-0">
        <main className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-6">
          {children}
        </main>
      </div>
    </div>
  );
};