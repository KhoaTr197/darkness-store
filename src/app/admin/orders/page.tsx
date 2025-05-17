"use client";

import { useState } from 'react';
import Link from 'next/link';
import { FaSearch, FaEye, FaTimes, FaSort, FaDownload } from 'react-icons/fa';

// Mock data for orders
const mockOrders = [
  {
    id: 'ORD-1025',
    customer: 'John Smith',
    email: 'john.smith@example.com',
    date: '2023-10-15',
    total: 2499.98,
    status: 'Completed',
    payment: 'Credit Card',
    items: 3
  },
  {
    id: 'ORD-1024',
    customer: 'Emily Johnson',
    email: 'emily.j@example.com',
    date: '2023-10-14',
    total: 899.99,
    status: 'Processing',
    payment: 'PayPal',
    items: 1
  },
  {
    id: 'ORD-1023',
    customer: 'Michael Brown',
    email: 'michael.brown@example.com',
    date: '2023-10-12',
    total: 349.95,
    status: 'Shipped',
    payment: 'Credit Card',
    items: 2
  },
  {
    id: 'ORD-1022',
    customer: 'Sarah Wilson',
    email: 'sarah.w@example.com',
    date: '2023-10-10',
    total: 1299.99,
    status: 'Delivered',
    payment: 'Credit Card',
    items: 1
  },
  {
    id: 'ORD-1021',
    customer: 'Robert Davis',
    email: 'robert.d@example.com',
    date: '2023-10-08',
    total: 449.98,
    status: 'Cancelled',
    payment: 'PayPal',
    items: 2
  },
  {
    id: 'ORD-1020',
    customer: 'Jennifer Miller',
    email: 'jennifer.m@example.com',
    date: '2023-10-05',
    total: 749.97,
    status: 'Completed',
    payment: 'Credit Card',
    items: 3
  },
  {
    id: 'ORD-1019',
    customer: 'William Taylor',
    email: 'william.t@example.com',
    date: '2023-10-03',
    total: 1699.99,
    status: 'Refunded',
    payment: 'Credit Card',
    items: 1
  }
];

const statusOptions = ['All Status', 'Processing', 'Shipped', 'Delivered', 'Completed', 'Cancelled', 'Refunded'];
const paymentOptions = ['All Payment Methods', 'Credit Card', 'PayPal', 'Bank Transfer'];

