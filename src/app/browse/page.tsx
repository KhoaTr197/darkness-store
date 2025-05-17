"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaFilter, FaSort, FaTimes, FaCheck, FaStar, FaShoppingCart, FaChevronRight, FaHeart, FaSearch } from 'react-icons/fa';
import { Header } from "@/_layout";
import ProductPlaceholder from './_components/ProductPlaceholder';
import { products, filterOptions, sortOptions } from './_data/products';

const ProductCard = ({ product }: { product: any }) => (
  <Link 
    href={`/products/${product.id}`}
    className="bg-white rounded-lg shadow-xs overflow-hidden group transition-all duration-300 hover:shadow-md border border-gray-100"
  >
    <div className="aspect-square relative overflow-hidden">
      <ProductPlaceholder
        text={product.name}
        bgColor="#f5f5f7"
        textColor="#8f00ff"
      />
      <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      {product.stock < 5 && (
        <span className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
          Low Stock
        </span>
      )}
      <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button 
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            // Add to wishlist
            alert(`Added ${product.name} to wishlist!`);
          }}
          className="bg-white/80 backdrop-blur-xs p-2 rounded-full text-primary-600 hover:bg-white transition-colors"
        >
          <FaHeart size={14} />
        </button>
      </div>
    </div>
    <div className="p-4 border-t border-gray-100">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-medium text-primary-600 uppercase tracking-wider">{product.category}</span>
        <div className="flex items-center">
          <FaStar className="text-yellow-400 w-4 h-4" />
          <span className="ml-1 text-sm text-gray-700">{product.rating}</span>
          <span className="ml-1 text-xs text-gray-500">({product.reviews})</span>
        </div>
      </div>
      <h3 className="font-medium text-gray-900 mb-1 truncate" title={product.name}>
        {product.name}
      </h3>
      <div className="flex items-center justify-between mt-4">
        <span className="text-lg font-bold text-gray-900">
          ${product.price.toLocaleString()}
        </span>
        <button 
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            // Add to cart functionality
            alert(`Added ${product.name} to cart!`);
          }}
          className="bg-primary-600 text-white px-3 py-2 rounded-md text-sm hover:bg-primary-700 transition-all duration-300 shadow-xs hover:shadow-sm group-hover:scale-105"
        >
          <FaShoppingCart size={14} className="inline mr-1" />
          <span>Add</span>
        </button>
      </div>
    </div>
  </Link>
);

const FilterSection = ({ title, options, selected, onChange }: any) => (
  <div className="mb-6">
    <h3 className="text-md font-semibold text-gray-900 mb-3 pb-2 border-b border-gray-200">{title}</h3>
    <div className="space-y-2">
      {options.map((option: string) => (
        <label key={option} className="flex items-center hover:text-primary-600 cursor-pointer transition-colors duration-150">
          <input
            type="checkbox"
            checked={selected.includes(option)}
            onChange={() => onChange(option)}
            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded-sm"
          />
          <span className="ml-2 text-gray-700 text-sm group-hover:text-primary-600 transition-colors">{option}</span>
        </label>
      ))}
    </div>
  </div>
);

