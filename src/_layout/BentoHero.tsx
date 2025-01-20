"use client"

import Placeholder from "./Placeholder"
import PopoverMenu from "@/_components/PopoverMenu"

const categories = [
  {
    name: "Built-in PC",
    link: "",
    list: null
  },
  {
    name: "Components",
    link: "Components",
    list: [
      {
        name: "CPU",
        link: "CPU",
      },
      {
        name: "GPU",
        link: "GPU"
      },
      {
        name: "Mainboard",
        link: "Mainboard"
      },
      {
        name: "RAM",
        link: "RAM"
      },
      {
        name: "Power Supply",
        link: "Power Supply"
      },
      {
        name: "Computer Case",
        link: "Computer Case"
      },
    ]
  },
  {
    name: "Storage",
    link: "Storage",
    list: [
      {
        name: "HDD",
        link: "HDD"
      },
      {
        name: "SSD",
        link: "SSD"
      }
    ]
  },
  {
    name: "Laptop",
    link: "Laptop",
    list: null
  },
  {
    name: "Laptop Gaming",
    link: "Laptop Gaming",
    list: null
  },
  {
    name: "Monitor",
    link: "Monitor",
    list: null
  },
  {
    name: "Keyboard",
    link: "Keyboard",
    list: null
  },
  {
    name: "Mouse",
    link: "Mouse",
    list: null
  },
  {
    name: "Gaming",
    link: "Gaming",
    list: null
  },
  {
    name: "Networking",
    link: "Networking",
    list: null
  },
  {
    name: "Software",
    link: "Software",
    list: [
      {
        name: "key"
      },
      {
        name: "cd"
      }
    ]
  },
  {
    name: "Audio",
    link: "Audio",
    list: [
      {
        name: "key"
      },
      {
        name: "cd"
      }
    ]
  },
  {
    name: "Accessories",
    link: "Accessories",
    list: [
      {
        name: "key"
      },
      {
        name: "cd"
      }
    ]
  }
]

const BentoHero = () => {
  return (
    <div className="bg-background">
      <div className="h-svh lg:max-w-7xl mx-auto pt-[var(--headerHeight)] px-6 lg:px-8">
        <div className="h-full py-16 grid gap-4 lg:grid-cols-4 lg:grid-rows-4 *:overflow-hidden *:bg-white">
          <div className="lg:row-span-3 rounded-lg shadow ring-2 ring-black/5">
            <div className="w-full h-full flex flex-col">
              {categories.map(category => (
                <PopoverMenu
                  labelText={category.name}
                  key={category.name}                 
                >
                  {category.list && category.list.map(subcategory => (
                    <PopoverMenu
                      labelText={subcategory.name}
                      key={subcategory.name}
                    >
                    </PopoverMenu>
                  ))}
                </PopoverMenu>
              ))}
            </div>
          </div>
          <div className="relative row-start-1 col-span-3 lg:row-span-2 rounded-lg shadow ring-2 ring-black/5">
            <div className="w-full h-full">
              <Placeholder />
            </div>
          </div>
          <div className="relative row-start-3 col-start-2 col-span-3 rounded-lg shadow ring-2 ring-black/5">
            <div className="w-full h-full">
              <Placeholder />
            </div>
          </div>
          <div className="relative row-start-4 rounded-lg shadow ring-2 ring-black/5">
            <div className="w-full h-full">
              <Placeholder />
            </div>
          </div>
          <div className="relative row-start-4 rounded-lg shadow ring-2 ring-black/5">
            <div className="w-full h-full">
              <Placeholder />
            </div>
          </div>
          <div className="relative row-start-4 rounded-lg shadow ring-2 ring-black/5">
            <div className="w-full h-full">
              <Placeholder />
            </div>
          </div>
          <div className="relative row-start-4 rounded-lg shadow ring-2 ring-black/5">
            <div className="w-full h-full">
              <Placeholder />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default BentoHero