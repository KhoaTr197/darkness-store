"use client";

import { useState } from 'react';
import Link from 'next/link';
import { FaBoxOpen, FaChartLine, FaDollarSign, FaShoppingBag, FaUsers, FaUser } from 'react-icons/fa';

// Mock data for the dashboard
const dashboardStats = {
  totalRevenue: 152495.32,
  totalOrders: 1253,
  totalProducts: 156,
  totalCustomers: 892,
  averageOrderValue: 121.70,
  conversionRate: 3.2,
};

const recentOrders = [
  { id: 'ORD-10005', customer: 'Emily Johnson', date: '2023-10-18', total: 1899.99, status: 'Processing' },
  { id: 'ORD-10004', customer: 'John Smith', date: '2023-10-17', total: 499.99, status: 'Shipped' },
  { id: 'ORD-10003', customer: 'Michael Brown', date: '2023-10-16', total: 799.99, status: 'Delivered' },
  { id: 'ORD-10002', customer: 'Sarah Wilson', date: '2023-10-15', total: 299.99, status: 'Delivered' },
  { id: 'ORD-10001', customer: 'Robert Davis', date: '2023-10-14', total: 1299.99, status: 'Delivered' },
];

const recentCustomers = [
  { id: '8', name: 'Amanda Garcia', email: 'amanda.g@example.com', date: '2023-10-10', orders: 1, spent: 399.99 },
  { id: '6', name: 'Jennifer Miller', email: 'jennifer.m@example.com', date: '2023-10-05', orders: 2, spent: 899.98 },
  { id: '4', name: 'Sarah Wilson', email: 'sarah.w@example.com', date: '2023-10-01', orders: 3, spent: 1899.99 },
  { id: '2', name: 'Emily Johnson', email: 'emily.j@example.com', date: '2023-09-28', orders: 5, spent: 1499.97 },
];

const lowStockProducts = [
  { id: 'PRD-001', name: 'NVIDIA GeForce RTX 4080 SUPER', stock: 3, price: 1399.99 },
  { id: 'PRD-005', name: 'AMD Ryzen 9 7950X', stock: 5, price: 699.99 },
  { id: 'PRD-010', name: 'Samsung 990 PRO 2TB SSD', stock: 2, price: 249.99 },
  { id: 'PRD-015', name: 'Corsair Dominator 32GB DDR5', stock: 4, price: 189.99 },
];

const StatCard = ({ title, value, icon, colorClass }: { title: string; value: string | number; icon: React.ReactNode; colorClass: string }) => (
  <div className="bg-white rounded-lg shadow-sm p-6">
    <div className="flex items-center">
      <div className={`flex-shrink-0 rounded-full p-3 ${colorClass}`}>
        {icon}
      </div>
      <div className="ml-5">
        <p className="text-gray-500 text-sm font-medium">{title}</p>
        <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
      </div>
    </div>
  </div>
);

export default function AdminDashboard() {
  const [timeRange, setTimeRange] = useState('7d');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <div className="flex items-center space-x-3">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
          </select>
        </div>
      </div>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatCard
          title="Total Revenue"
          value={`$${dashboardStats.totalRevenue.toLocaleString()}`}
          icon={<FaDollarSign className="h-5 w-5 text-green-600" />}
          colorClass="bg-green-100"
        />
        <StatCard
          title="Total Orders"
          value={dashboardStats.totalOrders}
          icon={<FaShoppingBag className="h-5 w-5 text-blue-600" />}
          colorClass="bg-blue-100"
        />
        <StatCard
          title="Total Products"
          value={dashboardStats.totalProducts}
          icon={<FaBoxOpen className="h-5 w-5 text-purple-600" />}
          colorClass="bg-purple-100"
        />
        <StatCard
          title="Total Customers"
          value={dashboardStats.totalCustomers}
          icon={<FaUsers className="h-5 w-5 text-orange-600" />}
          colorClass="bg-orange-100"
        />
        <StatCard
          title="Average Order Value"
          value={`$${dashboardStats.averageOrderValue.toFixed(2)}`}
          icon={<FaChartLine className="h-5 w-5 text-indigo-600" />}
          colorClass="bg-indigo-100"
        />
        <StatCard
          title="Conversion Rate"
          value={`${dashboardStats.conversionRate}%`}
          icon={<FaChartLine className="h-5 w-5 text-pink-600" />}
          colorClass="bg-pink-100"
        />
      </div>
      
      {/* Recent Orders & Low Stock Products */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-900">Recent Orders</h2>
            <Link href="/admin/orders" className="text-primary-600 hover:text-primary-800 text-sm font-medium">
              View All
            </Link>
          </div>
          <div className="overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order ID
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentOrders.map((order) => (
                  <tr key={order.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-primary-600">
                      <Link href={`/admin/orders/${order.id}`}>
                        {order.id}
                      </Link>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {order.customer}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {order.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      ${order.total.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${order.status === 'Delivered' ? 'bg-green-100 text-green-800' : 
                          order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' : 
                          order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' : 
                          'bg-gray-100 text-gray-800'}`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-900">Low Stock Products</h2>
            <Link href="/admin/products/inventory" className="text-primary-600 hover:text-primary-800 text-sm font-medium">
              View Inventory
            </Link>
          </div>
          <div className="overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Stock
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {lowStockProducts.map((product) => (
                  <tr key={product.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-primary-600">
                      <Link href={`/admin/products/${product.id}`}>
                        {product.name}
                      </Link>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ${product.price.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full
                        ${product.stock <= 2 ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}`}>
                        {product.stock} left
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      {/* Recent Customers Section */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-900">Recent Customers</h2>
          <Link href="/admin/customers" className="text-primary-600 hover:text-primary-800 text-sm font-medium">
            View All Customers
          </Link>
        </div>
        <div className="overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Joined
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Orders
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Spent
                </th>
                <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Profile
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentCustomers.map((customer) => (
                <tr key={customer.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 bg-primary-100 rounded-full flex items-center justify-center">
                        <FaUser className="h-5 w-5 text-primary-600" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{customer.name}</div>
                        <div className="text-sm text-gray-500">{customer.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {customer.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {customer.orders}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    ${customer.spent.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                    <Link href={`/admin/customers/${customer.id}`} className="text-primary-600 hover:text-primary-900">
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
} 