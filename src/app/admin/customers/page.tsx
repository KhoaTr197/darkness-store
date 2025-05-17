"use client";

import { useState } from 'react';
import Link from 'next/link';
import { FaSearch, FaEye, FaTimes, FaSort, FaDownload, FaUser, FaUserPlus } from 'react-icons/fa';

// Mock data for customers
const mockCustomers = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@example.com',
    registered: '2023-05-15',
    orders: 12,
    totalSpent: 5299.95,
    lastOrder: '2023-10-18',
    status: 'Active'
  },
  {
    id: '2',
    name: 'Emily Johnson',
    email: 'emily.j@example.com',
    registered: '2023-06-20',
    orders: 5,
    totalSpent: 1499.97,
    lastOrder: '2023-10-14',
    status: 'Active'
  },
  {
    id: '3',
    name: 'Michael Brown',
    email: 'michael.brown@example.com',
    registered: '2023-03-10',
    orders: 8,
    totalSpent: 2799.92,
    lastOrder: '2023-09-30',
    status: 'Active'
  },
  {
    id: '4',
    name: 'Sarah Wilson',
    email: 'sarah.w@example.com',
    registered: '2023-07-05',
    orders: 3,
    totalSpent: 1899.99,
    lastOrder: '2023-10-10',
    status: 'Active'
  },
  {
    id: '5',
    name: 'Robert Davis',
    email: 'robert.d@example.com',
    registered: '2023-04-22',
    orders: 0,
    totalSpent: 0,
    lastOrder: 'N/A',
    status: 'Inactive'
  },
  {
    id: '6',
    name: 'Jennifer Miller',
    email: 'jennifer.m@example.com',
    registered: '2023-08-15',
    orders: 2,
    totalSpent: 899.98,
    lastOrder: '2023-09-15',
    status: 'Active'
  },
  {
    id: '7',
    name: 'William Taylor',
    email: 'william.t@example.com',
    registered: '2023-01-30',
    orders: 15,
    totalSpent: 8299.85,
    lastOrder: '2023-10-05',
    status: 'Active'
  },
  {
    id: '8',
    name: 'Amanda Garcia',
    email: 'amanda.g@example.com',
    registered: '2023-09-10',
    orders: 1,
    totalSpent: 399.99,
    lastOrder: '2023-09-10',
    status: 'Active'
  },
  {
    id: '9',
    name: 'Daniel Martinez',
    email: 'daniel.m@example.com',
    registered: '2023-02-15',
    orders: 0,
    totalSpent: 0,
    lastOrder: 'N/A',
    status: 'Inactive'
  }
];

const statusOptions = ['All Status', 'Active', 'Inactive'];

