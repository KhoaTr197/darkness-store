import Link from "next/link";
import Image from "next/image";
import { FaHeart, FaStar } from "react-icons/fa";
import { Product } from "@/interfaces/product";
// -----------------------

export interface ProductCardProps {
  data: Product;
  width?: number;
  height?: number;
}

const ProductCard = ({
  data,
  width,
  height,
}: {
  data: Product;
  width?: number;
  height?: number;
}) => (
  <div
    className={`w-[${width || 100}] h-[${height || 100}] relative bg-white rounded-lg shadow-xs group transition-all duration-300 hover:shadow-md border border-gray-100`}
  >
    <Link
      href={`/datas/${data.url_slug}`}
      className="block h-60 relative overflow-hidden rounded-t-lg"
    >
      <Image
        fill={true}
        src="/placeholder_img.jpg"
        alt={data.name}
        className="min-w-full object-contain transition-transform duration-300 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="absolute top-2 right-2 group-hover:opacity-100 transition-opacity duration-300">
        <button
          className="bg-white/80 backdrop-blur-xs p-2 rounded-full text-primary-600 hover:bg-white transition-colors"
        >
          <FaHeart size={14} />
        </button>
      </div>
    </Link>
    <div className="absolute top-2 -left-2 flex flex-col gap-1">
      {data.sales_off > 0 &&
        <>
          <span className="relative rounded-br-xl text-xs bg-primary-500 text-white px-2 py-1 font-semibold z-20">
            {data.sales_off}% OFF
          </span>
          <span className="absolute -bottom-2 -left-2 border-8 border-transparent border-r-primary-600 z-10"></span>
        </>
      }
    </div>
    <div className="p-4 flex flex-col gap-2">
      <Link
        href={`/datas/${data.url_slug}`}
        className="h-12 font-semibold text-gray-900 line-clamp-2 hover:text-primary-500"
      >
        {data.name}
      </Link>
      <div className="">
        {data.sales_off > 0 ? (
          <>
            <div className="text-sm line-through text-gray-500 tracking-wider">
              ${data.original_price.toLocaleString()}
            </div>
            <div className="text-xl font-semibold text-primary-500 tracking-wider">
              ${data.new_price.toLocaleString()}
            </div>
          </>
        ) : (
          <div className="text-xl font-semibold text-primary-500 tracking-wider">
            ${data.new_price.toLocaleString()}
          </div>
        )}
      </div>
      <div className="flex items-center justify-between">
        <div className="">
          <Link href={`/brands/${data.Brands.name}`}>
            <Image
              src="/placeholder_brand_img.jpg"
              alt={data.Brands.name}
              width={64}
              height={32}
              className="w-auto"
            />
          </Link>
        </div>
        <div className="flex items-center">
          {Array(5).fill(0).map((_, i) => (
            <FaStar
              key={i}
              className={i < Math.floor(data.average_rating) ? "text-yellow-400" : "text-gray-300"}
              size={14}
            />
          ))}
          <span className="ml-1 text-xs text-gray-500">{data.average_rating}</span>
        </div>
      </div>
    </div>
  </div>
);

export default ProductCard;