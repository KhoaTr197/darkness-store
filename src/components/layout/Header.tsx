"use client";

import Link from 'next/link'
import Logo from '@/assets/Logo'
import { SearchBar } from '@/components/ui'
import { Popover, PopoverBackdrop, PopoverButton, PopoverPanel } from '@headlessui/react'
import { FaShoppingCart, FaBars, FaUser } from "react-icons/fa";
import { useState, useEffect } from "react";

// In a real app, this would come from a cart context or state management
const useCartCount = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // This simulates loading cart data from localStorage or an API
    // In a real app, you would sync this with your actual cart state
    setCount(3);
  }, []);

  return count;
};

const navigation = {
  categories:
  {
    id: 'men',
    name: 'Men',
    featured: [
      {
        name: 'New Arrivals',
        href: '#',
        imageSrc: 'https://tailwindui.com/plus/img/ecommerce-images/product-page-04-detail-product-shot-01.jpg',
        imageAlt: 'Drawstring top with elastic loop closure and textured interior padding.',
      },
      {
        name: 'Artwork Tees',
        href: '#',
        imageSrc: 'https://tailwindui.com/plus/img/ecommerce-images/category-page-02-image-card-06.jpg',
        imageAlt:
          'Three shirts in gray, white, and blue arranged on table with same line drawing of hands and shapes overlapping on front of shirt.',
      },
    ],
    sections: [
      {
        id: 'clothing',
        name: 'Clothing',
        items: [
          { name: 'Tops', href: '#' },
          { name: 'Pants', href: '#' },
          { name: 'Sweaters', href: '#' },
          { name: 'T-Shirts', href: '#' },
          { name: 'Jackets', href: '#' },
          { name: 'Activewear', href: '#' },
          { name: 'Browse All', href: '#' },
        ],
      },
      {
        id: 'accessories',
        name: 'Accessories',
        items: [
          { name: 'Watches', href: '#' },
          { name: 'Wallets', href: '#' },
          { name: 'Bags', href: '#' },
          { name: 'Sunglasses', href: '#' },
          { name: 'Hats', href: '#' },
          { name: 'Belts', href: '#' },
        ],
      },
      {
        id: 'brands',
        name: 'Brands',
        items: [
          { name: 'Re-Arranged', href: '#' },
          { name: 'Counterfeit', href: '#' },
          { name: 'Full Nelson', href: '#' },
          { name: 'My Way', href: '#' },
        ],
      },
    ],
  }
}

const Header = () => {
  const cartItemCount = useCartCount();

  return (
    <header className='header'>
      <div className='wrap'>
        <div className="relative flex gap-40 h-full items-center justify-between">
          <Link href="/">
            <Logo
              width={50}
              height={50}
            />
          </Link>
          <div className="flex h-full grow items-center gap-4">
            <Popover className="relative h-full">
              <PopoverButton className="h-full outline-hidden">
                <div className="flex gap-1 px-2 h-full items-center outline-2 outline-white outline-solid rounded-lg hover:scale-95">
                  <FaBars size={24} />
                  Menu
                </div>
              </PopoverButton>
              <PopoverBackdrop
                transition
                className="fixed inset-0 bg-black/15 top-(--headerHeight) transition duration-400 ease-in-out"
              />
              <PopoverPanel
                transition
                portal
                anchor={{
                  to: "bottom",
                  gap: '12px',
                }}
                className="z-10 w-screen shadow-sm mx-auto transition duration-200 ease-in-out data-closed:-translate-y-1 data-closed:opacity-0"
              >
                <div className="relative bg-white">
                  <div className="flex h-fit mx-auto max-w-7xl px-8">
                    <div className="w-full grid grid-cols-2 grid-flow-col gap-x-4 py-16">
                      <div className="col-start-2 grid grid-cols-2 gap-x-8">
                        {navigation.categories.featured.map((item) => (
                          <div key={item.name} className="group relative text-sm">
                            <img
                              alt={item.imageAlt}
                              src={item.imageSrc}
                              className="aspect-square w-60 rounded-lg bg-gray-100 object-cover group-hover:opacity-75"
                            />
                            <a href={item.href} className="mt-6 block font-semibold text-gray-900">
                              <span aria-hidden="true" className="absolute inset-0 z-10" />
                              {item.name}
                            </a>
                            <p aria-hidden="true" className="mt-1">
                              Shop now
                            </p>
                          </div>
                        ))}
                      </div>
                      <div className="cols-start-1 grid grid-cols-3 gap-x-8 gap-y-10 text-sm">
                        {navigation.categories.sections.map(section => (
                          <div key={section.name}>
                            <p className="font-semibold text-gray-900">
                              {section.name}
                            </p>
                            <ul
                              role="list"
                              className="mt-6 flex flex-col space-y-6"
                            >
                              {section.items.map((item) => (
                                <li key={item.name} className="flow-root">
                                  <a href={item.href} className="-m-2 block p-2 text-gray-500">
                                    {item.name}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </PopoverPanel>
            </Popover>

            <SearchBar />
          </div>
          <div className='flex items-center gap-8 h-full'>
            <Link
              className='flex items-center gap-2 px-4 h-full rounded-full transition duration-100 bg-primary-500 hover:brightness-90'
              href="/auth/login"
            >
              <FaUser size={24} />
              <div>
                <div className="text-xs">Welcome</div>
                <div className='text-sm font-semibold tracking-wide'>Login / Sign Up</div>
              </div>
            </Link>

            <Link href="/cart" className="relative flex items-center">
              <FaShoppingCart size={32} className="hover:text-primary-300 transition-colors" />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 flex items-center justify-center w-5 h-5 bg-primary-500 text-white text-xs font-bold rounded-full">
                  {cartItemCount > 99 ? '99+' : cartItemCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header