export default function BrowsePage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("featured");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const toggleBrand = (brand: string) => {
    setSelectedBrands(prev =>
      prev.includes(brand)
        ? prev.filter(b => b !== brand)
        : [...prev, brand]
    );
  };

  const togglePriceRange = (range: string) => {
    setSelectedPriceRanges(prev =>
      prev.includes(range)
        ? prev.filter(r => r !== range)
        : [...prev, range]
    );
  };

  // Apply filters and sorting
  useEffect(() => {
    let result = [...products];

    // Apply search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(product => 
        product.name.toLowerCase().includes(query) || 
        product.category.toLowerCase().includes(query) ||
        product.brand.toLowerCase().includes(query)
      );
    }

    // Apply category filter
    if (selectedCategories.length > 0) {
      result = result.filter(product => selectedCategories.includes(product.category));
    }

    // Apply brand filter
    if (selectedBrands.length > 0) {
      result = result.filter(product => selectedBrands.includes(product.brand));
    }

    // Apply price range filter
    if (selectedPriceRanges.length > 0) {
      result = result.filter(product => {
        return selectedPriceRanges.some(range => {
          const [min, max] = filterOptions.priceRanges.find(r => r.label === range)?.range || [0, Infinity];
          return product.price >= min && product.price <= max;
        });
      });
    }

    // Apply sorting
    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "reviews":
        result.sort((a, b) => b.reviews - a.reviews);
        break;
      default:
        // Featured sorting (by id)
        result.sort((a, b) => a.id - b.id);
    }

    setFilteredProducts(result);
  }, [selectedCategories, selectedBrands, selectedPriceRanges, sortBy, searchQuery]);

  return (
    <>
      <Header />
      <main className="bg-[#f5f5f7] min-h-screen pt-(--headerHeight)">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Breadcrumb */}
          <nav className="mb-6 flex items-center text-sm text-gray-600 overflow-x-auto whitespace-nowrap">
            <Link href="/" className="hover:text-primary-600 transition-colors">Home</Link>
            <FaChevronRight className="mx-2 text-gray-400" size={12} />
            <span className="text-gray-900 font-medium">Browse Products</span>
          </nav>

          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Browse Products
            </h1>
            
            {/* Search & Sort Bar */}
            <div className="flex flex-col md:flex-row items-stretch gap-4">
              {/* Search */}
              <div className="relative grow">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaSearch className="text-gray-400" />
                </div>
                <input 
                  type="text" 
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="block w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-lg shadow-xs focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200"
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
              
              <div className="flex items-center gap-4">
                {/* Mobile Filter Button */}
                <button
                  onClick={() => setIsFilterOpen(true)}
                  className="lg:hidden flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg shadow-xs"
                >
                  <FaFilter className="text-primary-600" />
                  <span>Filter</span>
                </button>
                
                {/* Sort Dropdown */}
                <div className="flex-1 md:flex-none flex items-center gap-2 bg-white rounded-lg px-4 py-3 border border-gray-300 shadow-xs">
                  <FaSort className="text-primary-600" />
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-white text-gray-700 focus:outline-hidden focus:ring-0 grow"
                  >
                    {sortOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            
            {/* Applied Filters */}
            {(selectedCategories.length > 0 || selectedBrands.length > 0 || selectedPriceRanges.length > 0) && (
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <span className="text-sm text-gray-500">Active filters:</span>
                
                {selectedCategories.map(category => (
                  <button 
                    key={category}
                    onClick={() => toggleCategory(category)}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-primary-50 text-primary-700 text-sm rounded-full hover:bg-primary-100 transition-colors"
                  >
                    {category}
                    <FaTimes size={12} />
                  </button>
                ))}
                
                {selectedBrands.map(brand => (
                  <button 
                    key={brand}
                    onClick={() => toggleBrand(brand)}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-primary-50 text-primary-700 text-sm rounded-full hover:bg-primary-100 transition-colors"
                  >
                    {brand}
                    <FaTimes size={12} />
                  </button>
                ))}
                
                {selectedPriceRanges.map(range => (
                  <button 
                    key={range}
                    onClick={() => togglePriceRange(range)}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-primary-50 text-primary-700 text-sm rounded-full hover:bg-primary-100 transition-colors"
                  >
                    {range}
                    <FaTimes size={12} />
                  </button>
                ))}
                
                <button
                  onClick={() => {
                    setSelectedCategories([]);
                    setSelectedBrands([]);
                    setSelectedPriceRanges([]);
                  }}
                  className="text-sm text-primary-600 hover:text-primary-700 hover:underline transition-colors ml-2"
                >
                  Clear all
                </button>
              </div>
            )}
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters - Desktop */}
            <div className="hidden lg:block w-64 shrink-0">
              <div className="bg-white rounded-lg p-6 sticky top-24 shadow-xs border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-bold text-gray-900 flex items-center">
                    <FaFilter className="mr-2 text-primary-600" />
                    Filters
                  </h2>
                  {(selectedCategories.length > 0 || selectedBrands.length > 0 || selectedPriceRanges.length > 0) && (
                    <button
                      onClick={() => {
                        setSelectedCategories([]);
                        setSelectedBrands([]);
                        setSelectedPriceRanges([]);
                      }}
                      className="text-sm text-primary-600 hover:text-primary-700 font-medium transition-colors"
                    >
                      Reset
                    </button>
                  )}
                </div>

                <FilterSection
                  title="Categories"
                  options={filterOptions.categories}
                  selected={selectedCategories}
                  onChange={toggleCategory}
                />

                <FilterSection
                  title="Brands"
                  options={filterOptions.brands}
                  selected={selectedBrands}
                  onChange={toggleBrand}
                />

                <div className="mb-6">
                  <h3 className="text-md font-semibold text-gray-900 mb-3 pb-2 border-b border-gray-200">Price Range</h3>
                  <div className="space-y-2">
                    {filterOptions.priceRanges.map((range) => (
                      <label key={range.label} className="flex items-center hover:text-primary-600 cursor-pointer transition-colors duration-150">
                        <input
                          type="checkbox"
                          checked={selectedPriceRanges.includes(range.label)}
                          onChange={() => togglePriceRange(range.label)}
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded-sm"
                        />
                        <span className="ml-2 text-gray-700 text-sm">{range.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Filters - Mobile */}
            {isFilterOpen && (
              <div className="fixed inset-0 bg-black bg-opacity-75 z-50 lg:hidden">
                <div className="absolute inset-y-0 right-0 w-80 bg-white p-6 overflow-y-auto">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-gray-900 flex items-center">
                      <FaFilter className="mr-2 text-primary-600" />
                      Filters
                    </h2>
                    <button
                      onClick={() => setIsFilterOpen(false)}
                      className="text-gray-700 hover:text-gray-900 transition-colors"
                    >
                      <FaTimes className="w-6 h-6" />
                    </button>
                  </div>

                  <FilterSection
                    title="Categories"
                    options={filterOptions.categories}
                    selected={selectedCategories}
                    onChange={toggleCategory}
                  />

                  <FilterSection
                    title="Brands"
                    options={filterOptions.brands}
                    selected={selectedBrands}
                    onChange={toggleBrand}
                  />

                  <div className="mb-6">
                    <h3 className="text-md font-semibold text-gray-900 mb-3 pb-2 border-b border-gray-200">Price Range</h3>
                    <div className="space-y-2">
                      {filterOptions.priceRanges.map((range) => (
                        <label key={range.label} className="flex items-center hover:text-primary-600 cursor-pointer transition-colors duration-150">
                          <input
                            type="checkbox"
                            checked={selectedPriceRanges.includes(range.label)}
                            onChange={() => togglePriceRange(range.label)}
                            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded-sm"
                          />
                          <span className="ml-2 text-gray-700 text-sm">{range.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="mt-auto pt-6 border-t border-gray-200 flex gap-3">
                    <button
                      onClick={() => {
                        setSelectedCategories([]);
                        setSelectedBrands([]);
                        setSelectedPriceRanges([]);
                      }}
                      className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Clear All
                    </button>
                    <button
                      onClick={() => setIsFilterOpen(false)}
                      className="flex-1 bg-primary-600 text-white py-3 rounded-lg hover:bg-primary-700 transition-colors font-medium"
                    >
                      Apply Filters
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Product Grid */}
            <div className="flex-1">
              {filteredProducts.length > 0 ? (
                <>
                  <div className="flex justify-between mb-4">
                    <p className="text-sm text-gray-500">
                      Showing <span className="font-medium text-gray-900">{filteredProducts.length}</span> products
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredProducts.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                </>
              ) : (
                <div className="bg-white rounded-lg shadow-xs p-8 text-center border border-gray-100">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                    <FaSearch className="text-gray-400" size={24} />
                  </div>
                  <h3 className="text-xl font-medium text-gray-900 mb-2">No products found</h3>
                  <p className="text-gray-600 mb-6 max-w-md mx-auto">We couldn't find any products matching your current filters. Try adjusting your filters or search query.</p>
                  <button
                    onClick={() => {
                      setSelectedCategories([]);
                      setSelectedBrands([]);
                      setSelectedPriceRanges([]);
                      setSearchQuery('');
                    }}
                    className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                  >
                    Clear All Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
} 