const OrderStatusBadge = ({ status }: { status: string }) => {
  const colors = {
    'Processing': 'bg-blue-100 text-blue-800',
    'Shipped': 'bg-purple-100 text-purple-800',
    'Delivered': 'bg-indigo-100 text-indigo-800',
    'Completed': 'bg-green-100 text-green-800',
    'Cancelled': 'bg-red-100 text-red-800',
    'Refunded': 'bg-yellow-100 text-yellow-800'
  };

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[status as keyof typeof colors]}`}>
      {status}
    </span>
  );
};

export default function OrdersPage() {
  const [orders, setOrders] = useState(mockOrders);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All Status');
  const [selectedPayment, setSelectedPayment] = useState('All Payment Methods');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });

  // Filter and sort orders
  const filteredOrders = orders
    .filter(order => {
      // Apply search query
      if (searchQuery && 
          !order.id.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !order.customer.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !order.email.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      
      // Apply status filter
      if (selectedStatus !== 'All Status' && order.status !== selectedStatus) {
        return false;
      }
      
      // Apply payment filter
      if (selectedPayment !== 'All Payment Methods' && order.payment !== selectedPayment) {
        return false;
      }
      
      // Apply date range filter
      if (dateRange.start && new Date(order.date) < new Date(dateRange.start)) {
        return false;
      }
      
      if (dateRange.end && new Date(order.date) > new Date(dateRange.end)) {
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
      setSortOrder('desc');
    }
  };

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedStatus('All Status');
    setSelectedPayment('All Payment Methods');
    setDateRange({ start: '', end: '' });
  };

  const totalRevenue = filteredOrders.reduce((sum, order) => sum + order.total, 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
        <button
          className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg flex items-center transition-colors"
          onClick={() => alert('This would export orders to CSV')}
        >
          <FaDownload className="mr-2" />
          Export Orders
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-xs p-4">
          <p className="text-gray-500 text-sm">Total Orders</p>
          <p className="text-2xl font-bold text-gray-900">{filteredOrders.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow-xs p-4">
          <p className="text-gray-500 text-sm">Total Revenue</p>
          <p className="text-2xl font-bold text-gray-900">${totalRevenue.toFixed(2)}</p>
        </div>
        <div className="bg-white rounded-lg shadow-xs p-4">
          <p className="text-gray-500 text-sm">Processing</p>
          <p className="text-2xl font-bold text-gray-900">
            {orders.filter(order => order.status === 'Processing').length}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-xs p-4">
          <p className="text-gray-500 text-sm">Completed</p>
          <p className="text-2xl font-bold text-gray-900">
            {orders.filter(order => order.status === 'Completed').length}
          </p>
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
              placeholder="Search by order ID, customer or email..."
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

            <select
              value={selectedPayment}
              onChange={(e) => setSelectedPayment(e.target.value)}
              className="bg-white border border-gray-300 rounded-lg px-3 py-2 focus:ring-primary-500 focus:border-primary-500"
            >
              {paymentOptions.map(payment => (
                <option key={payment} value={payment}>{payment}</option>
              ))}
            </select>

            {(searchQuery || selectedStatus !== 'All Status' || selectedPayment !== 'All Payment Methods' || dateRange.start || dateRange.end) && (
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

        <div className="flex flex-wrap gap-4">
          <div>
            <label htmlFor="start-date" className="block text-sm font-medium text-gray-700 mb-1">
              Start Date
            </label>
            <input
              type="date"
              id="start-date"
              value={dateRange.start}
              onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
              className="bg-white border border-gray-300 rounded-lg px-3 py-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          <div>
            <label htmlFor="end-date" className="block text-sm font-medium text-gray-700 mb-1">
              End Date
            </label>
            <input
              type="date"
              id="end-date"
              value={dateRange.end}
              onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
              className="bg-white border border-gray-300 rounded-lg px-3 py-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-lg shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <button 
                    className="flex items-center space-x-1"
                    onClick={() => handleSort('id')}
                  >
                    <span>Order ID</span>
                    {sortBy === 'id' && (
                      <FaSort className={`ml-1 ${sortOrder === 'asc' ? 'transform rotate-180' : ''}`} />
                    )}
                  </button>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <button 
                    className="flex items-center space-x-1"
                    onClick={() => handleSort('customer')}
                  >
                    <span>Customer</span>
                    {sortBy === 'customer' && (
                      <FaSort className={`ml-1 ${sortOrder === 'asc' ? 'transform rotate-180' : ''}`} />
                    )}
                  </button>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <button 
                    className="flex items-center space-x-1"
                    onClick={() => handleSort('date')}
                  >
                    <span>Date</span>
                    {sortBy === 'date' && (
                      <FaSort className={`ml-1 ${sortOrder === 'asc' ? 'transform rotate-180' : ''}`} />
                    )}
                  </button>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <button 
                    className="flex items-center space-x-1"
                    onClick={() => handleSort('total')}
                  >
                    <span>Total</span>
                    {sortBy === 'total' && (
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
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <button 
                    className="flex items-center space-x-1"
                    onClick={() => handleSort('payment')}
                  >
                    <span>Payment</span>
                    {sortBy === 'payment' && (
                      <FaSort className={`ml-1 ${sortOrder === 'asc' ? 'transform rotate-180' : ''}`} />
                    )}
                  </button>
                </th>
                <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <button 
                    className="flex items-center space-x-1"
                    onClick={() => handleSort('items')}
                  >
                    <span>Items</span>
                    {sortBy === 'items' && (
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
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-primary-600">{order.id}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{order.customer}</div>
                    <div className="text-sm text-gray-500">{order.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{order.date}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">${order.total.toFixed(2)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <OrderStatusBadge status={order.status} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{order.payment}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <div className="text-sm text-gray-900">{order.items}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                    <Link
                      href={`/admin/orders/${order.id}`}
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
        
        {filteredOrders.length === 0 && (
          <div className="px-6 py-4 text-center">
            <p className="text-gray-500">No orders found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
} 