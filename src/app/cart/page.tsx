"use client";

import { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/layout";
import { FaShoppingCart, FaTrash, FaChevronRight, FaChevronDown, FaChevronUp, FaArrowLeft, FaLock, FaHeart } from "react-icons/fa";
import PlaceholderImage from "../products/[slug]/PlaceholderImage";

// Mock cart data - in a real app, this would be stored in a context or state management system
const initialCartItems = [
  {
    id: "rtx-4080-super",
    name: "NVIDIA GeForce RTX 4080 SUPER 16GB GDDR6X Gaming Graphics Card",
    price: 999.99,
    quantity: 1,
    image: "/placeholder-product.jpg",
    stock: 15
  },
  {
    id: "ryzen-9-7950x",
    name: "AMD Ryzen 9 7950X 16-Core, 32-Thread Unlocked Desktop Processor",
    price: 499.99,
    quantity: 1,
    image: "/placeholder-product.jpg",
    stock: 8
  },
  {
    id: "samsung-990-pro-2tb",
    name: "Samsung 990 PRO 2TB PCIe Gen4 NVMe SSD",
    price: 179.99,
    quantity: 2,
    image: "/placeholder-product.jpg",
    stock: 22
  }
];

// Mock saved for later items
const initialSavedItems = [
  {
    id: "corsair-rm850x",
    name: "Corsair RM850x 850W 80+ Gold Certified Fully Modular Power Supply",
    price: 149.99,
    quantity: 1,
    image: "/placeholder-product.jpg",
    stock: 12
  }
];

// Mock promo codes
const promoCodes = {
  "WELCOME10": { discount: 0.1, description: "10% off your first order" },
  "SUMMER25": { discount: 0.25, description: "25% off summer sale" }
};

export default function CartPage() {
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [savedItems, setSavedItems] = useState(initialSavedItems);
  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [promoError, setPromoError] = useState<string | null>(null);

  // Calculate cart totals
  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const discountRate = appliedPromo ? promoCodes[appliedPromo as keyof typeof promoCodes].discount : 0;
  const discountAmount = subtotal * discountRate;
  const shipping = subtotal > 100 ? 0 : 9.99;
  const tax = (subtotal - discountAmount) * 0.08; // 8% tax rate
  const total = subtotal - discountAmount + shipping + tax;

  // Update item quantity
  const updateQuantity = (id: string, newQuantity: number) => {
    setCartItems(cartItems.map(item => {
      if (item.id === id) {
        const quantity = Math.min(Math.max(1, newQuantity), item.stock);
        return { ...item, quantity };
      }
      return item;
    }));
  };

  // Remove item from cart
  const removeItem = (id: string) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  // Apply promo code
  const applyPromoCode = () => {
    if (!promoCode) {
      setPromoError("Please enter a promo code");
      return;
    }

    if (promoCodes[promoCode as keyof typeof promoCodes]) {
      setAppliedPromo(promoCode);
      setPromoError(null);
      setPromoCode("");
    } else {
      setPromoError("Invalid promo code");
    }
  };

  // Remove applied promo code
  const removePromoCode = () => {
    setAppliedPromo(null);
  };

  // Save an item for later
  const saveForLater = (id: string) => {
    const item = cartItems.find(item => item.id === id);
    if (item) {
      setSavedItems([...savedItems, item]);
      setCartItems(cartItems.filter(item => item.id !== id));
    }
  };

  // Move item from saved to cart
  const moveToCart = (id: string) => {
    const item = savedItems.find(item => item.id === id);
    if (item) {
      setCartItems([...cartItems, item]);
      setSavedItems(savedItems.filter(item => item.id !== id));
    }
  };

  // Remove item from saved items
  const removeSavedItem = (id: string) => {
    setSavedItems(savedItems.filter(item => item.id !== id));
  };

  return (
    <>
      <Header />
      <main className="bg-[#f5f5f7] min-h-screen pt-(--headerHeight)">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Page Title & Continue Shopping */}
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4 md:mb-0">Shopping Cart</h1>
            <Link href="/" className="flex items-center text-primary-600 hover:text-primary-700 transition-colors">
              <FaArrowLeft className="mr-2" size={14} />
              Continue Shopping
            </Link>
          </div>

          {cartItems.length === 0 && savedItems.length === 0 ? (
            <div className="space-y-8">
              <div className="bg-white rounded-lg p-8 shadow-xs text-center">
                <div className="flex justify-center mb-4">
                  <FaShoppingCart size={64} className="text-gray-300" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Your cart is empty</h2>
                <p className="text-gray-600 mb-6">Looks like you haven't added any products to your cart yet.</p>
                <Link
                  href="/"
                  className="inline-flex items-center justify-center px-6 py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors"
                >
                  Start Shopping
                </Link>
              </div>

              {/* Recommended Products for Empty Cart */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Recommended For You</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                  {[
                    { id: "rtx-4080-super", name: "NVIDIA GeForce RTX 4080 SUPER", price: 999.99, category: "Graphics Cards" },
                    { id: "ryzen-9-7950x", name: "AMD Ryzen 9 7950X", price: 499.99, category: "Processors" },
                    { id: "samsung-990-pro-2tb", name: "Samsung 990 PRO 2TB SSD", price: 179.99, category: "Storage" },
                    { id: "corsair-rm850x", name: "Corsair RM850x 850W PSU", price: 149.99, category: "Power Supplies" }
                  ].map((product, index) => (
                    <Link
                      key={product.id}
                      href={`/products/${product.id}`}
                      className="group bg-white rounded-lg shadow-xs overflow-hidden transition-transform hover:scale-[1.02]"
                    >
                      <div className="aspect-square relative p-4">
                        <PlaceholderImage
                          text={product.name}
                          bgColor={index % 2 === 0 ? "#f8fafc" : "#f1f5f9"}
                        />
                      </div>
                      <div className="p-4 border-t border-gray-100">
                        <div className="text-xs text-primary-600 mb-1">{product.category}</div>
                        <h3 className="font-medium text-gray-900 mb-1 group-hover:text-primary-600 transition-colors">
                          {product.name}
                        </h3>
                        <div className="flex items-center justify-between">
                          <p className="font-bold">${product.price.toFixed(2)}</p>
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              // In a real app, this would add the item to the cart
                              alert(`Added ${product.name} to cart!`);
                            }}
                            className="text-xs px-2 py-1 bg-primary-600 text-white rounded-sm hover:bg-primary-700 transition-colors"
                          >
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart & Saved Items */}
              <div className="lg:col-span-2">
                {/* Cart Items */}
                {cartItems.length > 0 && (
                  <div className="bg-white rounded-lg shadow-xs overflow-hidden mb-8">
                    {/* Cart Header */}
                    <div className="bg-gray-50 p-4 border-b border-gray-200">
                      <div className="grid grid-cols-12 gap-4 text-sm font-medium text-gray-600">
                        <div className="col-span-6 md:col-span-7">Product</div>
                        <div className="col-span-2 text-center">Price</div>
                        <div className="col-span-2 text-center">Quantity</div>
                        <div className="col-span-2 md:col-span-1 text-right">Total</div>
                      </div>
                    </div>

                    {/* Cart Items */}
                    {cartItems.map((item) => (
                      <div key={item.id} className="p-4 border-b border-gray-200 last:border-b-0">
                        <div className="grid grid-cols-12 gap-4 items-center">
                          {/* Product Info */}
                          <div className="col-span-6 md:col-span-7">
                            <div className="flex items-center">
                              <div className="w-16 h-16 shrink-0 mr-4 bg-gray-100 rounded-md overflow-hidden">
                                <PlaceholderImage
                                  width={64}
                                  height={64}
                                  text={item.name.split(" ")[0]}
                                />
                              </div>
                              <div>
                                <Link href={`/products/${item.id}`} className="font-medium text-gray-900 hover:text-primary-600 line-clamp-2 transition-colors">
                                  {item.name}
                                </Link>
                                <div className="flex items-center mt-1 space-x-4">
                                  <button
                                    onClick={() => removeItem(item.id)}
                                    className="flex items-center text-sm text-red-500 hover:text-red-600 transition-colors"
                                  >
                                    <FaTrash size={12} className="mr-1" />
                                    <span>Remove</span>
                                  </button>
                                  <button
                                    onClick={() => saveForLater(item.id)}
                                    className="flex items-center text-sm text-primary-600 hover:text-primary-700 transition-colors"
                                  >
                                    <FaHeart size={12} className="mr-1" />
                                    <span>Save for later</span>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Price */}
                          <div className="col-span-2 text-center text-gray-900">
                            ${item.price.toFixed(2)}
                          </div>

                          {/* Quantity */}
                          <div className="col-span-2 text-center">
                            <div className="flex items-center justify-center h-9 rounded-lg border border-gray-300 overflow-hidden">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="w-8 h-full flex items-center justify-center text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors"
                                disabled={item.quantity <= 1}
                              >
                                <FaChevronDown size={12} />
                              </button>
                              <input
                                type="number"
                                value={item.quantity}
                                onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                                className="h-full w-8 text-center border-none focus:outline-hidden focus:ring-0 text-gray-900 text-sm p-0"
                              />
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="w-8 h-full flex items-center justify-center text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors"
                                disabled={item.quantity >= item.stock}
                              >
                                <FaChevronUp size={12} />
                              </button>
                            </div>
                          </div>

                          {/* Total */}
                          <div className="col-span-2 md:col-span-1 text-right font-medium text-gray-900">
                            ${(item.price * item.quantity).toFixed(2)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Saved For Later Items */}
                {savedItems.length > 0 && (
                  <div className="bg-white rounded-lg shadow-xs overflow-hidden mb-8">
                    <div className="bg-gray-50 p-4 border-b border-gray-200">
                      <h2 className="font-medium text-gray-900">Saved for Later ({savedItems.length} {savedItems.length === 1 ? 'item' : 'items'})</h2>
                    </div>

                    {savedItems.map((item) => (
                      <div key={item.id} className="p-4 border-b border-gray-200 last:border-b-0">
                        <div className="md:flex md:items-center md:justify-between">
                          <div className="flex items-center">
                            <div className="w-16 h-16 shrink-0 mr-4 bg-gray-100 rounded-md overflow-hidden">
                              <PlaceholderImage
                                width={64}
                                height={64}
                                text={item.name.split(" ")[0]}
                              />
                            </div>
                            <div>
                              <Link href={`/products/${item.id}`} className="font-medium text-gray-900 hover:text-primary-600 line-clamp-2 transition-colors">
                                {item.name}
                              </Link>
                              <div className="text-gray-700 mt-1">${item.price.toFixed(2)}</div>
                              <div className="flex items-center mt-2 space-x-4">
                                <button
                                  onClick={() => moveToCart(item.id)}
                                  className="flex items-center text-sm text-primary-600 hover:text-primary-700 transition-colors"
                                >
                                  <FaShoppingCart size={12} className="mr-1" />
                                  <span>Move to Cart</span>
                                </button>
                                <button
                                  onClick={() => removeSavedItem(item.id)}
                                  className="flex items-center text-sm text-red-500 hover:text-red-600 transition-colors"
                                >
                                  <FaTrash size={12} className="mr-1" />
                                  <span>Remove</span>
                                </button>
                              </div>
                            </div>
                          </div>
                          <div className="mt-4 md:mt-0">
                            {item.stock > 0 ? (
                              <span className="text-sm text-green-600 font-medium">In Stock</span>
                            ) : (
                              <span className="text-sm text-red-600 font-medium">Out of Stock</span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Continue Shopping (Mobile) */}
                <div className="flex justify-center md:hidden mb-8">
                  <Link
                    href="/"
                    className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <FaArrowLeft className="mr-2" size={14} />
                    Continue Shopping
                  </Link>
                </div>
              </div>

              {/* Order Summary */}
              {cartItems.length > 0 && (
                <div className="lg:col-span-1">
                  <div className="bg-white rounded-lg shadow-xs p-6 sticky top-[calc(var(--headerHeight)+2rem)]">
                    <h2 className="text-lg font-bold text-gray-900 border-b border-gray-200 pb-4 mb-4">Order Summary</h2>

                    {/* Summary Details */}
                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between text-gray-600">
                        <span>Subtotal ({cartItems.reduce((acc, item) => acc + item.quantity, 0)} items)</span>
                        <span className="font-medium text-gray-900">${subtotal.toFixed(2)}</span>
                      </div>

                      {appliedPromo && (
                        <div className="flex justify-between text-gray-600">
                          <div className="flex items-center">
                            <span>Discount</span>
                            <button
                              onClick={removePromoCode}
                              className="ml-2 text-xs text-red-500 hover:text-red-600"
                            >
                              (Remove)
                            </button>
                          </div>
                          <span className="font-medium text-green-600">-${discountAmount.toFixed(2)}</span>
                        </div>
                      )}

                      <div className="flex justify-between text-gray-600">
                        <span>Shipping</span>
                        <span className="font-medium text-gray-900">
                          {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                        </span>
                      </div>

                      <div className="flex justify-between text-gray-600">
                        <span>Estimated Tax</span>
                        <span className="font-medium text-gray-900">${tax.toFixed(2)}</span>
                      </div>
                    </div>

                    {/* Promo Code */}
                    {!appliedPromo && (
                      <div className="mb-6">
                        <div className="flex items-center mb-2 space-x-2">
                          <input
                            type="text"
                            placeholder="Promo Code"
                            value={promoCode}
                            onChange={(e) => setPromoCode(e.target.value)}
                            className="grow px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-primary-500 focus:border-primary-500"
                          />
                          <button
                            onClick={applyPromoCode}
                            className="px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors"
                          >
                            Apply
                          </button>
                        </div>
                        {promoError && (
                          <p className="text-red-500 text-xs">{promoError}</p>
                        )}
                        <p className="text-xs text-gray-500">Try: WELCOME10, SUMMER25</p>
                      </div>
                    )}

                    {/* Total */}
                    <div className="flex justify-between border-t border-gray-200 pt-4 mb-6">
                      <span className="text-lg font-bold text-gray-900">Total</span>
                      <span className="text-lg font-bold text-gray-900">${total.toFixed(2)}</span>
                    </div>

                    {/* Checkout Button */}
                    <button className="w-full py-3 bg-primary-600 text-white font-medium rounded-lg flex items-center justify-center hover:bg-primary-700 transition-colors">
                      <FaLock className="mr-2" size={14} />
                      Proceed to Checkout
                    </button>

                    {/* Payment Methods */}
                    <div className="mt-4 flex items-center justify-center space-x-2">
                      <span className="text-xs text-gray-500">We accept:</span>
                      <div className="flex space-x-1">
                        <div className="w-8 h-5 bg-blue-500 rounded-sm"></div>
                        <div className="w-8 h-5 bg-red-500 rounded-sm"></div>
                        <div className="w-8 h-5 bg-yellow-500 rounded-sm"></div>
                        <div className="w-8 h-5 bg-gray-800 rounded-sm"></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Recommended Products */}
          {cartItems.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">You Might Also Like</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {[
                  { id: "gskill-trident-z5", name: "G.Skill Trident Z5 RGB 32GB DDR5", price: 169.99, category: "Memory" },
                  { id: "corsair-h150i", name: "Corsair H150i Elite LCD Liquid CPU Cooler", price: 259.99, category: "Cooling" },
                  { id: "lian-li-o11", name: "Lian Li O11 Dynamic EVO", price: 149.99, category: "Cases" },
                  { id: "asus-rog-strix-z790", name: "ASUS ROG Strix Z790-E Gaming WiFi", price: 399.99, category: "Motherboards" },
                  { id: "evga-1000-g6", name: "EVGA SuperNOVA 1000 G6", price: 179.99, category: "Power Supplies" }
                ].map((product, index) => (
                  <Link
                    key={product.id}
                    href={`/products/${product.id}`}
                    className="group bg-white rounded-lg shadow-xs overflow-hidden transition-transform hover:scale-[1.02]"
                  >
                    <div className="aspect-square relative p-3">
                      <PlaceholderImage
                        text={product.name.split(" ").slice(0, 2).join(" ")}
                        bgColor={index % 2 === 0 ? "#f8fafc" : "#f1f5f9"}
                      />
                    </div>
                    <div className="p-3 border-t border-gray-100">
                      <div className="text-xs text-primary-600 mb-1">{product.category}</div>
                      <h3 className="text-sm font-medium text-gray-900 mb-1 line-clamp-2 group-hover:text-primary-600 transition-colors">
                        {product.name}
                      </h3>
                      <div className="flex items-center justify-between">
                        <p className="font-bold text-sm">${product.price.toFixed(2)}</p>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            // In a real app, this would add the item to the cart
                            alert(`Added ${product.name} to cart!`);
                          }}
                          className="text-xs px-2 py-1 bg-primary-600 text-white rounded-sm hover:bg-primary-700 transition-colors"
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
} 