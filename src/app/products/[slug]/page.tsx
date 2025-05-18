"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/layout";
import { FaShoppingCart, FaStar, FaHeart, FaChevronRight, FaChevronDown, FaChevronUp, FaShareAlt } from "react-icons/fa";
import PlaceholderImage from "./PlaceholderImage";

// Mock product data
const product = {
  id: "rtx-4080-super",
  name: "NVIDIA GeForce RTX 4080 SUPER 16GB GDDR6X Gaming Graphics Card",
  brandName: "NVIDIA",
  price: 999.99,
  originalPrice: 1199.99,
  rating: 4.8,
  reviews: 128,
  stock: 15,
  images: [
    "/placeholder-gpu.jpg",
    "/placeholder-gpu-2.jpg",
    "/placeholder-gpu-3.jpg",
    "/placeholder-gpu-4.jpg"
  ],
  description: "The GeForce RTX™ 4080 SUPER delivers the ultra performance and features that enthusiast gamers and creators demand. Bring your games and creative projects to life with ray tracing and AI-powered graphics. It's powered by the ultra-efficient NVIDIA Ada Lovelace architecture and 16GB of super-fast G6X memory.",
  features: [
    "NVIDIA DLSS 3: Revolutionary AI-powered performance multiplier",
    "Tensor Cores: Up to 4x performance with DLSS 3 vs. traditional rendering",
    "Ray Tracing Cores: Experience full ray tracing with RT Cores",
    "NVIDIA Reflex: The lowest latency and best responsiveness for the ultimate competitive advantage",
    "16GB GDDR6X Memory: Super-fast memory for maximum performance"
  ],
  specs: [
    { name: "GPU", value: "NVIDIA GeForce RTX 4080 SUPER" },
    { name: "CUDA Cores", value: "10,240" },
    { name: "Memory", value: "16GB GDDR6X" },
    { name: "Memory Interface", value: "256-bit" },
    { name: "Boost Clock", value: "2.55 GHz" },
    { name: "Power Connectors", value: "1x 16-pin (adapter included)" },
    { name: "Recommended PSU", value: "750W" },
    { name: "Dimensions", value: "304mm x 137mm (3-slot)" }
  ],
  relatedProducts: [
    { id: "rtx-4070-ti", name: "NVIDIA GeForce RTX 4070 Ti 12GB", price: 799.99, image: "/placeholder-product.jpg" },
    { id: "rtx-4090", name: "NVIDIA GeForce RTX 4090 24GB", price: 1599.99, image: "/placeholder-product.jpg" },
    { id: "rtx-4060-ti", name: "NVIDIA GeForce RTX 4060 Ti 8GB", price: 399.99, image: "/placeholder-product.jpg" },
  ]
};

