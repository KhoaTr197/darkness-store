"use client";

import Link from "next/link";
import CategoryNav from "@/_components/CategoryNavbar";
import { FaArrowRight } from "react-icons/fa";
import Image from "next/image";
// --------------------------------------------

type PromoCardProps = {
  title: string;
  description: string;
  link: string;
  bgColor?: string;
  headlineClassName?: string;
  subheadlineClassName?: string;
  ctaClassName?: string;
  className?: string;
}

const PromoCard = ({ 
  title, 
  description, 
  link,
  bgColor = "bg-purple-100",
  className = ""
}: PromoCardProps) => {
  return (
    <div className={`${bgColor} promo-card ${className}`}>
      <div>
        <h3 className={`font-bold text-lg md:text-xl mb-1`}>{title}</h3>
        <p className={`text-sm md:text-base`}>{description}</p>
      </div>
      <div className="mt-4">
        <Link 
          href={link} 
          className={`inline-flex items-center gap-2 py-2 px-4 bg-gray-900 text-white rounded-lg text-sm hover:bg-gray-800 transition-colors`}
        >
          Check <FaArrowRight size={12} />
        </Link>
      </div>
    </div>
  );
};


const BentoHero = () => {
  return (
    <div className="bg-foreground relative z-0">
      <div className="min-h-screen max-w-7xl mx-auto pt-[var(--headerHeight)] px-6 lg:px-8">
        <div className="py-8 grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Category Navigation - Left Column */}
          <div className="bg-white rounded-lg shadow-lg ring-1 ring-gray-100 overflow-hidden col-span-1 row-span-3 h-full">
            <CategoryNav />
          </div>

          {/* Main Hero Section - Spanning 2 rows across the remaining width */}
          <PromoCard 
            title="Year of the Snake"
            description="Gaming PCs on Sale - Up to 80% Off"
            link="/deals/vr"
            bgColor="bg-gradient-to-r from-purple-200 to-purple-100"
            className="shadow-lg overflow-hidden col-span-3 row-span-2 p-8 !justify-center"
          />

          {/* Third Row - Two promotional cards in the middle row */}
          <div className="col-span-1 md:col-span-3 grid md:grid-cols-3 gap-4">
            <div className="md:col-span-1">
              <PromoCard 
                title="Year of the Snake"
                description="Gaming PCs on Sale - Up to 80% Off"
                link="/deals/vr"
                bgColor="bg-pink-100"
                className="h-full"
              />
            </div>
            <div className="md:col-span-2">
              <PromoCard 
                title="Year of the Snake"
                description="Gaming PCs on Sale - Up to 80% Off"
                link="/deals/monitors"
                bgColor="bg-blue-100"
                className="h-full"
              />
            </div>
          </div>

          {/* Fourth Row - Four Small Cards */}
          <div className="col-span-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <PromoCard 
              title="Year of the Snake"
              description="Gaming PCs on Sale - Up to 80% Off"
              link="/deals/components"
              bgColor="bg-pink-100"
              className="h-auto"
            />
            <PromoCard 
              title="Year of the Snake"
              description="Gaming PCs on Sale - Up to 80% Off"
              link="/deals/components"
              bgColor="bg-blue-100"
              className="h-auto"
            />
            <PromoCard 
              title="Year of the Snake"
              description="Gaming PCs on Sale - Up to 80% Off"
              link="/deals/components"
              bgColor="bg-green-100"
              className="h-auto"
            />
            <PromoCard 
              title="Year of the Snake"
              description="Gaming PCs on Sale - Up to 80% Off"
              link="/deals/accessories"
              bgColor="bg-orange-100"
              className="h-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BentoHero; 