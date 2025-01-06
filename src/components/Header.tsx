import React from 'react'
import Image from 'next/image'
import CartSVG from '@/assets/CartIcon'
import MenuIcon from '@/assets/MenuIcon'
import SearchBar from './SearchBar'
import { TabGroup, Tab, TabList, TabPanels, TabPanel } from './Tab'

const categories = [
  {
    name: 'Recent',
    posts: [
      {
        id: 1,
        title: 'Does drinking coffee make you smarter?',
        date: '5h ago',
        commentCount: 5,
        shareCount: 2,
      },
      {
        id: 2,
        title: "So you've bought coffee... now what?",
        date: '2h ago',
        commentCount: 3,
        shareCount: 2,
      },
    ],
  },
  {
    name: 'Popular',
    posts: [
      {
        id: 1,
        title: 'Is tech making coffee better or worse?',
        date: 'Jan 7',
        commentCount: 29,
        shareCount: 16,
      },
      {
        id: 2,
        title: 'The most innovative things happening in coffee',
        date: 'Mar 19',
        commentCount: 24,
        shareCount: 12,
      },
    ],
  },
  {
    name: 'Trending',
    posts: [
      {
        id: 1,
        title: 'Ask Me Anything: 10 answers to your questions about coffee',
        date: '2d ago',
        commentCount: 9,
        shareCount: 5,
      },
      {
        id: 2,
        title: "The worst advice we've ever heard about coffee",
        date: '4d ago',
        commentCount: 1,
        shareCount: 2,
      },
    ],
  },
]

const Header = () => {
  return (
    <header className='w-full bg-foreground text-white'>
      <div className='max-w-7xl mx-auto px-2 sm:px-6 lg:px-8'>
      <div className="relative flex h-header items-center justify-between">
        <Image
          src="/logo.svg"
          width={50}
          height={50}
          alt="Picture of the author"
        />
        <div className="flex gap-4 p-2">
          <TabGroup>
            <TabList>
              {categories.map(({ name }) => (
                <Tab
                  key={name}
                  className="rounded-full py-1 px-3 text-sm/6 font-semibold text-white focus:outline-none data-[selected]:bg-white/10 hover:bg-white/5 focus:outline-1 focus:outline-white"
                >
                  {name}
                </Tab>
              ))}
            </TabList>
            <TabPanels>
            {categories.map(({ name, posts }) => (
              <TabPanel key={name} className="rounded-xl bg-white/5 p-3">
                <ul>
                  {posts.map((post) => (
                    <li key={post.id} className="relative rounded-md p-3 text-sm/6 transition hover:bg-white/5">
                      <a href="#" className="font-semibold text-white">
                        <span className="absolute inset-0" />
                        {post.title}
                      </a>
                      <ul className="flex gap-2 text-white/50" aria-hidden="true">
                        <li>{post.date}</li>
                        <li aria-hidden="true">&middot;</li>
                        <li>{post.commentCount} comments</li>
                        <li aria-hidden="true">&middot;</li>
                        <li>{post.shareCount} shares</li>
                      </ul>
                    </li>
                  ))}
                </ul>
              </TabPanel>
              ))}
            </TabPanels>
          </TabGroup>

          <button className='flex gap-1 px-2 items-center border-2 border-white border-solid rounded-lg'>
            <MenuIcon 
              width={32}
              height={32}
            />
            Menu
          </button>
          <SearchBar />
        </div>
        <CartSVG 
          width={32}
          height={32}
        />
      </div>
      </div>
    </header>
  )
}

export default Header