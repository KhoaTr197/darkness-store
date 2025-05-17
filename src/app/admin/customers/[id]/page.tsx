"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { FaArrowLeft, FaEdit, FaEnvelope, FaHistory, FaShoppingBag, FaTrash, FaUser } from 'react-icons/fa';

// Mock data - in a real application this would come from an API
const mockCustomers = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@example.com',
    phone: '+1 (555) 123-4567',
    address: {
      street: '123 Main St',
      city: 'Austin',
      state: 'TX',
      zip: '78701',
      country: 'USA'
    },
    registered: '2023-05-15',
    orders: 12,
    totalSpent: 5299.95,
    lastOrder: '2023-10-18',
    status: 'Active',
    notes: 'Prefers communication by email. Interested in gaming PCs.'
  },
  {
    id: '2',
    name: 'Emily Johnson',
    email: 'emily.j@example.com',
    phone: '+1 (555) 987-6543',
    address: {
      street: '456 Oak Ave',
      city: 'Seattle',
      state: 'WA',
      zip: '98101',
      country: 'USA'
    },
    registered: '2023-06-20',
    orders: 5,
    totalSpent: 1499.97,
    lastOrder: '2023-10-14',
    status: 'Active',
    notes: 'Looking for monitor upgrades.'
  },
  // More customers would be here
];

// Mock orders for the customer
const mockOrders = [
  {
    id: 'ORD-10001',
    date: '2023-10-18',
    total: 899.99,
    status: 'Delivered',
    items: 3,
    paymentMethod: 'Credit Card'
  },
  {
    id: 'ORD-10002',
    date: '2023-09-24',
    total: 1299.99,
    status: 'Delivered',
    items: 2,
    paymentMethod: 'Credit Card'
  },
  {
    id: 'ORD-10003',
    date: '2023-08-11',
    total: 699.99,
    status: 'Delivered',
    items: 1,
    paymentMethod: 'PayPal'
  },
  {
    id: 'ORD-10004',
    date: '2023-07-05',
    total: 499.99,
    status: 'Delivered',
    items: 4,
    paymentMethod: 'Credit Card'
  },
  {
    id: 'ORD-10005',
    date: '2023-06-22',
    total: 1899.99,
    status: 'Delivered',
    items: 3,
    paymentMethod: 'PayPal'
  }
];