const CustomerStatusBadge = ({ status }: { status: string }) => {
  const colors = {
    'Active': 'bg-green-100 text-green-800',
    'Inactive': 'bg-gray-100 text-gray-800'
  };

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[status as keyof typeof colors]}`}>
      {status}
    </span>
  );
};

export default function CustomersPage() {
  const [customers, setCustomers] = useState(mockCustomers);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All Status');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');

  // Filter and sort customers
  const filteredCustomers = customers
    .filter(customer => {
      // Apply search query
      if (searchQuery && 
          !customer.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !customer.email.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      
      // Apply status filter
      if (selectedStatus !== 'All Status' && customer.status !== selectedStatus) {
        return false;
      }
      
      return true;
    })
    .sort((a, b) => {
      // Apply sorting
      const aValue = a[sortBy as keyof typeof a];
      const bValue = b[sortBy as keyof typeof b];
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortOrder === 'asc' 
          ? aValue.localeCompare(bValue) 
          : bValue.localeCompare(aValue);
      }
      
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
      }
      
      return 0;
    });

  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedStatus('All Status');
  };

  // Calculate summary statistics
  const totalCustomers = customers.length;
  const activeCustomers = customers.filter(c => c.status === 'Active').length;
  const totalRevenue = customers.reduce((sum, c) => sum + c.totalSpent, 0);
  const avgOrderValue = totalRevenue / customers.reduce((sum, c) => sum + c.orders, 0) || 0;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Customers</h1>
        <div className="flex items-center gap-2">
          <button
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg flex items-center transition-colors"
            onClick={() => alert('This would export customers to CSV')}
          >
            <FaDownload className="mr-2" />
            Export
          </button>
          <Link 
            href="/admin/customers/new" 
            className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg flex items-center transition-colors"
          >
            <FaUserPlus className="mr-2" />
            Add Customer
          </Link>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-xs p-4">
          <p className="text-gray-500 text-sm">Total Customers</p>
          <p className="text-2xl font-bold text-gray-900">{totalCustomers}</p>
        </div>
        <div className="bg-white rounded-lg shadow-xs p-4">
          <p className="text-gray-500 text-sm">Active Customers</p>
          <p className="text-2xl font-bold text-gray-900">{activeCustomers}</p>
        </div>
        <div className="bg-white rounded-lg shadow-xs p-4">
          <p className="text-gray-500 text-sm">Total Revenue</p>
          <p className="text-2xl font-bold text-gray-900">${totalRevenue.toFixed(2)}</p>
        </div>
        <div className="bg-white rounded-lg shadow-xs p-4">
          <p className="text-gray-500 text-sm">Avg Order Value</p>
          <p className="text-2xl font-bold text-gray-900">${avgOrderValue.toFixed(2)}</p>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow-xs p-4 space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search by customer name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <FaTimes className="text-gray-400 hover:text-gray-600" />
              </button>
            )}
          </div>

          <div className="flex flex-wrap gap-3">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="bg-white border border-gray-300 rounded-lg px-3 py-2 focus:ring-primary-500 focus:border-primary-500"
            >
              {statusOptions.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>

            {(searchQuery || selectedStatus !== 'All Status') && (
              <button
                onClick={resetFilters}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-lg transition-colors flex items-center"
              >
                <FaTimes className="mr-1" />
                Reset Filters
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-white rounded-lg shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <button 
                    className="flex items-center space-x-1"
                    onClick={() => handleSort('name')}
                  >
                    <span>Customer</span>
                    {sortBy === 'name' && (
                      <FaSort className={`ml-1 ${sortOrder === 'asc' ? 'transform rotate-180' : ''}`} />
                    )}
                  </button>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <button 
                    className="flex items-center space-x-1"
                    onClick={() => handleSort('registered')}
                  >
                    <span>Registered</span>
                    {sortBy === 'registered' && (
                      <FaSort className={`ml-1 ${sortOrder === 'asc' ? 'transform rotate-180' : ''}`} />
                    )}
                  </button>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <button 
                    className="flex items-center space-x-1"
                    onClick={() => handleSort('orders')}
                  >
                    <span>Orders</span>
                    {sortBy === 'orders' && (
                      <FaSort className={`ml-1 ${sortOrder === 'asc' ? 'transform rotate-180' : ''}`} />
                    )}
                  </button>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <button 
                    className="flex items-center space-x-1"
                    onClick={() => handleSort('totalSpent')}
                  >
                    <span>Total Spent</span>
                    {sortBy === 'totalSpent' && (
                      <FaSort className={`ml-1 ${sortOrder === 'asc' ? 'transform rotate-180' : ''}`} />
                    )}
                  </button>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <button 
                    className="flex items-center space-x-1"
                    onClick={() => handleSort('lastOrder')}
                  >
                    <span>Last Order</span>
                    {sortBy === 'lastOrder' && (
                      <FaSort className={`ml-1 ${sortOrder === 'asc' ? 'transform rotate-180' : ''}`} />
                    )}
                  </button>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <button 
                    className="flex items-center space-x-1"
                    onClick={() => handleSort('status')}
                  >
                    <span>Status</span>
                    {sortBy === 'status' && (
                      <FaSort className={`ml-1 ${sortOrder === 'asc' ? 'transform rotate-180' : ''}`} />
                    )}
                  </button>
                </th>
                <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredCustomers.map((customer) => (
                <tr key={customer.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="shrink-0 h-10 w-10 bg-primary-100 rounded-full flex items-center justify-center">
                        <FaUser className="h-5 w-5 text-primary-600" />
                      </div>
                      <div className="ml-4">
                        <div className="font-medium text-gray-900">{customer.name}</div>
                        <div className="text-sm text-gray-500">{customer.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{customer.registered}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{customer.orders}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {customer.totalSpent > 0 ? `$${customer.totalSpent.toFixed(2)}` : '$0.00'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{customer.lastOrder}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <CustomerStatusBadge status={customer.status} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                    <Link
                      href={`/admin/customers/${customer.id}`}
                      className="text-primary-600 hover:text-primary-900"
                    >
                      <FaEye className="w-5 h-5 mx-auto" />
                      <span className="sr-only">View</span>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredCustomers.length === 0 && (
          <div className="px-6 py-4 text-center">
            <p className="text-gray-500">No customers found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
} 