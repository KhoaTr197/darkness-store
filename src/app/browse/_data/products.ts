export const products = [
  {
    id: 1,
    name: "NVIDIA GeForce RTX 4090",
    category: "Graphics Cards",
    brand: "NVIDIA",
    price: 1599.99,
    rating: 4.8,
    reviews: 156,
    stock: 12,
    tags: ["Gaming", "High-End", "Ray Tracing"],
    specs: {
      memory: "24GB GDDR6X",
      boost_clock: "2.52 GHz",
      cuda_cores: 16384
    }
  },
  {
    id: 2,
    name: "AMD Ryzen 9 7950X",
    category: "Processors",
    brand: "AMD",
    price: 699.99,
    rating: 4.9,
    reviews: 234,
    stock: 8,
    tags: ["Gaming", "High-End", "Desktop"],
    specs: {
      cores: 16,
      threads: 32,
      base_clock: "4.5 GHz",
      boost_clock: "5.7 GHz"
    }
  },
  {
    id: 3,
    name: "Corsair Dominator Platinum RGB",
    category: "Memory",
    brand: "Corsair",
    price: 199.99,
    rating: 4.7,
    reviews: 89,
    stock: 15,
    tags: ["Gaming", "RGB", "DDR5"],
    specs: {
      capacity: "32GB",
      speed: "6000MHz",
      latency: "CL30"
    }
  },
  {
    id: 4,
    name: "Samsung 990 PRO",
    category: "Storage",
    brand: "Samsung",
    price: 169.99,
    rating: 4.9,
    reviews: 167,
    stock: 3,
    tags: ["NVMe", "PCIe 4.0", "High-Speed"],
    specs: {
      capacity: "2TB",
      read_speed: "7450 MB/s",
      write_speed: "6900 MB/s"
    }
  },
  {
    id: 5,
    name: "ASUS ROG Thor 1200P2",
    category: "Power Supplies",
    brand: "ASUS",
    price: 399.99,
    rating: 4.8,
    reviews: 45,
    stock: 6,
    tags: ["High-End", "RGB", "Platinum"],
    specs: {
      wattage: "1200W",
      efficiency: "80+ Platinum",
      modular: "Full"
    }
  },
  {
    id: 6,
    name: "NZXT H9 Flow",
    category: "Cases",
    brand: "NZXT",
    price: 159.99,
    rating: 4.6,
    reviews: 78,
    stock: 10,
    tags: ["Mid-Tower", "Airflow", "RGB"],
    specs: {
      form_factor: "ATX",
      color: "White",
      material: "Steel/Tempered Glass"
    }
  },
  {
    id: 7,
    name: "NZXT Kraken Elite 360",
    category: "Cooling",
    brand: "NZXT",
    price: 299.99,
    rating: 4.7,
    reviews: 92,
    stock: 4,
    tags: ["AIO", "RGB", "LCD Display"],
    specs: {
      size: "360mm",
      fans: "3x 120mm",
      pump_speed: "800-2800 RPM"
    }
  },
  {
    id: 8,
    name: "MSI GeForce RTX 4080 SUPER",
    category: "Graphics Cards",
    brand: "MSI",
    price: 999.99,
    rating: 4.8,
    reviews: 123,
    stock: 7,
    tags: ["Gaming", "High-End", "Ray Tracing"],
    specs: {
      memory: "16GB GDDR6X",
      boost_clock: "2.55 GHz",
      cuda_cores: 10240
    }
  },
  {
    id: 9,
    name: "Intel Core i9-14900K",
    category: "Processors",
    brand: "Intel",
    price: 589.99,
    rating: 4.8,
    reviews: 187,
    stock: 9,
    tags: ["Gaming", "High-End", "Desktop"],
    specs: {
      cores: 24,
      threads: 32,
      base_clock: "3.2 GHz",
      boost_clock: "6.0 GHz"
    }
  },
  {
    id: 10,
    name: "G.SKILL Trident Z5 RGB",
    category: "Memory",
    brand: "G.SKILL",
    price: 249.99,
    rating: 4.7,
    reviews: 67,
    stock: 11,
    tags: ["Gaming", "RGB", "DDR5"],
    specs: {
      capacity: "32GB",
      speed: "6400MHz",
      latency: "CL32"
    }
  },
  {
    id: 11,
    name: "WD_BLACK SN850X",
    category: "Storage",
    brand: "Western Digital",
    price: 149.99,
    rating: 4.8,
    reviews: 145,
    stock: 2,
    tags: ["NVMe", "PCIe 4.0", "Gaming"],
    specs: {
      capacity: "2TB",
      read_speed: "7300 MB/s",
      write_speed: "6600 MB/s"
    }
  },
  {
    id: 12,
    name: "Corsair HX1500i",
    category: "Power Supplies",
    brand: "Corsair",
    price: 349.99,
    rating: 4.9,
    reviews: 89,
    stock: 5,
    tags: ["High-End", "Digital", "Platinum"],
    specs: {
      wattage: "1500W",
      efficiency: "80+ Platinum",
      modular: "Full"
    }
  }
];

export const filterOptions = {
  categories: ["Graphics Cards", "Processors", "Memory", "Storage", "Power Supplies", "Cases", "Cooling"],
  brands: ["NVIDIA", "AMD", "Intel", "Corsair", "ASUS", "MSI", "NZXT", "G.SKILL", "Samsung", "Western Digital"],
  priceRanges: [
    { label: "Under $100", range: [0, 100] },
    { label: "$100 - $500", range: [100, 500] },
    { label: "$500 - $1000", range: [500, 1000] },
    { label: "$1000+", range: [1000, Infinity] },
  ],
  tags: ["Gaming", "High-End", "RGB", "Ray Tracing", "NVMe", "PCIe 4.0", "Airflow", "AIO", "DDR5"]
};

export const sortOptions = [
  { label: "Featured", value: "featured" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Best Rating", value: "rating" },
  { label: "Most Reviews", value: "reviews" },
]; 