"use client";

import Link from 'next/link'
import Logo from '@/_assets/Logo'
import SearchBar from './SearchBar'
import Banner from './Banner';
import { Popover, PopoverBackdrop, PopoverButton, PopoverPanel } from '@headlessui/react'
import { FaShoppingCart, FaBars, FaUser } from "react-icons/fa";

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
  return (
    <header className='fixed top-0 w-full bg-foreground text-white shadow z-10'>
      <div className='max-w-7xl h-header mx-auto py-3 px-2 sm:px-6 lg:px-8'>
        <div className="relative flex h-full items-center justify-between">
          <Logo
            width={50}
            height={50}
          />
          <div className="flex h-full items-center gap-4">
            <Popover className="relative h-full">
              <PopoverButton className="h-full outline-none">
                <div className="flex gap-1 px-2 h-full items-center outline-2 outline-white outline rounded-lg hover:scale-95">
                  <FaBars size={24} />
                  Menu
                </div>
              </PopoverButton>
              <PopoverBackdrop
                transition
                className="fixed inset-0 bg-black/15 top-[var(--headerHeight)] transition duration-[400ms] ease-in-out"
              />
              <PopoverPanel
                transition
                portal
                anchor={{
                  to: "bottom",
                  gap: '12px',
                }}
                className="z-10 w-screen shadow mx-auto transition duration-200 ease-in-out data-[closed]:-translate-y-1 data-[closed]:opacity-0"
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
              href="/identity/login"
            >
              <FaUser size={24} />
              <div>
                <div className="text-xs">Welcome</div>
                <div className='text-sm font-semibold tracking-wide'>Login / Sign Up</div>
              </div>
            </Link>
            <FaShoppingCart size={32} />
          </div>
        </div>
      </div>
      <Banner>
        <p className="text-sm/6 text-gray-900">
          <strong className="font-semibold">Year of the Snake</strong>
          <svg viewBox="0 0 2 2" aria-hidden="true" className="mx-2 inline size-0.5 fill-current">
            <circle r={1} cx={1} cy={1} />
          </svg>
          Gaming PCs on Sale - Up to 80% Off
        </p>
        <a
          href="#"
          className="flex-none rounded-full bg-gray-900 px-3.5 py-1 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
        >
          Check <span aria-hidden="true">&rarr;</span>
        </a>
      </Banner>
    </header>
  )
}

export default Header