export default function ProductDetailPage({ params }: { params: { slug: string } }) {
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [activeTab, setActiveTab] = useState("description");

  const incrementQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  // A function to render a product image or placeholder
  const renderProductImage = (imageIndex: number) => {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <PlaceholderImage
          text={`RTX 4080 SUPER - Image ${imageIndex + 1}`}
          bgColor={imageIndex % 2 === 0 ? "#f5f5f7" : "#e2e8f0"}
        />
      </div>
    );
  };

  return (
    <>
      <Header />
      <main className="bg-[#f5f5f7] min-h-screen pt-(--headerHeight)">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Breadcrumb */}
          <nav className="mb-6 flex items-center text-sm text-gray-600 overflow-x-auto whitespace-nowrap">
            <Link href="/" className="hover:text-primary-500">Home</Link>
            <FaChevronRight className="mx-2 text-gray-400" size={12} />
            <Link href="/category/components" className="hover:text-primary-500">Components</Link>
            <FaChevronRight className="mx-2 text-gray-400" size={12} />
            <Link href="/category/components/gpu" className="hover:text-primary-500">Graphics Cards</Link>
            <FaChevronRight className="mx-2 text-gray-400" size={12} />
            <span className="text-gray-900 font-medium truncate">{product.name}</span>
          </nav>

          {/* Product Details Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-12">
            {/* Product Images Section */}
            <div className="lg:col-span-2 space-y-4">
              <div className="bg-white rounded-lg p-4 shadow-xs">
                {/* Main Image */}
                <div className="bg-white rounded-lg overflow-hidden aspect-square relative">
                  {renderProductImage(activeImage)}
                </div>
              </div>

              {/* Thumbnail Images */}
              <div className="grid grid-cols-4 gap-2">
                {[0, 1, 2, 3].map((index) => (
                  <button
                    key={index}
                    className={`
                      bg-white border-2 rounded-md overflow-hidden aspect-square relative
                      ${activeImage === index ? 'border-primary-500' : 'border-transparent'}
                    `}
                    onClick={() => setActiveImage(index)}
                  >
                    <div className="p-1">
                      <PlaceholderImage
                        text={`${index + 1}`}
                        width={60}
                        height={60}
                        bgColor={index % 2 === 0 ? "#f5f5f7" : "#e2e8f0"}
                      />
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Product Information Section */}
            <div className="lg:col-span-3 space-y-6">
              {/* Product Header */}
              <div className="bg-white rounded-lg p-6 shadow-xs">
                <div className="mb-2 flex items-center">
                  <span className="text-gray-500 text-sm font-medium">
                    {product.brandName}
                  </span>
                </div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                  {product.name}
                </h1>
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center">
                    {Array(5).fill(0).map((_, i) => (
                      <FaStar
                        key={i}
                        className={i < Math.floor(product.rating) ? "text-yellow-400" : "text-gray-300"}
                        size={16}
                      />
                    ))}
                    <span className="ml-2 text-sm text-gray-600">({product.reviews})</span>
                  </div>
                  <span className="text-sm text-green-600 font-medium">
                    {product.stock > 0 ? `In Stock (${product.stock} available)` : "Out of Stock"}
                  </span>
                </div>

                {/* Price Section */}
                <div className="border-t border-b border-gray-200 py-4 my-4">
                  <div className="flex items-end gap-2">
                    <span className="text-3xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
                    {product.originalPrice && (
                      <>
                        <span className="text-xl text-gray-500 line-through">
                          ${product.originalPrice.toFixed(2)}
                        </span>
                        <span className="text-sm font-semibold text-green-600">
                          Save ${(product.originalPrice - product.price).toFixed(2)}
                        </span>
                      </>
                    )}
                  </div>
                </div>

                {/* Add to Cart Section */}
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <div className="flex items-center h-12 rounded-lg border border-gray-300 overflow-hidden w-36">
                    <button
                      onClick={decrementQuantity}
                      className="w-12 h-full flex items-center justify-center text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors"
                      disabled={quantity <= 1}
                    >
                      <FaChevronDown size={14} />
                    </button>
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(Math.min(product.stock, Math.max(1, parseInt(e.target.value) || 1)))}
                      className="h-full w-full text-center border-none focus:outline-hidden focus:ring-0 text-gray-900"
                    />
                    <button
                      onClick={incrementQuantity}
                      className="w-12 h-full flex items-center justify-center text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors"
                      disabled={quantity >= product.stock}
                    >
                      <FaChevronUp size={14} />
                    </button>
                  </div>

                  <button className="h-12 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg grow flex items-center justify-center gap-2 transition-colors">
                    <FaShoppingCart size={16} />
                    Add to Cart
                  </button>

                  <button className="h-12 w-12 flex items-center justify-center rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors">
                    <FaHeart size={16} />
                  </button>

                  <button className="h-12 w-12 flex items-center justify-center rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors">
                    <FaShareAlt size={16} />
                  </button>
                </div>
              </div>

              {/* Product Highlights */}
              <div className="bg-white rounded-lg p-6 shadow-xs">
                <h3 className="text-lg font-semibold mb-3">Quick Highlights</h3>
                <ul className="space-y-2">
                  {product.features.slice(0, 4).map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="min-w-5 min-h-5 rounded-full bg-primary-500 text-white flex items-center justify-center mt-0.5">
                        <FaChevronRight size={10} />
                      </div>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Product Details Tabs */}
          <div className="bg-white rounded-lg shadow-xs overflow-hidden mb-12">
            <div className="flex border-b border-gray-200">
              <button
                className={`px-5 py-3 text-sm font-medium transition-colors ${activeTab === 'description' ? 'text-primary-600 border-b-2 border-primary-600' : 'text-gray-600 hover:text-gray-900'}`}
                onClick={() => setActiveTab('description')}
              >
                Description
              </button>
              <button
                className={`px-5 py-3 text-sm font-medium transition-colors ${activeTab === 'specifications' ? 'text-primary-600 border-b-2 border-primary-600' : 'text-gray-600 hover:text-gray-900'}`}
                onClick={() => setActiveTab('specifications')}
              >
                Specifications
              </button>
              <button
                className={`px-5 py-3 text-sm font-medium transition-colors ${activeTab === 'reviews' ? 'text-primary-600 border-b-2 border-primary-600' : 'text-gray-600 hover:text-gray-900'}`}
                onClick={() => setActiveTab('reviews')}
              >
                Reviews ({product.reviews})
              </button>
            </div>

            <div className="p-6">
              {activeTab === 'description' && (
                <div className="prose prose-sm max-w-none">
                  <p className="mb-4">{product.description}</p>
                  <h3 className="text-lg font-semibold mb-3">Key Features</h3>
                  <ul className="space-y-2">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="min-w-5 min-h-5 rounded-full bg-primary-500 text-white flex items-center justify-center mt-0.5">
                          <FaChevronRight size={10} />
                        </div>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {activeTab === 'specifications' && (
                <div className="divide-y divide-gray-200">
                  {product.specs.map((spec, index) => (
                    <div key={index} className="grid grid-cols-2 py-3">
                      <div className="text-gray-600">{spec.name}</div>
                      <div className="font-medium">{spec.value}</div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'reviews' && (
                <div className="flex flex-col items-center justify-center py-8">
                  <div className="text-6xl font-bold text-primary-600 mb-2">{product.rating}</div>
                  <div className="flex items-center mb-6">
                    {Array(5).fill(0).map((_, i) => (
                      <FaStar
                        key={i}
                        className={i < Math.floor(product.rating) ? "text-yellow-400" : "text-gray-300"}
                        size={20}
                      />
                    ))}
                  </div>
                  <p className="text-gray-600">Based on {product.reviews} reviews</p>
                  <button className="mt-6 px-6 py-2 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors">
                    Write a Review
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Related Products */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {product.relatedProducts.map((relatedProduct, index) => (
                <Link
                  key={relatedProduct.id}
                  href={`/products/${relatedProduct.id}`}
                  className="group bg-white rounded-lg shadow-xs overflow-hidden transition-transform hover:scale-[1.02]"
                >
                  <div className="aspect-square relative p-4">
                    <PlaceholderImage
                      text={relatedProduct.name.split(" ").slice(0, 2).join(" ")}
                      bgColor={index % 2 === 0 ? "#f8fafc" : "#f1f5f9"}
                    />
                  </div>
                  <div className="p-4 border-t border-gray-100">
                    <h3 className="font-medium text-gray-900 mb-1 line-clamp-2 group-hover:text-primary-600 transition-colors">
                      {relatedProduct.name}
                    </h3>
                    <p className="font-bold">${relatedProduct.price.toFixed(2)}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
} 