"use client";

import { useState } from 'react';
import Link from 'next/link';
import { FaPlus, FaSearch, FaEdit, FaTrash, FaSort, FaFilter, FaTimes } from 'react-icons/fa';

// Mock data for products
const mockProducts = [
  { 
    id: '1', 
    name: 'NVIDIA GeForce RTX 4090', 
    category: 'Graphics Cards',
    price: 1599.99,
    stock: 12,
    status: 'Active',
    created: '2023-09-15'
  },
  { 
    id: '2', 
    name: 'AMD Ryzen 9 7950X', 
    category: 'Processors',
    price: 699.99,
    stock: 8,
    status: 'Active',
    created: '2023-08-20'
  },
  { 
    id: '3', 
    name: 'Corsair Dominator Platinum RGB', 
    category: 'Memory',
    price: 199.99,
    stock: 15,
    status: 'Active',
    created: '2023-07-10'
  },
  { 
    id: '4', 
    name: 'Samsung 990 PRO', 
    category: 'Storage',
    price: 169.99,
    stock: 3,
    status: 'Low Stock',
    created: '2023-09-05'
  },
  { 
    id: '5', 
    name: 'ASUS ROG Thor 1200P2', 
    category: 'Power Supplies',
    price: 399.99,
    stock: 6,
    status: 'Active',
    created: '2023-08-12'
  },
  { 
    id: '6', 
    name: 'NZXT H9 Flow', 
    category: 'Cases',
    price: 159.99,
    stock: 0,
    status: 'Out of Stock',
    created: '2023-06-25'
  },
  { 
    id: '7', 
    name: 'NZXT Kraken Elite 360', 
    category: 'Cooling',
    price: 299.99,
    stock: 4,
    status: 'Low Stock',
    created: '2023-07-18'
  }
];

const categories = [
  'All Categories',
  'Graphics Cards',
  'Processors',
  'Memory',
  'Storage',
  'Power Supplies',
  'Cases',
  'Cooling'
];

const statusOptions = ['All Status', 'Active', 'Low Stock', 'Out of Stock'];

const ProductStatusBadge = ({ status }: { status: string }) => {
  const colors = {
    'Active': 'bg-green-100 text-green-800',
    'Low Stock': 'bg-yellow-100 text-yellow-800',
    'Out of Stock': 'bg-red-100 text-red-800'
  };

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[status as keyof typeof colors]}`}>
      {status}
    </span>
  );
};

export default function ProductsPage() {
  const [products, setProducts] = useState(mockProducts);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedStatus, setSelectedStatus] = useState('All Status');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');

  // Filter and sort products
  const filteredProducts = products
    .filter(product => {
      // Apply search query
      if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      
      // Apply category filter
      if (selectedCategory !== 'All Categories' && product.category !== selectedCategory) {
        return false;
      }
      
      // Apply status filter
      if (selectedStatus !== 'All Status' && product.status !== selectedStatus) {
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

  const handleDeleteProduct = (id: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(product => product.id !== id));
    }
  };

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All Categories');
    setSelectedStatus('All Status');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Products</h1>
        <Link 
          href="/admin/products/new" 
          className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg flex items-center transition-colors"
        >
          <FaPlus className="mr-2" />
          Add New Product
        </Link>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow-sm p-4 space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search products..."
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
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-white border border-gray-300 rounded-lg px-3 py-2 focus:ring-primary-500 focus:border-primary-500"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="bg-white border border-gray-300 rounded-lg px-3 py-2 focus:ring-primary-500 focus:border-primary-500"
            >
              {statusOptions.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>

            {(searchQuery || selectedCategory !== 'All Categories' || selectedStatus !== 'All Status') && (
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

      {/* Products Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <button 
                    className="flex items-center space-x-1"
                    onClick={() => handleSort('name')}
                  >
                    <span>Product Name</span>
                    {sortBy === 'name' && (
                      <FaSort className={`ml-1 ${sortOrder === 'asc' ? 'transform rotate-180' : ''}`} />
                    )}
                  </button>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <button 
                    className="flex items-center space-x-1"
                    onClick={() => handleSort('category')}
                  >
                    <span>Category</span>
                    {sortBy === 'category' && (
                      <FaSort className={`ml-1 ${sortOrder === 'asc' ? 'transform rotate-180' : ''}`} />
                    )}
                  </button>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <button 
                    className="flex items-center space-x-1"
                    onClick={() => handleSort('price')}
                  >
                    <span>Price</span>
                    {sortBy === 'price' && (
                      <FaSort className={`ml-1 ${sortOrder === 'asc' ? 'transform rotate-180' : ''}`} />
                    )}
                  </button>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <button 
                    className="flex items-center space-x-1"
                    onClick={() => handleSort('stock')}
                  >
                    <span>Stock</span>
                    {sortBy === 'stock' && (
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
                    onClick={() => handleSort('created')}
                  >
                    <span>Created</span>
                    {sortBy === 'created' && (
                      <FaSort className={`ml-1 ${sortOrder === 'asc' ? 'transform rotate-180' : ''}`} />
                    )}
                  </button>
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{product.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{product.category}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">${product.price.toFixed(2)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{product.stock}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <ProductStatusBadge status={product.status} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {product.created}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <Link
                        href={`/admin/products/edit/${product.id}`}
                        className="text-primary-600 hover:text-primary-900"
                      >
                        <FaEdit className="w-5 h-5" />
                        <span className="sr-only">Edit</span>
                      </Link>
                      <button
                        onClick={() => handleDeleteProduct(product.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <FaTrash className="w-5 h-5" />
                        <span className="sr-only">Delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredProducts.length === 0 && (
          <div className="px-6 py-4 text-center">
            <p className="text-gray-500">No products found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
} 