export default function CustomerDetailPage() {
  const params = useParams();
  const router = useRouter();
  const customerId = params.id as string;
  
  const [customer, setCustomer] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    // Simulating API fetch
    const fetchData = () => {
      const foundCustomer = mockCustomers.find(c => c.id === customerId);
      
      if (foundCustomer) {
        setCustomer(foundCustomer);
        setOrders(mockOrders); // In real app, fetch orders for this specific customer
      }
      
      setLoading(false);
    };
    
    fetchData();
  }, [customerId]);

  const handleDeleteCustomer = () => {
    // Display confirmation dialog
    if (window.confirm('Are you sure you want to delete this customer? This action cannot be undone.')) {
      // In a real app, call API to delete customer
      alert('Customer would be deleted');
      router.push('/admin/customers');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!customer) {
    return (
      <div className="bg-white rounded-lg shadow-xs p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Customer Not Found</h2>
        <p className="text-gray-600 mb-6">The customer you're looking for doesn't exist or has been removed.</p>
        <Link 
          href="/admin/customers" 
          className="inline-flex items-center text-primary-600 hover:text-primary-800"
        >
          <FaArrowLeft className="mr-2" />
          Back to Customers
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <Link 
            href="/admin/customers" 
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <FaArrowLeft size={20} />
            <span className="sr-only">Back to Customers</span>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Customer Details</h1>
        </div>
        <div className="flex space-x-3">
          <Link
            href={`/admin/customers/${customer.id}/edit`}
            className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg flex items-center transition-colors"
          >
            <FaEdit className="mr-2" />
            Edit Customer
          </Link>
          <button
            onClick={handleDeleteCustomer}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center transition-colors"
          >
            <FaTrash className="mr-2" />
            Delete
          </button>
        </div>
      </div>

      {/* Customer Card */}
      <div className="bg-white rounded-lg shadow-xs p-6">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/4 mb-4 md:mb-0 md:mr-8 flex flex-col items-center">
            <div className="h-32 w-32 bg-primary-100 rounded-full flex items-center justify-center">
              <FaUser className="h-16 w-16 text-primary-600" />
            </div>
            <div className="mt-4 text-center">
              <h2 className="text-xl font-bold text-gray-900">{customer.name}</h2>
              <p className="text-gray-500">Customer ID: {customer.id}</p>
              <div className="mt-2">
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                  customer.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {customer.status}
                </span>
              </div>
            </div>
          </div>
          
          <div className="md:w-3/4">
            <div className="border-b border-gray-200 pb-4 mb-4">
              <h3 className="text-lg font-medium text-gray-900 mb-3">Contact Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start">
                  <FaEnvelope className="mt-1 mr-2 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Email</p>
                    <p className="text-gray-900">{customer.email}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <FaUser className="mt-1 mr-2 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Phone</p>
                    <p className="text-gray-900">{customer.phone}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="border-b border-gray-200 pb-4 mb-4">
              <h3 className="text-lg font-medium text-gray-900 mb-3">Address</h3>
              <p className="text-gray-900">{customer.address.street}</p>
              <p className="text-gray-900">{customer.address.city}, {customer.address.state} {customer.address.zip}</p>
              <p className="text-gray-900">{customer.address.country}</p>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">Account Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Registration Date</p>
                  <p className="text-gray-900">{customer.registered}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Total Orders</p>
                  <p className="text-gray-900">{customer.orders}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Total Spent</p>
                  <p className="text-gray-900">${customer.totalSpent.toFixed(2)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-xs overflow-hidden">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-4 px-6 text-center border-b-2 font-medium text-sm flex items-center ${
                activeTab === 'overview'
                  ? 'border-primary-600 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <FaUser className="mr-2" />
              Overview
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`py-4 px-6 text-center border-b-2 font-medium text-sm flex items-center ${
                activeTab === 'orders'
                  ? 'border-primary-600 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <FaShoppingBag className="mr-2" />
              Orders
            </button>
            <button
              onClick={() => setActiveTab('activity')}
              className={`py-4 px-6 text-center border-b-2 font-medium text-sm flex items-center ${
                activeTab === 'activity'
                  ? 'border-primary-600 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <FaHistory className="mr-2" />
              Activity
            </button>
          </nav>
        </div>

        <div className="p-6">
          {/* Overview Tab Content */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">Customer Notes</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-800">{customer.notes || 'No notes available.'}</p>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">Recent Activity</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-600">Last order placed on {customer.lastOrder}</p>
                  <p className="text-gray-600">Last login: 2 days ago</p>
                  <p className="text-gray-600">Last profile update: 3 weeks ago</p>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">Purchase Behavior</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-600">Average order value: ${(customer.totalSpent / (customer.orders || 1)).toFixed(2)}</p>
                  <p className="text-gray-600">Most purchased category: Gaming Components</p>
                  <p className="text-gray-600">Preferred payment method: Credit Card</p>
                </div>
              </div>
            </div>
          )}

          {/* Orders Tab Content */}
          {activeTab === 'orders' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">Order History</h3>
                <Link
                  href={`/admin/orders?customer=${customer.id}`}
                  className="text-primary-600 hover:text-primary-800 text-sm font-medium"
                >
                  View All Orders
                </Link>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Order ID
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Items
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Payment
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Total
                      </th>
                      <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {orders.map((order) => (
                      <tr key={order.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                          {order.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {order.date}
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
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {order.items}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {order.paymentMethod}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          ${order.total.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          <Link 
                            href={`/admin/orders/${order.id}`}
                            className="text-primary-600 hover:text-primary-900 text-sm font-medium"
                          >
                            View
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {orders.length === 0 && (
                <div className="text-center py-10">
                  <p className="text-gray-500 mb-4">No orders found for this customer.</p>
                  <Link
                    href="/admin/orders/new"
                    className="text-primary-600 hover:text-primary-800 font-medium"
                  >
                    Create New Order
                  </Link>
                </div>
              )}
            </div>
          )}

          {/* Activity Tab Content */}
          {activeTab === 'activity' && (
            <div className="space-y-6">
              <p className="text-sm text-gray-500">Showing recent account activity and events</p>
              
              <div className="space-y-4">
                <div className="relative pb-8">
                  <div className="absolute top-5 left-5 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true"></div>
                  <div className="relative flex items-start space-x-3">
                    <div className="relative">
                      <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center ring-8 ring-white">
                        <FaShoppingBag className="h-5 w-5 text-primary-600" />
                      </div>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div>
                        <div className="text-sm">
                          <span className="font-medium text-gray-900">Placed an order</span>
                        </div>
                        <p className="mt-0.5 text-sm text-gray-500">
                          Order #ORD-10001 for $899.99
                        </p>
                        <p className="mt-2 text-xs text-gray-500">Oct 18, 2023 at 3:45 PM</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="relative pb-8">
                  <div className="absolute top-5 left-5 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true"></div>
                  <div className="relative flex items-start space-x-3">
                    <div className="relative">
                      <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center ring-8 ring-white">
                        <FaEnvelope className="h-5 w-5 text-blue-600" />
                      </div>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div>
                        <div className="text-sm">
                          <span className="font-medium text-gray-900">Opened promotional email</span>
                        </div>
                        <p className="mt-0.5 text-sm text-gray-500">
                          "October Gaming Deals" campaign
                        </p>
                        <p className="mt-2 text-xs text-gray-500">Oct 15, 2023 at 1:22 PM</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="relative pb-8">
                  <div className="absolute top-5 left-5 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true"></div>
                  <div className="relative flex items-start space-x-3">
                    <div className="relative">
                      <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center ring-8 ring-white">
                        <FaUser className="h-5 w-5 text-green-600" />
                      </div>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div>
                        <div className="text-sm">
                          <span className="font-medium text-gray-900">Updated account details</span>
                        </div>
                        <p className="mt-0.5 text-sm text-gray-500">
                          Changed shipping address
                        </p>
                        <p className="mt-2 text-xs text-gray-500">Oct 10, 2023 at 9:30 AM</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="relative">
                  <div className="relative flex items-start space-x-3">
                    <div className="relative">
                      <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center ring-8 ring-white">
                        <FaShoppingBag className="h-5 w-5 text-purple-600" />
                      </div>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div>
                        <div className="text-sm">
                          <span className="font-medium text-gray-900">Added product to wishlist</span>
                        </div>
                        <p className="mt-0.5 text-sm text-gray-500">
                          NVIDIA GeForce RTX 4080 SUPER
                        </p>
                        <p className="mt-2 text-xs text-gray-500">Oct 5, 2023 at 5:12 PM</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 